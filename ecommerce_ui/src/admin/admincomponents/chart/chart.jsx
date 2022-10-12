import "./chart.css";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState,useEffect } from "react";
import axios from "axios";

const data = [
  { name: "January", Total: 1200 },
  { name: "February", Total: 2100 },
  { name: "March", Total: 800 },
  { name: "April", Total: 1600 },
  { name: "May", Total: 900 },
  { name: "June", Total: 1700 },
];

const Chart = ({ aspect, title }) => {
  const [data,setData] = useState([])

  useEffect(()=>{
    const dataBuffer = []
    const fetchData = async ()=>{
        const today = new Date()
        let this_month = today.getMonth()+1
        let this_year = today.getFullYear()
        const months = []
        for(let i = 0;i<6;i++){
          
          const date = new Date(this_year,this_month-1,1)
          const response = await axios.get("/order/get-money-from-to",{
            params:{
              from_year: date.getFullYear(),
              from_month: date.getMonth(),
              to_year: this_year,
              to_month: this_month 
            }
          })
          this_month = this_month-1
          
          dataBuffer.push({
            name: date.toLocaleString('default', { month: 'long' }),
            Total: response.data.money
          })
        }
        setData(dataBuffer.reverse())

    } 
    fetchData()


  },[])

  return (
    <div className="chart">
      <div className="chart-title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
