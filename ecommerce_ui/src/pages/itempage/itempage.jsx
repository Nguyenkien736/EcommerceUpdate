import "../itempage/itempage.css"
import Topbar from "../../components/topbar/topbar"
import StarIcon from "@mui/icons-material/Star"
import Genrebar from "../../components/genrebar/genrebar"
import { QuantityPicker } from 'react-qty-picker';
import axios from "axios";
import { useState, useEffect } from "react";
import useQuery from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Footer from "../../components/botbar/botbar";
import { Staticstarbar } from "../../components/staticstarbar/staticstarbar";


export default function Itempage() {
    let navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const { itemid } = useParams()
    const [currentquantity, setCurrentquanrity] = useState(1)

    const [item, setItem] = useState({})
    const [quantity, setQuantity] = useState(0)
    useEffect(() => {

        const fetchdata = async () => {
            const response = await axios.get('/item/getitem/' + itemid)
            setItem(response.data)
            setQuantity(response.data.quantity)
        }
        fetchdata()


    }, [itemid])


    async function handleAddToCart() {
        const res = await axios.post('/user/additemtocart', {
            itemid: itemid,
            itemquantity: currentquantity,
            userid: user._id
        });
        console.log(currentquantity);
        alert("Added to cart")


    }
    async function handleCheckout() {
        const res = await axios.post('/user/additemtocart', {
            itemid: itemid,
            itemquantity: currentquantity,
            userid: user._id
        });
        navigate("/checkout")


    }

    return (
        <div className="itempagebody">
            <Topbar>

            </Topbar>
            <Genrebar>


            </Genrebar>
            <div className="iteminfoWrapper">
                <div className="itempageimage" style={{ backgroundImage: "url(" + item.picture + ")" }}>
                    <img src={item.picture} alt="" className="ImgCover" />

                </div>
                <div className="itempageinfo">
                    <div>
                        <div className="itempagetittle">
                            {
                                item.itemname
                            }

                        </div>

                        <div className="itempageratting">
                            <div>
                                <Staticstarbar star={item.ratings / item.rattingcount}></Staticstarbar>
                            </div>
                        </div>
                        <div className="booksummery">
                            {
                                item.description
                            }

                        </div>
                        <hr>
                        </hr>

                    </div>
                    <div className="itempageprice">
                        {
                            item.price
                        }

                    </div>
                    <hr>
                    </hr>
                    <div>
                        <QuantityPicker smooth max={quantity} min={1} value={currentquantity} onChange={(value) => setCurrentquanrity(value)} ></QuantityPicker>
                        <div className="stockAlerts">{quantity} left in stocks</div>
                    </div>
                    <hr>
                    </hr>
                    <div className="buttons ">
                        <div className="button" onClick={user ? handleAddToCart : () => {
                            // adding alert need to log in to add to cart
                        }}>

                            <div >
                                Add to cart
                            </div>

                        </div>
                        <div className="button" onClick={user ? handleCheckout : () => {

                        }}>

                            <div>Check out</div>
                        </div>
                    </div>



                </div>

            </div>
            <div className="rating-space">

            </div>

            <Footer></Footer>
        </div>
    )

}