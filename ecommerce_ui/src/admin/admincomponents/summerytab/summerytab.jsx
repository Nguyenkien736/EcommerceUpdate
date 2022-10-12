import "../summerytab/summerytab.css"
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Summery = () => {

  const [percent,setPercent] = useState(0)
  const [money, setMoney] = useState(0)
  const [allmoney,setAllmoney] = useState(0)
  useEffect(()=>{
    const today = new Date()
    const prevmonth = today.getMonth() -6;
    const last_month = new Date(today.getFullYear(),prevmonth,1)
    const fetchMoney = async()=>{

      const response = await axios.get("/order/get-money-earn",{
        params:{
          month:last_month.getMonth(),
          year: last_month.getFullYear()
        }
      })
      setMoney(response.data.part_earning)
      setAllmoney(response.data.all_earning)


    }
    fetchMoney()
  },[])

  return (
    <div className="featured">
      <div className="topsummery">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottomsummery">
        <div className="featuredChart">
          <CircularProgressbar value={money/allmoney*100} text={money/allmoney*100+"%"} strokeWidth={5} />
        </div>
        <p className="title">Total sales made last 6 month</p>
        <p className="amount">${money}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item-summ">
            
            <div className="itemResult negative">
             
            </div>
          </div>
          <div className="item-summ">
           
            <div className="itemResult positive">
              
            </div>
          </div>
          <div className="item-sum">
            
            <div className="itemResult positive">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summery;
