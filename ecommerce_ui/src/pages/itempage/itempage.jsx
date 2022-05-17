import "../itempage/itempage.css"
import Topbar from "../../components/topbar/topbar"
import StarIcon from "@mui/icons-material/Star"
import Genrebar from "../../components/genrebar/genrebar"
import  {QuantityPicker}  from  'react-qty-picker';
import axios from "axios";
import { useState,useEffect } from "react";
import useQuery from "react"
import { useParams } from "react-router-dom";


export default function Itempage(){
    const {itemid} = useParams()
    const [currentquantity,setCurrentquanrity] = useState(1)

    const [item,setItem] = useState({})
    const [quantity, setQuantity] = useState(0)
    useEffect(()=>{
        const fetchdata = async ()=>{
            const response = await axios.get('/item/getitem/'+itemid)
            setItem(response.data)
            setQuantity(response.data.quantity)
        }
        fetchdata()


    },[])
    
    return(
        <div className="itempagebody">
            <Topbar>

            </Topbar>
            <Genrebar>
                

            </Genrebar>
            <div className="iteminfoWrapper">
                <div className="itempageimage" style={{backgroundImage :"url("+item.picture+")"}}>


                </div>
                <div className="itempageinfo">
                    <div>
                <div className="itempagetittle">
                    {
                        item.itemname
                    }

                </div>
                
                <div className="itempageratting">
                <div className="itemrating">
                    {
                        
                    }
                <StarIcon className="check"></StarIcon>
                <StarIcon className="check"></StarIcon>
                <StarIcon className="uncheck"></StarIcon>
                <StarIcon className="uncheck"></StarIcon>
                <StarIcon className="uncheck"></StarIcon>
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
                    <QuantityPicker max={quantity} min={1} value={currentquantity} onChange={(e)=>setCurrentquanrity(e.target.value)} ></QuantityPicker>
                    <div className="stockAlerts">{quantity} left in stocks</div>
                </div>
                <hr>
                </hr>
                    <div className="buttons ">
                    <div className="button">
                        <div>
                        Add to cart
                        </div>

                    </div>
                    <div className="button">
        e               
        <div>Check out</div>
                    </div>
                    </div>
                    


                </div>
                
            </div> 
            <div>

                <h1>Rate this item(this only happen when you already bought this item)</h1>
                <div>Rating space</div>
            </div>


        </div>
    )

}