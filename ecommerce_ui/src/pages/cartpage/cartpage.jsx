import Genrebar from "../../components/genrebar/genrebar"
import Topbar from "../../components/topbar/topbar"
import "../cartpage/cartpage.css"
import { QuantityPicker } from "react-qty-picker"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
export default function Cartpage(){
    const itemlist = ["HP","JP","mikuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu"]
    return(
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
                    itemlist.map((item,index)=>(
                        <div className="itemscart">
                            <div className="itemcartImage"></div>
                            <div className="itemcartinfoWrapper">
                                <div className="itemcartTittle">{item} </div>
                                <div className="itemcartprice">25000000000 dong</div>
                                <div className="qtypicker"> 
                                    <QuantityPicker min={1} max={4} value={1}></QuantityPicker>
                                </div>
                            
                                <div className="totalprice">Total: 250000</div>
                                <DeleteForeverIcon></DeleteForeverIcon>

                            </div>

                        </div>

                    ))


                }
                </div>
                <hr></hr>
                <div className="totalAmount">Total</div>

            </div>
            
            <div className="buybuttonWrapper">
                
                <div className="buybutton"> 
                <div>Buy now</div></div>
            </div>
            </div>
            
        </div>
    )
}