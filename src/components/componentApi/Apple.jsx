import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Apple() {
  let [data,setData] = useState([])
  async function getData() {
    let { data } = await axios.get(
      `https://newsapi.org/v2/everything?q=apple&from=2022-09-14&to=2022-09-14&sortBy=popularity&apiKey=9b6e6465fb6747f5a4005a2d8384d0bb`
    );
    setData(data.articles)
 
  }
  useEffect(()=>{
    getData()
  }
  
  ,[])
  return (
    <>
      <div className=" container mt-5 pt-5">

        <h2 className=" text-center fw-bold my-5">News  Apple from yesterday</h2>
        <div className=" row">
         {  data.length > 0 ?
          data.map((elm ,i)=>{
    return  <div className=" col-md-4">

          <div key={i} className=" mb-3 itemHomeNews shadow-lg">
                  <h4> Author : {elm.author}</h4>
                  <p>Date {elm.publishedAt}</p>
                  <a href={elm.url} target='_blank'><img src={elm.urlToImage} className="w-100 rounded-5 mb-3" alt="" /></a> 
                
                  <h5 >{elm.content}</h5>
                </div>  
     </div>

          }) :<div  className=" d-flex justify-content-center align-items-center mt-5 pt-5">
                      <i className="fa-solid fa-spinner  fa-spin text-white  iconData"></i>
             </div>
         }
        </div>
      </div>
    </>
  );
}
