import Genrebar from "../../components/genrebar/genrebar"
import Topbar from "../../components/topbar/topbar"
import "../cartpage/cartpage.css"
import { QuantityPicker } from "react-qty-picker"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Footer from "../../components/botbar/botbar";
export default function Cartpage() {

    const { user } = useContext(AuthContext)

    const [itemlist, setItemlist] = useState([]);
    const [total, setTotal] = useState(0)
    const [quantitylist, setQuantitylist] = useState([]);
    useEffect(() => {
        async function fetchdata() {
            const response = await axios.get("/user/get-all-item/" + user._id)

            setItemlist(response.data.cart_items)
            setQuantitylist(response.data.quans)
            //console.log(itemlist)

        }
        fetchdata()

    }, [])
    useEffect(() => {
        let buffer = 0
        for (let i = 0; i < quantitylist.length; i++) {
            buffer += quantitylist[i] * itemlist[i].price
        }
        setTotal(buffer)

    }, [quantitylist, itemlist])
    async function handleChangeValue(value, index) {
        const newQuantityList = [];
        for (var k = 0; k < quantitylist.length; k++) {
            newQuantityList.push(quantitylist[k]);

        }
        newQuantityList[index] = value;
        setQuantitylist(newQuantityList);
        await axios.post("/user/changeitemquantity", {
            userid: user._id,
            itemid: itemlist[index]._id,
            newquantity: newQuantityList[index]

        })
    }
    async function handleOnDelete(id, index) {
        await axios.post("/user/deleteitemcart", {
            userid: user._id,
            itemid: id

        })
        const quanti = [];
        const it = [];
        for (let i = 0; i < itemlist.length; i++) {
            quanti.push(quantitylist[i])
            it.push(itemlist[i])
        }
        it.splice(index, 1);
        quanti.splice(index, 1);
        setQuantitylist(quanti);
        setItemlist(it);
    }
    async function handleCreateOrder() {
        //<Navigate to={"/checkout"}></Navigate>
    }


    return (
        <div className="cartbody">
            <Topbar>

            </Topbar>
            <Genrebar>

            </Genrebar>
            <div className="bodyWrapper">
                <div className="cartitemsWrapper">
                    <div >
                        <h1>
                            Your cart</h1> </div>
                    <div className="cartlist">
                        {
                            itemlist.map((item, index) => (
                                <div className="itemscart">
                                    <div className="itemcartImage" style={{ backgroundImage: "url(" + item.picture + ")" }}>
                                        <img className="ImgCover" src={item.picture}></img>
                                    </div>
                                    <div className="itemcartinfoWrapper">
                                        <div className="itemcartTittle">{item.itemname} </div>
                                        <div className="itemcartprice">{item.price}</div>
                                        <div className="qtypicker">
                                            <QuantityPicker smooth min={1} max={item.quantity} value={quantitylist[index]} onChange={async (value) => {
                                                await handleChangeValue(value, index)
                                            }}></QuantityPicker>
                                        </div>

                                        <div className="totalprice">Total: {item.price * quantitylist[index]}</div>
                                        {
                                            //setTotal(total+item.price*quantitylist[index])
                                        }
                                        <DeleteForeverIcon onClick={async () => {
                                            await handleOnDelete(itemlist[index]._id, index)
                                        }

                                        }></DeleteForeverIcon>

                                    </div>

                                </div>

                            ))


                        }
                    </div>
                    <hr></hr>
                    <div className="totalAmount">{
                        total

                    }   </div>

                </div>

                <div className="checkoutbuttonWrapper">
                    {
                        itemlist.length == 0 ? (
                            <Link to={"/cartpage"} >
                                <div className="buybutton" onClick={handleCreateOrder}>
                                    Checkout
                                </div>
                            </Link>

                        ) : (
                            <Link to={"/checkout"} >
                                <div className="buybutton" onClick={handleCreateOrder}>
                                    Checkout
                                </div>
                            </Link>

                        )
                    }
                </div>


            </div>

            <Footer></Footer>
        </div>
    )
}