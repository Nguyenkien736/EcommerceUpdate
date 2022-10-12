import { Button } from "@mui/material"
import axios from "axios"
import { useContext } from "react"
import { useState } from "react"
import { useEffect } from "react"
import Overlay from "react-overlay-component"
import { AuthContext } from "../../context/AuthContext"
import "../rarttingbar/rattingbar.css"
import { Staticstarbar } from "../staticstarbar/staticstarbar"

export function Rattingbar({ itemid ,orderid }) {
    // fetch items
    const [star, setStar] = useState(0)
    const {user} = useContext(AuthContext)
    const [message,setMessage] = useState("")
    const [isOpen, setOverlay] = useState(false);
    const [ratting,setRatting] = useState({})
    const [refresh,setRefresh] = useState(true)
    const configs = {
        animate: true,
        // clickDismiss: false,
        // escapeDismiss: false,
        // focusOutline: false,
    };
    const [book, setBook] = useState({})
    const closeOverlay = () => setOverlay(false);
    useEffect(() => {

        const fetchdata = async () => {
            const response = await axios.get("/item/getitem/" + itemid)
            
            setBook(response.data)
        }
        const fetchRatting = async()=>{
            const response = await axios.get("/user/getrattingcontent",{ 
                params:{
                    itemid:itemid,
                    orderid:orderid
                }
            })
            
            setRatting(response.data)
            
        }

        fetchdata()
        fetchRatting()

    }, [refresh])
    function onRattingItem() {
        setOverlay(true)
    }
    async function handleSubmitItems(){
        setOverlay(false)
        await axios.post("/user/ratingitem",{
            userid: user._id,
            itemid : itemid,
            orderid:orderid,
            message : message,
            rate: star
        })
        setRefresh(!refresh)

        
    }
    return (

        <div className="item">
            <div className="img" style={{ backgroundImage: "url(" + book.picture + ")" }}>
            <img className="ImgCover" src={book.picture}></img>
            </div>
            <div className="name">
                {book.itemname}
            </div>
            <div className="price">
                {book.price}
            </div>
            <div>
                {
                    ratting ? (<Staticstarbar star={ratting.rate}></Staticstarbar>): "Your rate" 
                }
            </div>
            <div>
                {
                    ratting ? ratting.message: "Your desc"
                }
            </div>
            <div>
                <Button onClick={onRattingItem} disabled={ratting?true:false}>Ratting item</Button>
            </div>
            <Overlay configs={configs} isOpen={isOpen} closeOverlay={closeOverlay}>
                <div className="rattingWrapper">
                <h4>Thank for rating</h4>
                <form className="rating">
                    <label>
                        <input type="radio" name="stars" value="1" onChange={()=>{setStar(1)}}/>
                        <span className="icon">★</span>
                    </label>
                    <label>
                        <input type="radio" name="stars" value="2" onChange={()=>{setStar(2)}}/>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                    </label>
                    <label>
                        <input type="radio" name="stars" value="3" onChange={()=>{setStar(3)}}/>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                    </label>
                    <label>
                        <input type="radio" name="stars" value="4" onChange={()=>{setStar(4)}}/>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                    </label>
                    <label>
                        <input type="radio" name="stars" value="5" onChange={()=>{setStar(5)}}/>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                        <span className="icon">★</span>
                    </label>
                   
                </form>
                <hr></hr>
                <textarea placeholder={orderid} rows={8} onChange={(e)=>setMessage(e.target.value)}></textarea>
                <hr></hr>
                <Button fullWidth={true} onClick={handleSubmitItems}>Submit</Button>
                </div>

            </Overlay>
        </div>
    )
}