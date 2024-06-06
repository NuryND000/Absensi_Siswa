import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsGearFill, BsTrashFill } from "react-icons/bs";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AddUser from "./AddUser.js";
import useAuth from "../authService.js";
import AuthLayouts from "../layouts/AuthLayouts.jsx";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const { token, axiosJWT, refreshToken } = useAuth();

  useEffect(() => {
    getUsers();
    refreshToken();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      await axiosJWT.post("http://localhost:5000/importUser", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Data uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to upload data");
    }
  };

  const getUsers = async () => {
    try {
      const response = await axiosJWT.get("http://localhost:5000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function convertDateTimeFormat(datetime) {
    // Buat objek Date dari string datetime
    const originalDate = new Date(datetime);

    // Dapatkan komponen tanggal, bulan, tahun, jam, dan menit
    const day = originalDate.getDate();
    const month = originalDate.getMonth(); // Perhatikan bahwa bulan dimulai dari 0
    const year = originalDate.getFullYear();

    const bulan = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    // Format tanggal dan waktu sesuai keinginan
    const formattedDateTime = `${day} ${bulan[month]} ${year}`;

    return formattedDateTime;
  }
  const submit = async (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteUser(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const deleteUser = async (id) => {
      try {
        await axiosJWT.delete(`http://localhost:5000/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        getUsers();
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <AuthLayouts name={"User"}>
      <div className="columns mt-5 is-mobile is-centered">
        <div className="column is-four-fifths">
          <div className=" box">
            <div className="columns">
              <div className="column">
                <button
                  className="button is-primary"
                  onClick={openModal}
                >
                  Tambah User
                </button>
              </div>
              <div className="column">
                <input
                  type="file"
                  className="input"
                  onChange={handleFileChange}
                />
              </div>
              <div className="column">
                <button
                  onClick={handleSubmit}
                  className="button is-info"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
          <div className="box mt-1 table-container">
            <table className="table is-striped is-fullwidth">
              <thead>
                <tr>
                  <th>NO</th>
                  <th>NIP</th>
                  <th>NAMA</th>
                  <th>ALAMAT</th>
                  <th>TEMPAT/TANGGAL LAHIR</th>
                  <th>AKSI</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.nip}</td>
                    <td>{user.name}</td>
                    <td>{user.alamat}</td>
                    <td>
                      {user.tmplahir}, {convertDateTimeFormat(user.tgllahir)}
                    </td>
                    <td>
                      <Link
                        to={`edit/${user._id}`}
                        className="button is-info is-small mr-3"
                      >
                        <BsGearFill />
                      </Link>
                      <button
                        onClick={() => submit(user._id)}
                        className="button is-danger is-small"
                      >
                        <BsTrashFill />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal is-active">
          <div
            className="modal-background"
            onClick={closeModal}
          ></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <div class="has-text-centered">
                <p class="title">Tambah Data User</p>
              </div>
            </header>
            <section class="modal-card-body">
              <AddUser close={closeModal} />
            </section>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={closeModal}
          ></button>
        </div>
      )}
      ;
    </AuthLayouts>
  );
};

export default UserList;
