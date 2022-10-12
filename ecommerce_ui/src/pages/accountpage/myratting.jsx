import Genrebar from "../../components/genrebar/genrebar"
import Topbar from "../../components/topbar/topbar"
import "../accountpage/myratting.css"
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"
import Footer from "../../components/botbar/botbar"
import { Rattingbar } from "../../components/rarttingbar/rattingbar"
import axios from "axios"
export default function Rattingpage() {
    // fetch all item client bought
    const { user } = useContext(AuthContext);
    const [orderList, setOrderList] = useState([])

    useEffect(() => {
        const fetchdata = async () => {
            const response = await axios.get("/order/getitemsordered/" + user._id)
            setOrderList(response.data)

        }
        fetchdata()

    }, [])

    return (
        <div className="myrattingpagebody">
            <Topbar></Topbar>
            <Genrebar>

            </Genrebar>

            <div className="myrattingbody">
                <div className="menubar">
                    <div><Link to={"/myorder"}>My order</Link></div>
                    <hr></hr>
                    <div><Link to={"/account"}>My info</Link></div>
                    <hr></hr>
                    <div><Link to={"/myratting"}>My Ratting</Link></div>


                </div>
                <div className="scrollingdisplay">
                    <div className="rattingsbarWrapper">
                        {
                            orderList.map(item => (
                                <Rattingbar itemid={item.itemid} orderid={item.orderid}></Rattingbar>
                            )
                            )
                        }




                    </div>
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