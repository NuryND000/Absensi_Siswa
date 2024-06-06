import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-confirm-alert/src/react-confirm-alert.css";
import GuestLayouts from "../layouts/GuestLayouts.jsx";



const AbsensiShow = () => {
  const [absensis, setAbsensi] = useState([]);
  useEffect(() => {
    getAbsensis();
  }, []);

  const getAbsensis = async () => {
    const response = await axios.get("http://localhost:5000/absensis");
    setAbsensi(response.data);
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
  };
  return (
    <GuestLayouts name={"rekap"}>
      <div className="columns mt-5 is-mobile is-centered">
        <div className="column is-four-fifths">
          <table className="table is-striped is-fullwidth mt-5">
            <thead>
              <tr>
                <th>NO</th>
                <th>TANGGAL</th>
                <th>KELAS</th>
                <th>MATA PELAJARAN</th>
                <th>KETERANGAN</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </GuestLayouts>
  );
};

export default AbsensiShow;
