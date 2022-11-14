import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  let [err, setErr] = useState(null);
  const [errValidate, SetErrValidate] = useState([]);
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    age: 0,
  });
  function validUser() {
    let validData = Joi.object({
      name: Joi.string().min(2).max(10).required(),

      age: Joi.number().min(16).max(80).required(),
      email: Joi.string()
        .email({ tlds: ["com", "net"] })
        .required(),
      password: Joi.string()
        .pattern(new RegExp("^[A-Z][a-z0-9]{0,9}$"))
        .required(),
    });
    return validData.validate(user, { abortEarly: false });
  }
  function getDataUser(e) {
    let myUSer = { ...user };
    myUSer[e.target.name] = e.target.value;
    setUser(myUSer);
  }
  async function sendData(e) {
    setLoading(true);

    e.preventDefault();
    let validResult = validData();
  

    let { data } = await axios.post(`http://localhost:2000/user/singUp`, user);
    if (validResult.error == null) {
      if (data.message == "success") {
        navigate("/login");
        setLoading(false);
      } else {
        setErr(data.message);
        setLoading(false);
      }
    } else {
      SetErrValidate(validResult.error.details);
      setLoading(false);
    }
  }
  function validData() {
    let validUser = Joi.object({
      name: Joi.string().min(2).required().max(15),
      age: Joi.number().min(16).max(80).required(),
      email: Joi.string()
        .email({ tlds: ["com", "net", "org", "eg"] })
        .required(),
      password: Joi.string().pattern(new RegExp("^[A-Z][a-z0-9]{0,9}$")),
    });


    
    return validUser.validate(user, { abortEarly: false });
  }

  function ChangeTypeForPassword() {
     if( document.getElementById('showPassword').innerHTML =='SHOW PASSWORD' ){
       
      document.getElementById('passwordInput').type = 'text'
      document.getElementById('showPassword').innerHTML = 'HIDE PASSWORD'
     }else if(document.getElementById('showPassword').innerHTML =='HIDE PASSWORD'){
    
      document.getElementById('passwordInput').type = 'password'
      document.getElementById('showPassword').innerHTML = 'SHOW PASSWORD'
     }
  }

  return (
    <>
      <section className=" d-flex justify-content-center mt-5 ">
        <div className=" container    ">
          <div className=" row mt-5">
            <div className=" col-md-12">
              <div className="item mx-5">
                <h1 className=" text-center text-danger">{err}</h1>
                <form onSubmit={sendData}>
                  <div className="mb-2">
                    <label htmlFor="Name">Name</label>
                    <input
                      type="text"
                      name="name"
                      onChange={getDataUser}
                      className=" form-control"
                    />
                    {errValidate.map((elm, i) => {
                      if (elm.path[0] == "name") {
                        return (
                          <p key={i} className=" text-danger">
                            {" "}
                            {elm.message}
                          </p>
                        );
                      }
                    })}
                  </div>

                  <div className="mb-2">
                    <label htmlFor="age">Age</label>
                    <input
                      type="number"
                      name="age"
                      onChange={getDataUser}
                      className=" form-control"
                    />
                    {errValidate.map((elm, i) => {
                      if (elm.path[0] == "age") {
                        return (
                          <p key={i} className=" text-danger">
                            {" "}
                            {elm.message}
                          </p>
                        );
                      }
                    })}
                  </div>

                  <div className="mb-2">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      onChange={getDataUser}
                      className=" form-control"
                    />
                    {errValidate.map((elm, i) => {
                      if (elm.path[0] == "email") {
                        return (
                          <p key={i} className=" text-danger">
                            {" "}
                            {elm.message}
                          </p>
                        );
                      }
                    })}
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      onChange={getDataUser}
                      type="password"
                      name="password"
                      className=" form-control"
                      id="passwordInput"
                    />
                    {errValidate.map((elm, i) => {
                      if (elm.path[0] == "password") {
                        return (
                          <p key={i} className=" text-danger">
                            You must write the first capital letter, then
                            numbers and letters{" "}
                            <span className="text-info">
                              {" "}
                              (the number of entries is 9 only)
                            </span>
                            <span className=" text-white"> Ex: Asde235</span>
                          </p>
                        );
                      }
                    })}
                    <p  id="showPassword"  className=" showPassword d-flex justify-content-end" onClick={ChangeTypeForPassword}>SHOW PASSWORD</p>
                  </div>
                  <button
                    type="submit"
                    className=" btn btn-outline-info mt-2 w-100"
                  >
                    {loading ? (
                      <i className="fa-solid fa-spinner  fa-spin text-white"></i>
                    ) : (
                      "Register"
                    )}
                  </button>
                </form>
                <p className=" mt-2 d-flex justify-content-end">
                  <Link to={"/login"}>I have an account</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
