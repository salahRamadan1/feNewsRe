import axios from "axios";
import React, { useEffect, useState } from "react";

export default function PeopleNews() {
    let [comments,setComments] = useState([])
  let [sendComment, setSendComment] = useState({
    comment: "",
    createdByIdUser: "",
    createdByIdNews: "",
  });
  let [dataNews, serDataNews] = useState([]);
  async function getData() {
    let { data } = await axios.get("http://localhost:2000/news/getAllNews");

    if (data.message == "success") {
      serDataNews(data.data);
    }
  }

  function getComment(createdByIdNews, createdByIdUser) {
    let comments = document.getElementById("comments");
    console.log(comments.value);
    setSendComment({
        comment: comments.value,
      createdByIdUser,
      createdByIdNews,
    });
    console.log(sendComment);
  }
  async function sendComments(e) {
    e.preventDefault();
    let res = await axios.post(
      "http://localhost:2000/com/addComment",
      sendComment
    );
    console.log(res);
  }
  // async function getCommentForApi(id) {
  //   console.log(id);
  //   let res = await axios.get(`http://localhost:2000/com/getComments` , {
  //     data:{
  //       _id:id
  //     }
  //   });
  //   console.log(res);
  // }

  useEffect(() => {
    
    getData();
  }, []);
 
  return (
    <>
      <div className=" container mt-5 pt-5">
        <div className="row">
          {dataNews.map((elm, i) => {
            return (
              <div key={i} className=" my-3 PeopleNewsNameDescParent col-md-12">
                <div className="PeopleNewsNameDescChild">
                  <h1> NAME : {elm.createdBy.name.toUpperCase()}</h1>
                  <p> DATE :{elm.createdBy.createdAt}</p>
                  <div className="brd"></div>
                </div>
                <h2 className="  "><span className="text-black fw-bolder h2">Title</span>  : {elm.title}</h2>
                <h5> <span className="text-black fw-bolder h2">Description</span>  :    {elm.desc}</h5>
                {/* <form onSubmit={sendComments}>
                  <textarea
                    onChange={() => {
                      getComment(elm._id, elm.createdBy._id);
                    }}
                    name="comment"
                    type="text"
                    id="comments"
                    className="form-control my-2 h-25"
                    placeholder="Comment"
                  />
                  <button className=" btn btn-success mb-1 float-end">
                    {" "}
                    Send
                  </button>
                </form> */}
                <div className=" clearfix"></div>
                {/* <div className=" col-md-12 cooments ">
                       <button data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{getCommentForApi(elm._id)}} className=" btn btn-danger d-flex justify-content-center"> See Comments</button>
                         <div className=" clearfix"></div>
                         
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

 
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        ...
      </div>
     
    </div>
  </div>
</div>

                </div> */}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
