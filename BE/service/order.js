const User = require("../models/user")
const Order = require("../models/order")
const Item = require("../models/item")
async function calculateEarning(Orders){
    let res = 0;
    for(let i=0;i<Orders.length;i++){
        for(let j=0;j<Orders[i].itemidlist.length;j++)
        {
            try{
                const item = await Item.findById(Orders[i].itemidlist[j])
                res += item.price* Orders[i].quantitylist[j]
            
                

            }catch(err){
                console.log(err)
            }
             
        }
    }
    return res;

}
const OrderService = {
    calculateEarning: calculateEarning
}
module.exports = OrderService