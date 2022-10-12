import "./usertable.css";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../usertable/userlayout";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const UserTable = () => {
  const [data, setData] = useState(userRows);
  const [refresh,setRefresh] = useState(false)
  const columns = [
    {
      field: '_id', headerName: 'ID', width: 150
    },
    {
      field: 'username', headerName: 'User Name', width: 150
    },
    {
      field: 'userfullname', headerName: 'Full Name', width: 200
    },
    {
      field: 'createdAt', headerName: 'Create At', flex: 1
    },
    {
      field: 'email', headerName: 'Email', flex: 1
    },
    {
      field: 'phonenumber', headerName: 'Phonenumber', flex: 1
    },
    {
      field: 'role', headerName: 'Role', flex: 1,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.role}`}>
            {params.row.role}
          </div>
        );
      },
    },
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
      const response = await axios.get(`/user/getsomeuser?page=${pageState.page}&limit=${pageState.pageSize}`)
    
      setPageState(old => ({ ...old, isLoading: false, data: response.data.data, total: response.data.total }))
    }
    fetchData()
  }, [pageState.page, pageState.pageSize,refresh])
  const handleDelete = async (id) => {
    await axios.post("/user/deleteuser/"+id)
    setRefresh(!refresh)
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={"/admin/user/"+params.row._id} style={{ textDecoration: "none" }}>
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
        Add New User
        <Link to="/admin/user/newuser" className="datatablelink">
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

export default UserTable;
