import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from '../../image/logo.png';
import useAuth from '../authService';

export default function AuthLayouts({name, children}) {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const {nama,role, userId} = useAuth();
  
    const handleBurgerClick = () => {
      setIsActive(!isActive);
    };
  
    const Logout = async () => {
      try {
        await axios.delete("http://localhost:5000/logout");
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <div className='container'>
      <nav className="navbar is-transparent mt-3">
      <div className="navbar-brand is-large">
        <a className="navbar-item" href="/">
          <img src={logo} alt="" />
        </a>
        <div className="navbar-item">
          <p className="title is-5">UPT SMPN 3 SRENGAT</p>
        </div>
        <div
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
          onClick={handleBurgerClick}
          data-target="navbarExampleTransparentExample"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div
        id="navbarExampleTransparentExample"
        className={`navbar-menu ${isActive ? "is-active" : ""}`}
      >
        <div className="navbar-end">
          {role ? (
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">{nama}</a>
              <div className="navbar-dropdown is-boxed">
                <a className="navbar-item" href={`/user/edit/${userId}`}>Profile</a>
                <hr className="navbar-divider" />
                <a className="navbar-item" onClick={Logout}>
                  Keluar
                </a>
              </div>
            </div>
          ) : (
            <a href="/login" className="navbar-item">Masuk</a>
          )}
        </div>
      </div>
    </nav>
    <div className="tabs">
      <ul>
        {role === "guru" ? (
          <>
          <li className={name === "Rekap" ? "is-active" : ""}>
            <a href="/absensi">Rekap</a>
          </li>
          <li className={name === "Absensi" ? "is-active" : ""}>
          <a href="/absensi/add">Absensi</a>
        </li>
        </>
        ) : null}
        {role === "admin" ? (
          <>
          <li className={name === "Rekap" ? "is-active" : ""}>
            <a href="/absensi">Rekap</a>
          </li>
            <li className={name === "Absensi" ? "is-active" : ""}>
              <a href="/absensi/add">Absensi</a>
            </li>
            <li className={name === "User" ? "is-active" : ""}>
              <a href="/user">User</a>
            </li>
            <li className={name === "Siswa" ? "is-active" : ""}>
              <a href="/siswa">Siswa</a>
            </li>
            <li className={name === "Mapel" ? "is-active" : ""}>
              <a href="/mapel">Mata Pelajaran</a>
            </li>
            <li className={name === "Kelas" ? "is-active" : ""}>
              <a href="/kelas">Kelas</a>
            </li>
            <li className={name === "Laporan" ? "is-active" : ""}>
              <a href="/laporan">Laporan</a>
            </li>
            
          </>
        ) : null}
        
      </ul>
    </div>
    <main>{children}</main>
    </div>
  )
}
