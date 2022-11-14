import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  let [err, setErr] = useState();
  let [loading, setLoading] = useState(false);
  let [errValid, setErrValid] = useState([]);
  let [user, setUser] = useState({
    email: "",
    password: "",
  });
  function getDataFromUser(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUser(myUser);
  }
  function validData() {
    let validUser = Joi.object({
      email: Joi.string()
        .required()
        .email({ tlds: ["com", "net", "org", "eg"] }),
      password: Joi.string().pattern(new RegExp("^[A-Z][a-z0-9]{0,9}$")),
    });
    return validUser.validate(user, { abortEarly: false });
  }

  async function sendData(e) {
    e.preventDefault();
    setLoading(true);
    let validResult = validData();
    if (validResult.error == null) {
      let { data } = await axios.post(
        `http://localhost:2000/user/signIn`,
        user
      );
      if (data.message == "success") {
        localStorage.setItem('token' , data.token)
        console.log(data.token);
        navigate('/home')
        setLoading(false);
      } else {
        setErr(data.message);
        setLoading(false);
      }
    } else {
      setErrValid(validResult.error.details);
      setLoading(false);
    }
  }

  function ChangeTypeForPassword() {
    if (document.getElementById("showPassword").innerHTML == "SHOW PASSWORD") {
      document.getElementById("passwordInput").type = "text";
      document.getElementById("showPassword").innerHTML = "HIDE PASSWORD";
    } else if (
      document.getElementById("showPassword").innerHTML == "HIDE PASSWORD"
    ) {
      document.getElementById("passwordInput").type = "password";
      document.getElementById("showPassword").innerHTML = "SHOW PASSWORD";
    }
  }
  return (
    <>
      <section className=" d-flex justify-content-center pt-5">
        <div className=" container   mt-5">
          <div className=" row mt-5">
            <div className=" col-md-12">
              <div className="item mx-5">
                <form onSubmit={sendData}>
                  <h2 className=" text-center text-danger">{err}</h2>

                  <div className="mb-2">
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      onChange={getDataFromUser}
                      className=" form-control"
                    />

                    {errValid.map((elm, i) => {
                      if (elm.path[0] == "email") {
                        return (
                          <p key={i} className=" text-danger">
                            {elm.message}
                          </p>
                        );
                      }
                    })}
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      onChange={getDataFromUser}
                      type="password"
                      name="password"
                      className=" form-control"
                      id="passwordInput"
                    />
                    {errValid.map((elm, i) => {
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
                    <p
                      id="showPassword"
                      className=" showPassword d-flex justify-content-end"
                      onClick={ChangeTypeForPassword}
                    >
                      SHOW PASSWORD
                    </p>
                  </div>

                  <button
                    type="submit"
                    className=" btn btn-outline-info mt-2 w-100"
                  >
                    {loading ? (
                      <i className="fa-solid fa-spinner  fa-spin text-white"></i>
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>
                <p className=" mt-2 d-flex justify-content-end">
                  <Link to={"/Register"}>Create a new account</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
