import React, { useEffect, useState } from "react";
import axios from "axios"


// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function AlumniManagement() {
  
  

  const imageDataUrl = `${process.env.SERVER_API}api/department/imagegallery`
  const deleteImageUrl = `${process.env.SERVER_API}api/department/imagegallery`

  var today = new Date()
  var dd = String(today.getDate()).padStart(2, "0")
  var mm = String(today.getMonth() + 1).padStart(2, "0") //January is 0!
  var yyyy = today.getFullYear()

  today = mm + "-" + dd + "-" + yyyy

  let [loading, setLoading] = useState(false)
  let [color, setColor] = useState("#ffffff")

  const [fileData, setFileData] = useState()
  const [data, setData] = useState({
    _id: 0,
    title: "",
    fileName: "",
    date: today,
  })

  const [news, setNews] = useState([])
  const [events, setEvents] = useState([])


  const [images, setImages] = useState([])

  const getEvents = async () => {
    const imageGalleryResponse = await axios.get(imageDataUrl)
    console.log(imageGalleryResponse.data)
    setImages(imageGalleryResponse.data)
  }

  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0])
  }

  const actionDelete = async (id) => {
    try {
      let res = await axios.delete(deleteImageUrl, {
        data: {
          _id: id,
        },
      })
      window.location.reload()
    } catch (e) {
      alert(e)
      console.log(e)
    }
  }

  const [departmentName, setDepartmentName] = useState("")



  return (
    <>
       
    </>
  );
}


AlumniManagement.layout = Admin;
