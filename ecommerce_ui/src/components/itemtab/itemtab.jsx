import "../itemtab/itemtab.css"
import StarIcon from '@mui/icons-material/Star';
import { Link } from "react-router-dom";
export default function Itemtab({iteminfo,itemid}){
    // fetch info

    return(
        <Link to={"/item/"+iteminfo._id} className="itemlink">
        <div className="itemtabbody">
            
            <div className="itemimage" style={{backgroundImage:"url(http://images.amazon.com/images/P/0596004478.01._PE30_PI_SCMZZZZZZZ_.jpg)"}}>
             

            </div>
            <div className="iteminfo">

                <div className="itemtittle">
                    {
                        iteminfo.itemname
                    }
                    
                </div>
                <div className="itemrating">
                <StarIcon className="check"></StarIcon>
                <StarIcon className="check"></StarIcon>
                <StarIcon className="uncheck"></StarIcon>
                <StarIcon className="uncheck"></StarIcon>
                <StarIcon className="uncheck"></StarIcon>
                </div>
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