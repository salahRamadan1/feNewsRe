import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img from "./../img/unnamed.png";
export default function Home() {
 let token = localStorage.getItem('token')
 let nameUser = jwtDecode( token).user.name
 
  const [News, setNewsStreat] = useState([]);
  const [NewsTeach, setNewsTeach] = useState([]);
  const [NewsBusiness, setNewsBusiness] = useState([]);
  const [NewsTesla, setNewsTesla] = useState([]);
  const [NewsApple, setNewsApple] = useState([]);
  async function getDataWallStreat() {
    let { data } = await axios.get(
      `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=9b6e6465fb6747f5a4005a2d8384d0bb`
    );
    setNewsStreat(data.articles);
  }
  async function getDataTeach() {
    let { data } = await axios.get(
      `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=9b6e6465fb6747f5a4005a2d8384d0bb`
    );
    setNewsTeach(data.articles);
  }
  async function getDataBusiness() {
    let { data } = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=9b6e6465fb6747f5a4005a2d8384d0bb`
    );
    setNewsBusiness(data.articles);
  }
  async function getDataTesla() {
    let { data } = await axios.get(
      `https://newsapi.org/v2/everything?q=tesla&from=2022-08-15&sortBy=publishedAt&apiKey=9b6e6465fb6747f5a4005a2d8384d0bb`
    );
      setNewsTesla(data.articles);
  }
  async function getDataApple() {
    let { data } = await axios.get(
      `https://newsapi.org/v2/everything?q=apple&from=2022-09-14&to=2022-09-14&sortBy=popularity&apiKey=9b6e6465fb6747f5a4005a2d8384d0bb`
    );
    setNewsTesla(data.articles);
  }
function icon(){
   let iconC =  document.getElementById('icon')
   iconC.style.display = 'none'
}
  useEffect(() => {
    getDataApple()
    getDataBusiness()
    getDataTeach()
    getDataWallStreat();
    getDataTesla()
  }, []);
  return (
    <>
      <div className=" container mt-5 pt-5 text-center w-75">
         <div className="navigate"id="icon" >
           
          <p className="text-black fw-bolder">    If you have news, click <Link to={'/add'}>here</Link> </p> 
           <i onClick={icon}  className="fa-regular fa-circle-xmark text-black fs-3 iconHome"></i>
       
         
   
          </div>



        <div className=" row align-items-center">
          <div className=" col-md-6">
            <img src={img} className="  " alt="" />
          </div>
          <div className=" col-md-6">
            <h1 className=" fw-bold">welcome <span className=" text-black"> {nameUser.toUpperCase()}</span> to our news</h1>
            <h3>
              Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit.
              Repellat, <br /> magnam.
            </h3>
          </div>
          <div className=" mt-2">
            <h3 className=" fw-bold">We hope you will see great news</h3>
          </div>
        </div>
        {/* ********** */}
        <hr />
      </div>
      <div className=" container">
        <div className=" row  ">
      
          <div className="col-md-6 ">
            {News.slice(0, 20).map((elm, i) => {
             return  <div key={i} className=" mb-3 itemHomeNews shadow-lg">
                <h4> Author : {elm.author}</h4>
                <p>Date {elm.publishedAt}</p>
                <a href={elm.url} target='_blank'><img src={elm.urlToImage} className="w-100 rounded-5" alt="" /></a> 
                <h2 className=" fw-bold">{elm.description}</h2>
                <h5>{elm.content}</h5>
              </div>;
            })}
          </div>
        
          <div className="col-md-6">
            {NewsTeach.slice(0, 20).map((elm, i) => {
             return  <div key={i} className=" mb-3 itemHomeNews shadow-lg">
                <h4> Author : {elm.author}</h4>
                <p>Date {elm.publishedAt}</p>
                <a href={elm.url} target='_blank'><img src={elm.urlToImage} className="w-100 rounded-5" alt="" /></a> 
                <h2 className=" fw-bold">{elm.description}</h2>
                <h5>{elm.content}</h5>
              </div>;
            })}
          </div>
       
          <div className="col-md-6 ">
            {NewsBusiness.slice(0, 20).map((elm, i) => {
             return  <div key={i} className=" mb-3 itemHomeNews shadow-lg">
                <h4> Author : {elm.author}</h4>
                <p>Date {elm.publishedAt}</p>
                <a href={elm.url} target='_blank'><img src={elm.urlToImage} className="w-100 rounded-5" alt="" /></a> 
                <h2 className=" fw-bold">{elm.description}</h2>
                <h5>{elm.content}</h5>
              </div>;
            })}
          </div>
       
          <div className="col-md-6 ">
            {NewsTesla.slice(0, 20).map((elm, i) => {
             return  <div key={i} className=" mb-3 itemHomeNews shadow-lg">
                <h4> Author : {elm.author}</h4>
                <p>Date {elm.publishedAt}</p>
                <a href={elm.url} target='_blank'><img src={elm.urlToImage} className="w-100 rounded-5" alt="" /></a> 
                <h2 className=" fw-bold">{elm.description}</h2>
                <h5>{elm.content}</h5>
              </div>;
            })}
          </div>
        
          <div className="col-md-6 ">
            {NewsApple.slice(0, 20).map((elm, i) => {
             return  <div key={i} className=" mb-3 itemHomeNews shadow-lg">
                <h4> Author : {elm.author}</h4>
                <p>Date {elm.publishedAt}</p>
                <a href={elm.url} target='_blank'><img src={elm.urlToImage} className="w-100 rounded-5" alt="" /></a> 
                <h2 className=" fw-bold">{elm.description}</h2>
                <h5>{elm.content}</h5>
              </div>;
            })}
          </div>
         
        </div>
      </div>
    </>
  );
}
