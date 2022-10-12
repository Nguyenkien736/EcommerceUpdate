import "../oneorder/oneorder.css"
import AdminNavbar from "../../../admincomponents/adminnavbar/adminnavbar";
import AdminSidebar from "../../../admincomponents/adminsidebar/adminsidebar";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Button, paginationItemClasses } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function AdminOrder() {
    const [status,setStaus] = useState({})
    const [refresh,setRefresh] = useState(false)
    const [data, setData] = useState({
        rows:[]
    })
    const [order, setOrder] = useState({})
    const [customer, setCustomer] = useState({})
    const [items, setItems] = useState([])
    const { id } = useParams()

    // const items = [1,2,3,4,5]
    const columns = [
        { field: 'id', headerName: 'Id', width: 100 },
        { field: 'pic', headerName: 'Picture', width: 150 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'qty', headerName: 'Quantity', width: 100 },
        { field: 'price', headerName: 'Price', width: 150 },
        { field: 'tprice', headerName: 'Total price', width: 150 },
    ];
    const rows = [
        { id: 1, col1: 'Hello', col2: 'World' },
        { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
        { id: 3, col1: 'MUI', col2: 'is Amazing' },
    ];
    useEffect(() => {
        const fetchData = async () => {
            const databuffer = {}
            const response = await axios.get("/order/getorder?orderid=" + id)
            setOrder(response.data)
            console.log(response)

            const response2 = await axios.get("/user/userinfo/" + response.data.userid)
            setCustomer(response2.data)
            const result_item = []
            for (let i = 0; i < response.data.itemidlist.length; i++) {
                const res = await axios.get("/item/getitem/" + response.data.itemidlist[i])
                const buffer_object = {
                    id: res.data._id,
                    pic: res.data.picture,
                    name: res.data.itemname,
                    qty: response.data.quantitylist[i],
                    price: res.data.price,
                    tprice: res.data.price*response.data.quantitylist[i]
                }
                
                result_item.push(buffer_object)

            }
            setItems(result_item)

            databuffer.rows = result_item
            console.log(databuffer)
            setData(databuffer)



        }
        fetchData()

    }, [refresh])
    const handleApprove = async () => {
        const resposne = await axios.post("/order/changeorderstatus",{
            orderid : id
        })
        setRefresh(!refresh)
        
    }
    return (
        <div className="admin-order-wrapper">
            <AdminSidebar>

            </AdminSidebar>
            <div className="admin-order-body-wrapper">
                <AdminNavbar>

                </AdminNavbar>
                <div className="admin-order-body">
                    <div className="id-order">#id:{" " + id}</div>
                    <div className="admin-order-itemlist">
                        <div className="order-customer">
                            <div className="admin-itemlist">

                                <DataGrid rows={data.rows} columns={columns} />


                            </div>
                            <div className="admin-customer-detail">
                                <hr></hr>
                                <hr></hr>
                                <div className="inside-field">
                                    <label>
                                        Customer name
                                    </label>
                                    <div>{customer.username}</div>
                                </div>
                                <hr className="linebreaker"></hr>
                                <div className="inside-field">
                                <label>
                                        Phonenumber
                                    </label>
                                    <div>{customer.phonenumber}</div>
                                </div>
                                <hr className="linebreaker"></hr>
                                <div className="inside-field">
                                <label>
                                        Date of birth
                                    </label>
                                    <div>{customer.dob}</div>
                                </div>
                                <hr className="linebreaker"></hr>
                                <div className="inside-field">
                                <label>
                                        Email
                                    </label>
                                    <div>{customer.email}</div>
                                </div>
                                <hr className="linebreaker"></hr>

                            </div>

                        </div>
                        <div className="order-summary">
                            <div className="order-summary-card">
                                <div className="order-title">Order summary</div>
                                <div className="order-field">
                                    <label>Order date</label>
                                    <span>{order.createdAt}</span>
                                </div>
                                <hr></hr>
                                <div className="order-field">
                                    <label>Order time</label>
                                    <span>{order.createdAt}</span>
                                </div>
                                <hr></hr>
                                <div className="order-field">
                                    Total fee
                                </div>
                                <hr></hr>
                                <div className="order-field">

                                    <label>Status</label>
                                    <span>{order.orderstatus}</span>
                                </div>
                                <div className="order-field approve-button">
                                    <Button fullWidth={true} onClick={handleApprove} disabled={order.orderstatus != "Pending"?true:false}>Approve</Button>
                                </div>

                            </div>
                            <div className="order-address">
                                <div className="address-title">Delivery Info</div>
                                <div className="address-field">
                                    <div>Address</div>
                                    <div>{customer.address}</div>
                                </div>
                                <div className="address-field">
                                    <div>Phone num</div>
                                    <div>{customer.phonenumber}</div>
                                </div>
                                <div className="address-field">
                                    <div>
                                        Contact name
                                    </div>
                                    <div>
                                        {customer.userfullname}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}