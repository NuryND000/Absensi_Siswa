// src/components/login/Login.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../image/logo.png";
import useAuth from "../authService.js";

const Login = () => {
  const [nip, setNip] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/absensi"); // Redirect to the desired page if already logged in
    }
  }, [isLoggedIn, navigate]);

  const Auth = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/login", {
        nip,
        password,
      });
      navigate('/absensi');
    } catch (error) {
      setMsg(error.response.data.msg);
    }
  };

  return (
    <section className="hero is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-4-desktop is-widescreen">
              <div className="columns is-centered mb-5">
                <div className="column">
                  <p className="has-text-weight-bold is-size-4 has-text-centered">
                    UPT SMP NEGERI 3 SRENGAT
                  </p>
                </div>
                {/* <div className="column is-centered">
                  <figure className="image is-128x128 is-1by1">
                    <img src={logo} alt="" />
                  </figure>
                </div> */}
              </div>
              <form className="box" onSubmit={Auth}>
                <p className="has-text-centered">{msg}</p>
                <div className="field">
                  <label className="label">NIP</label>
                  <div className="control">
                    <input
                      type="number"
                      className="input"
                      required
                      onChange={(e) => setNip(e.target.value)}
                      value={nip}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type="password"
                      placeholder="*******"
                      className="input"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="checkbox">
                    <input type="checkbox" />
                    Remember me
                  </label>
                </div>
                <div className="field">
                  <button className="button is-success" type="submit">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
