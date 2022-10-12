import "../adminsidebar/adminsidebar.css"
import { Link } from "react-router-dom"
export default function AdminSidebar(){
    return(
        <div className="side-bar-wrapper">
            <div className="nav-bar-container">
                Ecommerce
            </div>
            <div className="list-action">
                <ul> 
                    <Link to={"/admin/alluser"}>
                        Users
                    </Link>
                </ul>
                <ul> 
                <Link to={"/admin/allorder"}>
                        Order
                    </Link>
                </ul>
                <ul> 
                <Link to={"/admin/allitem"}>
                        Items
                    </Link>
                </ul>
                <ul> 
                <Link to={"/admin/allgenre"}>
                        Genre
                    </Link>
                </ul>
                <ul> 
                    Balance
                </ul>
                <ul>
                <Link to={"/admin/custombanner"}>
                        Custom banner
                    </Link>
                </ul>
            </div>

        </div>
    )
}