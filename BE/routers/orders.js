const router = require("express").Router()
const { json } = require("express")
const item = require("../models/item")
const Item = require("../models/item")
const order = require("../models/order")
const Order = require("../models/order")
const user = require("../models/user")

const User = require("../models/user")
const OrderService = require("../service/order")


router.post("/createorder", async (req, res) => {
    try {
        const new_order = await new Order({
            userid: req.body.userid,
            itemidlist: req.body.itemidlist,
            quantitylist: req.body.quantitylist
        })

        const created_order = await new_order.save()

        const user = await User.findById(req.body.userid);
        user.currentcartitems = []
        user.currentcartquantity = []
        await user.save()



        res.status(200).send(created_order)

    } catch (err) {
        console.log(err)
        res.send(err)

    }
})

router.get("/getorder", async (req, res) => {
    try {
        const order = await Order.findById(req.query.orderid)
        res.status(200).json(order)
    } catch (error) {
        console.log(error)

    }
})

router.get("/getcustomerorder/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const orderlist = await Order.find({
            userid: req.params.id
        })
        res.status(200).json(orderlist)

    } catch (err) {
        console.log(err)
    }
})

router.get("/getitemsordered/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        const orderlist = await Order.find({
            userid: req.params.id
        })
        let items = []
        for (let i = 0; i < orderlist.length; i++) {
            let orderHolder = []

            for (let j = 0; j < orderlist[i].itemidlist.length; j++) {
                orderHolder = [...orderHolder, { orderid: orderlist[i]._id, itemid: orderlist[i].itemidlist[j] }]
            }
            items = [...items, ...orderHolder]

        }
        res.status(200).json(items)
    } catch (err) {
        console.log(err)
    }
})

router.get("/getitems/:id", async (req, res) => {
    try {

        const order = await Order.findById(req.params.id)
        const itemlist = []
        for (let i = 0; i < order.itemidlist.length; i++) {
            const item = await Item.findById(order.itemidlist[i]);
            itemlist.push(item)
        }

        res.status(200).json(itemlist)

    } catch (err) {
        res.send("ERR")
        console.log(err)

    }
})

router.post("/changeorderstatus", async (req, res) => {
    try {
        const order = await Order.findById(req.body.orderid)
        let not_valid = false;
        
        for (let i = 0; i < order.itemidlist.length; i++) {
            const item = await Item.findById(order.itemidlist[i])
            console.log("ERR")
            if (item.quantity >= order.quantitylist[i]) {
                console.log(order.quantitylist[i])

            } else {
                console.log("ERR")
                not_valid = true
            }
        }

        if (not_valid) {
            res.status(400).send("Not enough")
        } else {
            for (let i = 0; i < order.itemidlist.length; i++) {
                const item = await Item.findById(order.itemidlist[i])
                item.sellingamount += order.quantitylist[i]
                item.quantity = item.quantity - order.quantitylist[i]
                await item.save()

            }
            order.orderstatus = "approve"
            await order.save()
            res.status(200).json("change successfull")


        }

        

    } catch (error) {
        console.log(error)
        res.send("ERR")
    }
})

router.get("/get-amount-order", async (req, res) => {
    try {
        const month = req.query.month
        const year = req.query.year
        const results = {
            part_order: 0,
            all_order: 0
        }


        Promise.all([
            Order.count({}).exec(),
            Order.count({
                createdAt: {
                    $gte: new Date(year, month, 1)
                }
            }).exec()
        ]).then(function (result) {
            console.log([].concat.apply([], result));

            results.all_order = result[0]
            results.part_order = result[1]
            console.log(results)

        }).finally(() => {
            res.status(200).json(results)

        })




    } catch (err) {
        console.log(err)
        res.send("ERR")
    }
})
router.get("/get-money-earn", async (req, res) => {
    try {
        const month = req.query.month
        const year = req.query.year
        const results = {
            part_earning: 0,
            all_earning: 0
        }


        Promise.all([
            Order.find({ orderstatus: "Pending" }).exec(),
            Order.find({
                orderstatus: "Pending",

                createdAt: {
                    $gte: new Date(year, month, 1)
                }
            }).exec()
        ]).then(async (result) => {
            //console.log([].concat.apply([], result));
            try {
                const money = await OrderService.calculateEarning(result[1])
                const part_money = await OrderService.calculateEarning(result[0])
                console.log(money)
                results.part_earning = part_money
                results.all_earning = money
            } catch (err) {
                console.log(err)
            }
            // ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR



        }).finally(() => {
            res.status(200).json(results)

        })




    } catch (err) {
        console.log(err)
        res.send("ERR")
    }

})
router.get("/get-money-from-to", async (req, res) => {
    try {
        const to_month = req.query.to_month
        const to_year = req.query.to_year
        const from_month = req.query.from_month
        const from_year = req.query.from_year
        const results = {
            money: 0
        }


        Promise.all([

            Order.find({
                orderstatus: "approve",

                createdAt: {

                    $gte: new Date(from_year, from_month, 1),
                    $lt: new Date(to_year, to_month, 1)
                }
            }).exec()
        ]).then(async (result) => {
            //console.log([].concat.apply([], result));
            try {
                const money = await OrderService.calculateEarning(result[0])
                //const part_money = await OrderService.calculateEarning(result[0])
                console.log(money)

                results.money = money
            } catch (err) {
                console.log(err)
            }
            // ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR



        }).finally(() => {
            res.status(200).json(results)

        })



    } catch (err) {
        console.log(err)
        res.send("ERR")
    }
})

