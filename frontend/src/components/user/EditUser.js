import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../authService.js";

const EditUser = () => {
  const [nip, setNip] = useState("");
  const [name, setName] = useState("");
  const [alamat, setAlamat] = useState("");
  const [tmplahir, setTmplahir] = useState("");
  const [tgllahir, setTgllahir] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRole] = useState("guru");
  const [updatePassword, setUpdatePassword] = useState(false); // State for password update toggle
  const navigate = useNavigate();
  const { id } = useParams();
  const { token, axiosJWT, role } = useAuth();

  useEffect(() => {
    getUsersById();
  }, []);

  const getUsersById = async () => {
    const response = await axiosJWT.get(`http://localhost:5000/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNip(response.data.nip);
    setName(response.data.name);
    setAlamat(response.data.alamat);
    setTmplahir(response.data.tmplahir);
    setTgllahir(response.data.tgllahir);
    setRole(response.data.role);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        nip,
        name,
        alamat,
        tmplahir,
        tgllahir,
        role: roles,
      };

      if (updatePassword && password) {
        userData.password = password;
      };
      await axiosJWT.patch(`http://localhost:5000/users/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (role === "admin") {
        navigate("/user");
      } else {
        navigate("/absensi");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="hero is-small">
      <div className="hero-body has-text-centered">
        <p className="title">Edit Data User</p>
      </div>
      <div className="columns is-mobile is-centered">
        <div className="column is-half">
          <form onSubmit={updateUser}>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <label className="label">NIP</label>
                  <div className="control">
                    <input
                      type="number"
                      className="input"
                      value={nip}
                      onChange={(e) => setNip(e.target.value)}
                      placeholder="123"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Nama</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Alamat</label>
              <div className="control">
                <textarea
                  type="text"
                  className="input textarea"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  placeholder="Alamat"
                />
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <label className="label">Tempat Lahir</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={tmplahir}
                      onChange={(e) => setTmplahir(e.target.value)}
                      placeholder="Tempat Lahir"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Tanggal Lahir</label>
                  <div className="control">
                    <input
                      type="date"
                      className="input"
                      value={tgllahir}
                      onChange={(e) => setTgllahir(e.target.value)}
                      placeholder="Tanggal Lahir"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      disabled={!updatePassword} // Disable input if updatePassword is false
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={updatePassword}
                    onChange={() => setUpdatePassword(!updatePassword)}
                  />
                  &nbsp;Update Password
                </label>
              </div>
            </div>
            {role === "admin" ? (
              <div className="field">
                <label className="label">Role</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={roles}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="admin">admin</option>
                      <option value="guru">guru</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="field">
              <div className="control">
                <button type="submit" className="button is-success mr-5">
                  Update
                </button>
                <a href="/user" className="button">
                  Cancel
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditUser;
