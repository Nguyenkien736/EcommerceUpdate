import "../addnewitem/addnewitem.css"
import AdminNavbar from "../../../admincomponents/adminnavbar/adminnavbar"
import AdminSidebar from "../../../admincomponents/adminsidebar/adminsidebar"
import { Button } from "@mui/material"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebase";
import { useState } from "react";
import { async } from "@firebase/util";
import axios from "axios";


//const storageRef = ref(storage, 'some-child');
export default function AddNewItem() {

    const [file, setFile] = useState()
    const [imgurl, setImgurl] = useState("")
    const [itemname,setItemname] = useState("")
    const [price,setPrice] = useState(0)
    const [quantity,setQuantity] = useState(0)
    const [desc,setDesc] = useState("")
    const [genre,setGenre] = useState("")
    const [refresh,setRefresh] = useState(false)

    const handleUpload = async () => {
        const filereader = new FileReader()
        const selectedFile = document.getElementById('input').files[0];
        
        const date = new Date()
        const storageRef = ref(storage, 'images/'+date.toString() + selectedFile.name);

        var reader = new FileReader();

        var imgtag = document.getElementById("myimage");
        imgtag.title = selectedFile.name;

        reader.onload = function (event) {
            imgtag.src = event.target.result;
        };

        reader.readAsDataURL(selectedFile);

        console.log(selectedFile.name)
        uploadBytes(storageRef, selectedFile).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        }).finally(() => {
            getDownloadURL(storageRef).then(async (url) => {
                await axios.post("/item/createitem",{
                    itemname:itemname,
                    price: price,
                    picture: url,
                    description: desc,
                    quantity : quantity,
                    genrename: genre
                })
                alert("Successful upload")


            });

        })
    }


    return (
        <div className="add-new-item-wrapper">
            <AdminSidebar />
            <div className="add-new-item-body-wrapper">
                <AdminNavbar />
                <div className="add-new-item-body">
                    <div className="add-new-item-tab">
                        <div className="add-new-item-picture">
                            
                            <img id="myimage"></img>
                            <label className="custom-file-upload">
                            <input type={"file"} id="input" onChange={(e) => {
                                  const selectedFile = document.getElementById('input').files[0];

                                  const storageRef = ref(storage, 'images/ukulele' + selectedFile.name);
                          
                                  var reader = new FileReader();
                          
                                  var imgtag = document.getElementById("myimage");
                                  imgtag.title = selectedFile.name;
                          
                                  reader.onload = function (event) {
                                      imgtag.src = event.target.result;
                                  };
                          
                                  reader.readAsDataURL(selectedFile);
                            }}></input>
                            Custom Upload
                            </label>
                            {
                                
                            }
                        </div>
                       
                        <div className="add-new-item-side-info">
                            <div className="add-new-item-field">
                                <label>Name</label>
                                <input onChange={(e)=>{
                                    setItemname(e.target.value)
                                
                                }}></input>
                            </div>
                            <hr></hr>
                            <div className="add-new-item-field">
                                <label>Price</label>
                                <input onChange={(e)=>{
                                    setPrice(e.target.value)
                                }}></input>
                            </div>
                            <hr></hr>
                            <div className="add-new-item-field">
                                <label>Quantity</label>
                                <input onChange={(e)=>{
                                    setQuantity(e.target.value)
                                }}></input>
                            </div>
                            <hr></hr>
                            <div className="add-new-item-field">
                                <label>Description</label>
                                <input onChange={(e)=>{
                                    setDesc(e.target.value)
                                }}></input>
                            </div>
                            <hr></hr>
                            <div className="add-new-item-field">
                                <label>Genre</label>
                                <input onChange={(e)=>{
                                    setGenre(e.target.value)
                                }}></input>
                            </div>
                            <div className="add-new-item-function-button">
                                <Button onClick={handleUpload}>Add new</Button>
                                <Button>Cancel</Button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )

}