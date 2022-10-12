export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "item",
      headerName: "Item",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.itemname}
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 230,
    },
  
    {
      field: "quantity",
      headerName: "Quantity",
      width: 100,
    },
    {
      field: "sellingamount",
      headerName: "Selling Amount",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.sellingamount}`}>
            {params.row.sellingamount}
          </div>
        );
      },
    },
  ];
  
  //temporary data
  export const userRows = [
    {
      id: 1,
      itemname: "Snow",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      
      price: 12000,
      quantity: 35,
      sellingamount: 100,
    },
    {
      id: 2,
      itemname: "Snow",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      sellingamount: 100,
      price: 12000,
      quantity: 35,
    },
    {
      id: 3,
      itemname: "Snow",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      sellingamount: 100,
      price: 12000,
      quantity: 35,
    },
    {
      id: 4,
      itemname: "Snow",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      sellingamount: 100,
      price: 12000,
      quantity: 35,
    },
    {
      id: 5,
      itemname: "Snow",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      sellingamount: 100,
      price: 12000,
      quantity: 35,
    },
    {
      id: 6,
      itemname: "Snow",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      sellingamount: 100,
      price: 12000,
      quantity: 35,
    },
    {
      id: 7,
      itemname: "Snow",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      sellingamount: 100,
      price: 12000,
      quantity: 35,
    },
    {
      id: 8,
      itemname: "Snow",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      sellingamount: 100,
      price: 12000,
      quantity: 35,
    },
    {
      id: 9,
      itemname: "Snow",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      sellingamount: 100,
      price: 12000,
      quantity: 35,
    },
    {
      id: 10,
      itemname: "Snow",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      sellingamount: 100,
      price: 12000,
      quantity: 35,
    },
  ];
  