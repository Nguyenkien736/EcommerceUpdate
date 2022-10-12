import "../oneuser/oneuser.css"
import AdminNavbar from "../../../admincomponents/adminnavbar/adminnavbar";
import AdminSidebar from "../../../admincomponents/adminsidebar/adminsidebar";
import Table from "../../../admincomponents/datatable/datatable"
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function AdminUser() {
    const { id } = useParams()
    const [rows, setRows] = useState([])
    const [moneySpend, setMoneySpend] = useState(0)
    const [displayUser, setDisplayUser] = useState({})
    useEffect(() => {

        const fetchData = async () => {
            const response = await axios.get("/order/getCustomerOrderBasicInfo/" + id)
            const response2 = await axios.get("/order/getUserEarn/" + id)
            const response3 = await axios.get("/user/userinfo/" + id)
            setDisplayUser(response3.data)
            setMoneySpend(response2.data.money)
            setRows(response.data)
        }
        fetchData()

    }, [id])

    return (
        <div className="admin-user-wrapper">
            <AdminSidebar>

            </AdminSidebar>
            <div className="admin-user-body-wrapper">
                <AdminNavbar>

                </AdminNavbar>
                <div className="admin-user-body">
                    <div className="top-info-part">
                        <div className="user-info-tab">
                            <div className="user-title">
                                User Info
                            </div>
                            <div className="user-field">
                                <label>User Name</label><span>{displayUser.username}</span>
                            </div>
                            <hr></hr>
                            <div className="user-field">
                                <label>Full name</label>
                                <span>{displayUser.userfullname}</span>
                            </div>
                            <hr></hr>
                            <div className="user-field">
                                <label>Date of birth</label>
                                <span>{displayUser.dob}</span>

                            </div>
                            <hr></hr>
                            <div className="user-field">
                                <label>Email</label>
                                <span>{displayUser.email}</span>
                            </div>
                            <hr></hr>
                            <div className="user-field">
                                <label>Phone Number</label>
                                <span>{displayUser.phonenumber}</span>
                            </div>
                        </div>
                        <div className="total-mn-spend">
                            <div className="total-spend-title">
                                Total spend
                            </div>
                            <div className="money-indicator">
                                &#128176;
                            </div>
                            <div className="total-spend">
                                {moneySpend}<span>&#8363;</span>
                            </div>
                        </div>
                    </div>
                    <div className="admin-update-user">
                        <Button>Update User Info</Button>
                    </div>
                    <div>
                        <Table rows={rows}></Table>
                    </div>

                </div>

            </div>
        </div>
    )
}