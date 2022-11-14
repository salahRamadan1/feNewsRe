import axios from "axios";
import Joi from "joi";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
export default function Add() {
  const [errValidate, SetErrValidate] = useState([]);

  let Token = localStorage.getItem("token");
  let [data, setData] = useState([]);
  let [news, setNews] = useState({
    title: "",
    desc: "",
    createdBy: jwtDecode(localStorage.getItem("token")).user._id,
    token: localStorage.getItem("token"),
  });
  function getNewsFromUser(e) {
    let myNews = { ...news };
    myNews[e.target.name] = e.target.value;
    setNews(myNews);
  }
  async function sendNewsForApi(e) {
    e.preventDefault();
    let validResult =  validate()
    let { data } = await axios.post("http://localhost:2000/news/addNews", news);
    if(validResult.error == null){
      if (data.message == "success") {
        clear();
        getNewsByUser();
      } else {
        alert(data.message);
      }
    }else{
      SetErrValidate(validResult.error.details)
    }

  }
  async function getNewsByUser() {
    let { data } = await axios.get(`http://localhost:2000/news/userNews`, {
      headers: {
        _id: jwtDecode(localStorage.getItem("token")).user._id,
        token: localStorage.getItem("token"),
      },
    });
    if (data.message == "success") {
      setData(data.data);
      getNewsByUser();
    }
  }
  useEffect(() => {
    getNewsByUser();
  }, []);
  async function deleteNews(_id) {
    let { data } = await axios.delete("http://localhost:2000/news/deleteNews", {
      data: {
        _id,
        token: localStorage.getItem("token"),
      },
    });
    if (data.message == "deleted") {
      alert(data.message);
      getNewsByUser();
    } else {
      alert(data.message);
    }
  }
  function updateNews(indexNote, idNote) {
    document.querySelector("#exampleModal input").value = data[indexNote].title;
    document.querySelector("#exampleModal textarea").value =
      data[indexNote].desc;
    setNews({
      ...news,
      title: data[indexNote].title,
      desc: data[indexNote].desc,
      _id: idNote,
      token: Token,
    });
  }
  async function updateModel(e) {
    e.preventDefault();
    let { data } = await axios.put(
      "http://localhost:2000/news/updateNews",
      news
    );
    if (data.message == "success") {
      getNewsByUser();
    } else {
      alert(data.message);
    }
  }
  function getNews({ target }) {
    setNews({
      ...news,
      [target.name]: target.value,
    });
  }
  function clear() {
    document.getElementById("desc").value = "";
    document.getElementById("title").value = "";
  }
function validate(){

  let validUser = Joi.object({
    title: Joi.string().required().min(5),
    desc: Joi.string().min(20).required()
  })

   return validUser.validate(news, { abortEarly: false })
}



  return (
    <>
      <div className=" container mt-5 pt-5">
        <div className=" row g-5 justify-content-center">
          <div className="   col-md-3">
            <div className=" itemNotes">
              <form onSubmit={sendNewsForApi}>
                <label htmlFor="title" className=" fw-bold text-black">
                  Title
                </label>
                {errValidate.map((elm, i) => {
                      if (elm.path[0] == "title") {
                        return (
                          <p key={i} className=" text-danger">
                            {" "}
                            {elm.message}
                          </p>
                        );
                      }
                    })}
                <input
                  type="text"
                  onChange={getNewsFromUser}
                  name="title"
                  className="form-control"
                  id="title"
                />

                <label className=" text-black fw-bold" htmlFor="description">
                  description
                  {
                  errValidate.map((elm, i) => {
                      if (elm.path[0] == "desc") {
                        return (
                          <p key={i} className=" text-danger">
                            {" "}
                            {elm.message}
                          </p>
                        );
                      }
                    })}
                </label>
                <textarea
                  name="desc"
                  onChange={getNewsFromUser}
                  className=" form-control  "
                  id="desc"
                ></textarea>

                <button
                 onClick={clear}
                  type="submit"
                  className=" btn mt-2 w-100   btn-success"
                >
                  <div className="right">
                    <p className="me-2  ">Send</p>
                    <i className="fa-solid fa-right-long  mt-1"></i>
                  </div>
                </button>
              </form>
            </div>
          </div>
          <div className=" offset-1 col-md-6">
            <div className=" row g-5">
              {data.map((elm, i) => {
                return (
                  <div key={i} className="   itemNews col-md-12">
                    <div className="clearfix"></div>
                    <h1>
                      {" "}
                      <span className=" text-black">TITLE :</span> {elm.title}
                    </h1>
                    <h6>
                      {" "}
                      <span className=" text-black">DESCRIPTION :</span>{" "}
                      {elm.desc.slice(0,200)}
                    </h6>
                    <div className="   justify-content-end">
                      <i
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => {
                          updateNews(i, elm._id);
                        }}
                        className="fa-solid fa-marker update rounded-4 me-3"
                      ></i>

                      <div
                        className="modal fade"
                        id="exampleModal"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                Modal title
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <form onSubmit={updateModel}>
                              <div className="modal-body">
                                <label
                                  htmlFor="title"
                                  className=" text-black fw-bolder"
                                >
                                  Title
                                </label>
                                <input
                                  type="text"
                                  onChange={getNews}
                                  name="title"
                                  className="form-control"
                                />
                                {/* ****************************************************** */}
                                <label
                                  htmlFor="title"
                                  className=" text-black fw-bolder"
                                >
                                  Title
                                </label>
                                <textarea
                                  type="text"
                                  onChange={getNews}
                                  name="desc"
                                  className="form-control"
                                />
                              </div>

                              <div className="modal-footer">
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  data-bs-dismiss="modal"
                                >
                                  Edit
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <i
                        onClick={() => {
                          deleteNews(elm._id);
                        }}
                        className="fa-solid fa-delete-left delete rounded-4"
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" col-md-1 ms-5 d-flex text-black fw-bolder">
            {" "}
            number of news{" "}
            <h1 className="ms-5   NumberOfNews  shadow-lg">
              {data.length}
            </h1>{" "}
          </div>
        </div>
      </div>
    </>
  );
}
