import { Link } from "react-router-dom"
import "../itemcue/itemcue.css"

export default function Itemcue({item,cb}){

    return(
        
        <div className="cueWrapper">
            <Link to={"/item/"+item._id}>
            <div className="linkWrapper" onClick={cb}>
            <div className="imgCue" style={{backgroundImage:"url("+item.picture+")"}}>
                <img className="ImgCover" src={item.picture}></img>
                
            </div>
            <div className="cueName">
                {item.itemname}
            </div>
            <div className="cuePrice">
                {item.price}
            </div>
            </div>
            </Link>
        </div>
        
    )

}