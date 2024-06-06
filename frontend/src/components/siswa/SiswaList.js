import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { BsGearFill, BsTrashFill } from "react-icons/bs";
import useAuth from "../authService.js";
import AuthLayouts from "../layouts/AuthLayouts.jsx";


const SiswaList = () => {
  const [siswas, setSiswa] = useState([]);
  const [file, setFile] = useState(null);
  const {token, axiosJWT} = useAuth();
  useEffect(() => {
    getSiswas();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
};

const handleSubmit = async () => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        await axiosJWT.post('http://localhost:5000/importSiswa', formData,{
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
        alert('Data uploaded successfully');
        getSiswas();
    } catch (error) {
        console.error(error);
        alert('Failed to upload data');
    }
};

  const getSiswas = async () => {
    try {
      const response = await axiosJWT.get("http://localhost:5000/siswas",{
      headers: {
          Authorization: `Bearer ${token}`
      }
  });
    setSiswa(response.data);
    } catch (error) {
      console.log(error);
    }
    
  };

  const submit = async (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteSiswa(id),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const deleteSiswa = async (id) => {
    try {
      await axiosJWT.delete(`http://localhost:5000/siswas/${id}`);
      getSiswas();
    } catch (error) {
      console.log(error);
    }
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
  };

  return (
    <AuthLayouts name={"Siswa"}>
      <div className="columns mt-5 is-mobile is-centered">
        <div className="column is-four-fifths">
        <div className=" box">
            <div className="columns">
              <div className="column">
          <Link
            to="/siswa/add"
            className="button is-success"
          >
            Tambah Siswa
          </Link>
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
                <th>NISN</th>
                <th>NAMA</th>
                <th>ALAMAT</th>
                <th>TEMPAT/TANGGAL LAHIR</th>
                <th>KELAS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {siswas.map((siswa, index) => (
                <tr key={siswa._id}>
                  <td>{index + 1}</td>
                  <td>{siswa.nisn}</td>
                  <td>{siswa.name}</td>
                  <td>{siswa.alamat}</td>
                  <td>
                    {siswa.tmplahir}, {convertDateTimeFormat(siswa.tgllahir)}
                  </td>
                  <td>{siswa.kelas[0].name}</td>
                  {console.log(siswa)}
                  <td>
                    <Link
                      to={`edit/${siswa._id}`}
                      className="button is-info is-small mr-3"
                    >
                      <BsGearFill />
                    </Link>
                    <button
                      onClick={() => submit(siswa._id)}
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

export default SiswaList;
