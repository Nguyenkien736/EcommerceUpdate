import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useContext } from "react"
import Genrebar from "../../components/genrebar/genrebar"
import Topbar from "../../components/topbar/topbar"
import { AuthContext } from "../../context/AuthContext"
import Order from "../../components/orders/order"
import "../accountpage/myorder.css"
import Footer from "../../components/botbar/botbar"
import { Link } from "react-router-dom"
export default function Orderpage() {

    const { user } = useContext(AuthContext)
    const [orderlist, setOrderlist] = useState([])
    useEffect(() => {
        async function fetchdata() {
            const response = await axios.get("/order/getcustomerorder/" + user._id)
            setOrderlist(response.data)
            console.log(response.data)
        }
        fetchdata()
    }, [])


    return (
        <div className="accountpagebody">
            <Topbar></Topbar>
            <Genrebar>

            </Genrebar>

            <div className="accountbody">
                <div className="menubar">
                    <div><Link to={"/myorder"}>My order</Link></div>
                    <hr></hr>
                    <div><Link to={"/account"}>My info</Link></div>
                    <hr></hr>
                    <div><Link to={"/myratting"}>My Ratting</Link></div>

                </div>
                <div className="ordersbarWrapper">
                    {
                        orderlist.map((ele) => (
                            <Order order={ele}></Order>

                        ))
                    }

<div class="center">
  <div class="pagination">
  <a href="#">&laquo;</a>
  <a href="#">1</a>
  <a href="#" class="active">2</a>
  <a href="#">3</a>
  <a href="#">4</a>
  <a href="#">5</a>
  <a href="#">6</a>
  <a href="#">&raquo;</a>
  </div>
  </div>

                </div>
                
            </div>
           

            <Footer></Footer>
        </div>
    )
}