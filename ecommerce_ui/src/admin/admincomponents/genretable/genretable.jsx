import "./genretable.css";
import { DataGrid } from "@mui/x-data-grid";
//import { userColumns, userRows } from "../itemlist/itemlayout";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";

const GenreTable = () => {
  const [data, setData] = useState({});
  const [nobook,setNobook] = useState(0);
  const [hidden,setHidden] = useState(false)
  const [genrename,setGenrename] = useState("")
  const [refresh,setRefresh] = useState(false)

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const handleAddNewClick= ()=>{
    setHidden(!hidden)

  }
  const handleAdd = async()=>{
    await axios.post('/genre/creategenre',{
        genrename: genrename
    })
    setHidden(!hidden)
    setRefresh(!refresh)
  }
 
  const columns = [
    {
      field: '_id', headerName: 'ID', width: 150
    },
    {
      field: 'genrename', headerName: 'Name', width: 150
    },
    {
      field: 'createdAt', headerName: 'Create At', flex: 1
    },
    {
      field: 'nobook', headerName: 'No Book', flex: 1
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
      console.log("EEE")
      const response = await axios.get("/genre/getgenretable")
      console.log("RRR")
     // const response2 = await axios.get("/genre/getgenreitemcount/")
    
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
        <div onClick={handleAddNewClick} className="datatablelink">
          Add New
        </div>
        
      </div>
      <div hidden={hidden} >
        <div className="hiddenform">
            <label>Genre Name</label>
            <input onChange={(e)=>{setGenrename(e.target.value)}}></input>
            <Button onClick={handleAdd}>Add</Button>
            </div>
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

export default GenreTable;
