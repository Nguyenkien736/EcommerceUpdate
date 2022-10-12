import "./itemlist.css";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../itemlist/itemlayout";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";

const Datatable = () => {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const [refresh,setRefresh] = useState(false)
  const columns = [
    {
      field: '_id', headerName: 'ID', width: 150
    },
    {
      field: 'picture', headerName: 'Picture', width: 150,
      renderCell: (params)=>{
        return (
          <div>
            <img src={params.row.picture} className="productThumbnail">
            
            </img>
          </div>
        );
      }
    },
    {
      field: 'itemname', headerName: 'Book Name', width: 200
    },
    {
      field: 'createdAt', headerName: 'Create At', flex: 1
    },
    {
      field: 'price', headerName: "Price",flex:1

    },
    {
      field: 'quantity', headerName: 'Quantity', flex: 1
    },
    {
      field: 'sellingamount', headerName: 'sell amount', flex: 1
    },{
      field: 'interestedrating', headerName: 'Interested Ratting', flex: 1
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
      const response = await axios.get(`/item/getsomeitem?page=${pageState.page}&limit=${pageState.pageSize}`)
    
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
            <Link to={"/admin/item/"+params.row._id} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="datatabledeleteButton"
              onClick={() => handleDelete(params.row._id)}
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
        Add New Item
        <Link to="/admin/item/newitem" className="datatablelink">
          Add New
        </Link>
      </div>
      <DataGrid
         getRowId={(row) => row._id}

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

export default Datatable;
