import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import "../orders/order.css"
export default function Order({order}){
    const [items,setItems] = useState([])
    useEffect(()=>{
        async function fetchdata(){
            const response = await axios.get("/order/getitems/"+order._id)
            setItems(response.data)
        }
        fetchdata()

    },[])
    return (
        <div className="order-wrapper">
            <div className="status_bar">
                Status
            </div>
            <div className="itemlist">
                {
                    items.map((item)=>(
                        <div className="item">
                        <div className="img" style={{backgroundImage:"url("+item.picture+")"}}>
                            <img className="ImgCover" src={item.picture}></img>
                                           
                        </div>
                        <div className="name">
                            {item.itemname}
                        </div>
                        <div className="price">
                            {item.price}
                        </div>
                        <div>
                            {
                                order.quantitylist[order.itemidlist.indexOf(item._id)]
                            }
                        </div>
                        <div>
                            Total
                        </div>
                       
                        </div>
                    ))
                }
              
               
            </div>
           
        </div>
    )
}