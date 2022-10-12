import "./ordertable.css";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../ordertable/orderlayout";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

const OrderTable = () => {
  const [data, setData] = useState(userRows);

  const handleDelete = async (id) => {
    await axios.post("/order/deleteorder/"+id)
    setRefresh(!refresh)
  };
  const [refresh,setRefresh] = useState(false)
  const columns = [
    {
      field: 'orderid', headerName: 'ID', width: 150
    },
    {
      field: 'products', headerName: 'Products', width: 150
    },
    {
      field: 'customer_name', headerName: 'Customer Name', width: 200
    },
    {
      field: 'order_date', headerName: 'Create At', flex: 1
    },
    {
      field: 'total', headerName: "Total ",flex:1

    },
    {
      field: 'status', headerName: 'Status', flex: 1
    }
  ]


  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 0,
    pageSize: 10
  })

  useEffect(() => {
    const fetchData = async () => {
      console.log('ON')
      setPageState(old => ({ ...old, isLoading: true }))
      const response = await axios.get(`/order/getsomeorder?page=${pageState.page}&limit=${pageState.pageSize}`)
    
      setPageState(old => ({ ...old, isLoading: false, data: response.data.data, total: response.data.total }))
    }
    fetchData()
  }, [pageState.page, pageState.pageSize,refresh])
 
  

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/admin/order/"+params.row.orderid} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="datatabledeleteButton"
              onClick={() => handleDelete(params.row.orderid)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Orders  List
      
      </div>
      <DataGrid
        getRowId={(row) => row.orderid}

        autoHeight
        rows={pageState.data}
        rowCount={pageState.total}
        loading={pageState.isLoading}
        rowsPerPageOptions={[10, 30, 50, 70, 100]}
        pagination
        page={pageState.page }
        pageSize={pageState.pageSize}
        paginationMode="server"
        onPageChange={(newPage) => {
          setPageState(old => ({ ...old, page: newPage + 1 }))
        }}
        onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize }))}
        columns={columns.concat(actionColumn)}
      />
    </div>
  );
};

export default OrderTable;
