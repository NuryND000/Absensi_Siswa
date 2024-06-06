import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import AuthLayouts from "../layouts/AuthLayouts.jsx";
import { BsGearFill, BsTrashFill } from "react-icons/bs";
import useAuth from "../authService.js";

const AbsensiList = () => {
  const [absensis, setAbsensi] = useState([]);
  const { token, axiosJWT } = useAuth();
  useEffect(() => {
    getAbsensis();
  }, []);

  const getAbsensis = async () => {
    const response = await axios.get("http://localhost:5000/absensis");
    setAbsensi(response.data);
  };

  const submit = async (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteAbsensi(id),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const deleteAbsensi = async (id) => {
    try {
      await axiosJWT.delete(`http://localhost:5000/absensis/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await axiosJWT.delete(`http://localhost:5000/detailabsensis/many/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAbsensis();
    } catch (error) {
      console.log(error);
    }
  };
  function convertDateTimeFormat(datetime) {
    // Buat objek Date dari string datetime
    const originalDate = new Date(datetime);

    // Dapatkan komponen tanggal, bulan, tahun, jam, dan menit
    const day = originalDate.getDate();
    const days = originalDate.getDay();
    const month = originalDate.getMonth(); // Perhatikan bahwa bulan dimulai dari 0
    const year = originalDate.getFullYear();
    const hours = originalDate.getHours();
    const minutes = originalDate.getMinutes();

    const hari = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];
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
    const formattedDateTime = `${hari[days]}, ${day} ${bulan[month]} ${year} ${hours}:${minutes}`;

    return formattedDateTime;
  }
  return (
    <AuthLayouts name={"Rekap"}>
      <div className="columns mt-5 is-mobile is-centered">
        <div className="column is-four-fifths">
          <div className="box">
          <Link
            to="/absensi/add"
            className="button is-success"
          >
            Tambah Absensi
          </Link>
          </div>
          <div className="box mt-2 table-container">
          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>NO</th>
                <th>TANGGAL</th>
                <th>KELAS</th>
                <th>MATA PELAJARAN</th>
                <th>KETERANGAN</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {absensis.map((absensi, index) => (
                <tr key={absensi._id}>
                  <td>{index + 1}</td>
                  <td>{convertDateTimeFormat(absensi.tanggal)}</td>
                  <td>{absensi.kelas[0].name}</td>
                  <td>{absensi.mapel[0].name}</td>
                  <td>{absensi.keterangan}</td>
                  <td>
                    <Link
                      to={`edit/${absensi._id}`}
                      className="button is-info is-small mr-3"
                    >
                      <BsGearFill />
                    </Link>
                    <button
                      onClick={() => submit(absensi._id)}
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
    </AuthLayouts>
  );
};

export default AbsensiList;
