import "./custom.css"
import AdminSidebar from "../../admincomponents/adminsidebar/adminsidebar"
import AdminNavbar from "../../admincomponents/adminnavbar/adminnavbar"
import Cropper from "react-cropper";
import { useEffect, useRef } from "react";
import { useState } from "react";
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../firebase";
import { async } from "@firebase/util";
import axios from "axios";
import { Button } from "@mui/material";

const CustomBanner = () => {
    const [imgs,setImgs] = useState([])
    const [refresh,setRefresh] = useState(false)
    const [disable,setDisable] = useState(false)
    useEffect(()=>{
        const fetchImgs = async ()=>{
            const response = await axios.get("/media/getAllImg")
            setImgs(response.data)
            console.log(response.data)
        }
        fetchImgs()

    },[refresh])
    const handleDelete= async(url)=>{
        await axios.post("/media/deleteImg",{
            url: url
        })
        alert("delete success")
        setRefresh(!refresh)

    }
    const handleUpload = async () => {
        const filereader = new FileReader()
        const selectedFile = document.getElementById('input').files[0];
        
        const date = new Date()
        const storageRef = ref(storage, 'images/'+date.toString() + selectedFile.name);

        var reader = new FileReader();

        var imgtag = document.getElementById("mynewbannerimage");
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
                await axios.post("/media/saveImg",{
                    url:url
                })
                alert("Successful upload")
                setRefresh(!refresh)


            });

        })
    }

    const [crop, setCrop] = useState({
        unit: '%', // Can be 'px' or '%'
        x: 25,
        y: 25,
        width: 50,
        height: 50
    })

    return (
        <div className="custom-banner-wrapper">
            <AdminSidebar />
            <div className="custom-banner-body-wrapper">
                <AdminNavbar />
                <div className="custom-banner-body">
                    <div className="uploadWrapper">
                    <label className="custom-file-upload-wrapper">
                        <input type={"file"} id="input" onChange={(e) => {
                            const selectedFile = document.getElementById('input').files[0];

                            const storageRef = ref(storage, 'images/ukulele' + selectedFile.name);

                            var reader = new FileReader();

                            var imgtag = document.getElementById("mynewbannerimage");
                            imgtag.title = selectedFile.name;

                            reader.onload = function (event) {
                                imgtag.src = event.target.result;
                            };

                            reader.readAsDataURL(selectedFile);
                        }}></input>
                        Custom Upload
                    </label>

                    <div>
                        <img id="mynewbannerimage">
                        </img>

                    </div>
                    <Button onClick={handleUpload}>Upload</Button>
                    </div>
                    
                    {
                        imgs.map((img)=>(
                            <div>
                            <img src={img.imgurl} className="BannerThumb">

                            </img>
                            <Button onClick={()=>{handleDelete(img.imgurl)}}>Delete</Button>
                            </div>

                        ))
                    }



                </div>

            </div>
        </div>
    )
}

export default CustomBanner