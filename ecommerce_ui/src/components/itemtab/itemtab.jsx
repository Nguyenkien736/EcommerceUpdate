import "../itemtab/itemtab.css"
import StarIcon from '@mui/icons-material/Star';
import { Link } from "react-router-dom";
import { Staticstarbar } from "../staticstarbar/staticstarbar";
export default function Itemtab({iteminfo,itemid}){
    // fetch info

    return(
        <Link to={"/item/"+iteminfo._id} className="itemlink">
        <div className="itemtabbody">
            
            <div className="itemimage" style={{backgroundImage:"url("+iteminfo.picture+")"}}>
             <img src={iteminfo.picture} className="ImgCover"></img>

            </div>
            <div className="iteminfo">

                <div className="itemtittle">
                    {
                        iteminfo.itemname
                    }
                    
                </div>
                <Staticstarbar star={iteminfo.ratings/iteminfo.rattingcount}></Staticstarbar>
                
                <div className="itemprice">
                    {
                        iteminfo.price
                    }
                    <span>VND</span>
                </div>
                      
            </div>
                    
            
        </div>
        </Link>
    )
}