router.get("/get-item-money-from-to",async (req,res)=>{
    try {
        const to_month = req.query.to_month
        const to_year = req.query.to_year
        const from_month = req.query.from_month
        const from_year = req.query.from_year
        const id = req.query.id
        const results = {
            money: 0
        }


        Promise.all([

            Order.find({
                orderstatus: "approve",
                itemidlist: id,
                createdAt: {
                    $gte: new Date(from_year, from_month, 1),
                    $lt: new Date(to_year, to_month, 1)
                }

            }).exec()
        ]).then(async (result) => {
            //console.log([].concat.apply([], result));
            try {
                const money = await OrderService.calculateEarning(result[0])
                //const part_money = await OrderService.calculateEarning(result[0])
                console.log(money)

                results.money = money
            } catch (err) {
                console.log(err)
            }
            // ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR



        }).finally(() => {
            res.status(200).json(results)

        })



    } catch (err) {
        console.log(err)
        res.send("ERR")
    }
})

router.get("/getUserEarn/:id", async (req, res) => {
    try {
        const orders = await Order.find({
            userid: req.params.id
        })
        const money = await OrderService.calculateEarning(orders)
        res.status(200).json({
            money: money
        })

    } catch (err) {
        console.log(err)
        res.send("ERR")
    }
})

router.get("/getOrderBasicInfo", async (req, res) => {
    try {
        const resp = []
        const orders = await Order.find({}).sort({ 'createdAt': -1 }).limit(8)



        for (let i = 0; i < orders.length; i++) {
            console.log(orders[i])
            let money = await OrderService.calculateEarning([orders[i]])
            const order = {
                orderid: orders[i]._id,
                order_date: orders[i].createdAt,
                total: money,
                status: orders[i].orderstatus
            }
            const user_order = await User.findById(orders[i].userid)
            let products = []
            for (let j = 0; j < orders[i].itemidlist.length; j++) {
                const product = await Item.findById(orders[i].itemidlist[j])
                products.push(product.itemname)
            }
            order.products = products
            order.customer_name = user_order.userfullname
            resp.push(order)
            console.log(resp)

        }
        res.status(200).json(resp)

    } catch (err) {
        console.log(err)
        res.send("ERR")
    }

})
router.get("/getCustomerOrderBasicInfo/:id", async (req, res) => {
    try {
        const resp = []
        const orderlist = await Order.find({
            userid: req.params.id
        }).sort(
            {
                "createdAt": -1
            }
        ).limit(5)
        for (let i = 0; i < orderlist.length; i++) {
            console.log(orderlist[i])
            let money = await OrderService.calculateEarning([orderlist[i]])
            const order = {
                orderid: orderlist[i]._id,
                order_date: orderlist[i].createdAt,
                total: money,
                status: orderlist[i].orderstatus
            }
            const user_order = await User.findById(orderlist[i].userid)
            let products = []
            for (let j = 0; j < orderlist[i].itemidlist.length; j++) {
                const product = await Item.findById(orderlist[i].itemidlist[j])
                products.push(product.itemname)
            }
            order.products = products
            order.customer_name = user_order.userfullname
            resp.push(order)
            console.log(resp)

        }
        res.status(200).json(resp)


    } catch (err) {
        console.log(err)
        res.send("ERR")
    }

})
router.get("/getsomeorder", async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ "createAt": -1 }).skip(req.query.page).limit(req.query.limit)
        const total = await Order.count({})
        const resp = []
        for (let i = 0; i < orders.length; i++) {
            console.log(orders[i])
            let money = await OrderService.calculateEarning([orders[i]])
            const order = {
                orderid: orders[i]._id,
                order_date: orders[i].createdAt,
                total: money,
                status: orders[i].orderstatus
            }
            const user_order = await User.findById(orders[i].userid)
            let products = []
            for (let j = 0; j < orders[i].itemidlist.length; j++) {
                const product = await Item.findById(orders[i].itemidlist[j])
                products.push(product.itemname)
            }
            order.products = products
            order.customer_name = user_order.userfullname
            resp.push(order)
            console.log(resp)

        }
        const result = {
            data: resp,
            total: total
        }
        res.status(200).json(result)
    } catch (err) {
        console.log(err)
    }

})
router.post("/deleteorder/:id", async (req, res) => {
    try {
        await Order.findOneAndDelete({
            _id: req.params.id
        })
        res.status(200).json("DELETED")

    } catch (err) {
        console.log(err)
        res.send("ERR")
    }

})
module.exports = router