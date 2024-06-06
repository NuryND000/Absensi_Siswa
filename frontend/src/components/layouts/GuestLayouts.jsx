import React, { useState } from "react";
import logo from "../../image/logo.png";

export default function GuestLayouts({ name, children }) {
  const [isActive, setIsActive] = useState(false);

  const handleBurgerClick = () => {
    setIsActive(!isActive);
  };
  return (
    <div className="mr-5 ml-5">
      <nav className="navbar is-transparent mt-3 has-shadow">
        <div className="navbar-brand is-large">
          <a
            className="navbar-item"
            href="/"
          >
            <img
              src={logo}
              alt=""
            />
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
            <a
              href="/"
              class="navbar-item"
            >
              Data Kehadiran Siswa
            </a>
            <a
              href="/tentang"
              class="navbar-item mr-3"
            >
              Tentang
            </a>
<div className="buttons">
<a
              href="/login"
              class="button is-warning"
            >
              Masuk
            </a>
</div>
            
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
