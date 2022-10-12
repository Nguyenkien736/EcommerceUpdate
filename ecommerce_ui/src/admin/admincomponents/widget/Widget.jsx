import "./widget.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";
import axios from "axios";

const Widget = ({ type }) => {
  let data;
  const [amount,setAmount] = useState(0)
  const [allamount,setAllamount] = useState(0)
  const [diff,setDiff] = useState(0)
  //temporary
  
 
 
  useEffect(()=>{
    async function fetchUser(){
      try{
        const today = new Date()
        const prevmonth = today.getMonth() -1;
        const last_month = new Date(today.getFullYear(),prevmonth,1)
        const response = await axios.get("/user/get-amount-user",{
          params:{
            month: last_month.getMonth(),
            year : last_month.getFullYear()
          }
        })

        setAmount(response.data.part_user) 
        setAllamount(response.data.all_user)
        setDiff(response.data.part_user/(response.data.all_user-response.data.part_user)*100)
        console.log(response.data.part_user)
        console.log(amount)
        //all_amount = response.data.all_user
  
      }catch(err){
        console.log(err)
      }
  
    }
    async function fetchOrder(){
      try{
        const today = new Date()
        const prevmonth = today.getMonth() -1;
        const last_month = new Date(today.getFullYear(),prevmonth,1)
        const response = await axios.get("/order/get-amount-order",{
          params:{
            month: last_month.getMonth(),
            year : last_month.getFullYear()
          }
        })

        setAmount(response.data.part_order) 
        setAllamount(response.data.all_order)
        setDiff(response.data.part_order/(response.data.all_order-response.data.part_order)*100)
        console.log(response.data.part_order)
        console.log(amount)
        //all_amount = response.data.all_user
  
      }catch(err){
        console.log(err)
      }
  
    }
    async function fetchMoney(){
      try{
        const today = new Date()
        const prevmonth = today.getMonth() -1;
        const last_month = new Date(today.getFullYear(),prevmonth,1)
        const response = await axios.get("/order/get-money-earn",{
          params:{
            month: last_month.getMonth(),
            year : last_month.getFullYear()
          }
        })

        setAmount(response.data.part_earning) 
        setAllamount(response.data.all_earning)
        setDiff(response.data.part_earning/(response.data.all_earning-response.data.part_earning)*100)
        console.log(response.data.part_earning)
        console.log(amount)

      }catch(err){
        console.log(err)
      }
    }
    async function fetchBalance(){
      try{
        const today = new Date()
        const prevmonth = today.getMonth() -1;
        const last_month = new Date(today.getFullYear(),prevmonth,1)
        const response = await axios.get("/order/get-money-earn",{
          params:{
            month: last_month.getMonth(),
            year : last_month.getFullYear()
          }
        })

        setAmount(response.data.all_earning) 
        setAllamount(response.data.all_earning)
        
        console.log(response.data.part_earning)
        console.log(amount)

      }catch(err){
        console.log(err)
      }
    }
    switch (type){
      case "user":
        fetchUser()
        break;
      case "order":
        fetchOrder()
        break;
      case "earning":
        fetchMoney()
        break;
      case "balance":
        fetchBalance()
        break;
      
    }
    

  },[])
 
  switch (type) {
    case "user":
      
      


      data = {

        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left-widget">
        <span className="title-widget">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="adminlink">{data.link}</span>
      </div>
      <div className="right-widget">
        <div className={"percentage " +( diff < 0 ? "negative" : "positive")}>
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
