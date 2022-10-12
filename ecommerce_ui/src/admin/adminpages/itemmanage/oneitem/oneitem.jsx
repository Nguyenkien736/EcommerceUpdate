import "../oneitem/oneitem.css"
import AdminNavbar from "../../../admincomponents/adminnavbar/adminnavbar";
import AdminSidebar from "../../../admincomponents/adminsidebar/adminsidebar";
import Chart from "../../../admincomponents/chart/chart";

import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Staticstarbar } from "../../../../components/staticstarbar/staticstarbar";
import PerformanceChart from "../../../admincomponents/itemperformancechart/itemperformancechart";

export default function AdminItem(){
    const {id} = useParams()
    const [book,setBook] = useState({})
    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await axios.get("/item/getitem/"+id)
            setBook(response.data)

        }
        fetchData()


    },[])
    return(
        <div className="admin-item-wrapper">
            <AdminSidebar>

            </AdminSidebar>
            <div className="admin-item-body-wrapper">
                <AdminNavbar>

                </AdminNavbar>
                <div className="admin-item-body">
                    <div className="admin-item-info">
                        
                    <div className="admin-item-img">
                        
                            
                        
                        <img src={book.picture} className="cover_picture">
                        </img>

                    </div>
                    <div className="admin-side-info">
                    <div className="admin-item-name">
                        <div>Name</div>
                        <div>{book.itemname}</div>

                    </div>
                    <div className="admin-item-price">
                        <div>
                            Price
                        </div>
                        <div>
                            {book.price}
                        </div>
                    </div>
                    
                    <div className="admin-item-sellamount">
                        <div>
                            Selling Amount
                        </div>
                        <div>{book.sellingamount}</div>
                    </div>
                    
                    <div className="admin-item-ratting">
                        <div>
                            Ratting
                        </div>
                        
                        <Staticstarbar star={book.rattingcount ? book.ratings/book.rattingcount:0}></Staticstarbar>
                        
                    </div>
                    <div className="admin-item-function-button">
                        <Button>Update</Button>
                        <Button>Delete</Button>
                    </div>
                    </div>
                    </div>
                    <div className="performance-chart">
                        <PerformanceChart id={id}></PerformanceChart>
                    </div>

                </div>

            </div>
        </div>
    )
}