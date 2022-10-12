import { List } from "@mui/material";
import AdminNavbar from "../../admincomponents/adminnavbar/adminnavbar";
import AdminSidebar from "../../admincomponents/adminsidebar/adminsidebar";
import Chart from "../../admincomponents/chart/chart";
import Summery from "../../admincomponents/summerytab/summerytab";
import Widget from "../../admincomponents/widget/Widget";
import Table from "../../admincomponents/datatable/datatable";
import "../admindashboard/overview.css"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
export default function Overview(){
    const [rows,setRows] = useState([])
  useEffect(()=>{

    const fetchData = async()=>{
      const response = await axios.get("/order/getOrderBasicInfo")
      setRows(response.data)
    }
    fetchData()

  },[])
    return(
        <div className="adminhome-wrapper">
            <AdminSidebar className="adminsidebar">

            </AdminSidebar>
            <div className="dashboard-container">
                <AdminNavbar>

                </AdminNavbar>
                <div className="dashboard-body-container">
                    <Widget type={"user"}>
                    </Widget>
                    <Widget type={"order"}>
                    </Widget>
                    <Widget type={"earning"}>
                    </Widget>
                    <Widget type={"balance"}>
                    </Widget>
                </div>
                <div className="visual-component">
                <div className="visual">
                    <Summery></Summery>
                </div>
                <div className="chart-visual">
                    <Chart>
                    </Chart>
                </div>
                </div>
                <div className="newest-data">
                    <Table rows={rows}></Table>
                </div>

            </div>

        </div>
    )
}