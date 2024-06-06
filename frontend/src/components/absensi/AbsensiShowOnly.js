import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AbsensiShowOnly = () => {
  const [kelas_id, setKelas] = useState("");
  const [mapel_id, setMapel] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [keterangan, setKeterangan] = useState("");

  const formattanggal = convertDateTimeFormat(tanggal);

  const navigate = useNavigate();
  const { id } = useParams();

  const [kelass, setKelass] = useState([]);
  const [mapels, setMapels] = useState([]);
  const [detailabsensis, setDetail] = useState([]);
  const [iddetail, setIdDetail] = useState([]);

  useEffect(() => {
    getAbsensiById();
    getKelass();
    getMapels();
    getDetail();
  }, []);

  const getAbsensiById = async () => {
    const response = await axios.get(`http://localhost:5000/absensis/${id}`);
    setKelas(response.data.kelas_id);
    setMapel(response.data.mapel_id);
    setTanggal(response.data.tanggal);
    setKeterangan(response.data.keterangan);
    console.log(response.data);
  };

  const getKelass = async () => {
    const response = await axios.get("http://localhost:5000/kelass");
    setKelass(response.data);
    console.log(response.data);
  };

  const getDetail = async () => {
    const response = await axios.get(
      `http://localhost:5000/detail/absensis/${id}`,
    );
    setDetail(response.data);
    const dataa = response.data;
    const ids = dataa.map((product) => product._id);
    setIdDetail(ids);
    console.log(ids);
  };

  const getMapels = async () => {
    const response = await axios.get("http://localhost:5000/mapels");
    setMapels(response.data);
    console.log(response.data);
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
    <section class="hero is-small">
      <div class="hero-body has-text-centered">
        <p class="title">Absensi</p>
      </div>
      <div className="columns is-mobile is-centered">
        <div className="column is-half">
          <form>
            <div class="field is-horizontal">
              <div class="field-body">
                <div className="field">
                  <label className="label">KELAS</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select
                        disabled="true"
                        value={kelas_id}
                      >
                        <option value=""> </option>
                        {kelass.map((kelas, index) => (
                          <option value={kelas._id}>{kelas.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label className="label">TANGGAL</label>
                  <div className="control">
                    <input
                      type="text"
                      disabled="true"
                      className="input is-desible"
                      value={formattanggal}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-body">
                <div className="field">
                  <label className="label">MATA PELAJARAN</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select disabled="true"
                        value={mapel_id}
                      >
                        <option value=""> </option>
                        {mapels.map((mapel, index) => (
                          <option value={mapel._id}>{mapel.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label className="label">KETERANGAN</label>
                  <div className="control">
                    <input
                      type="text" disabled="true"
                      className="input"
                      value={keterangan}
                      placeholder="keterangan"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="field">
              <table className="table is-striped is-fullwidth mt-5">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Nama</th>
                    <th>Keterangan</th>
                    <th>STATUS </th>
                  </tr>
                </thead>
                <tbody>
                  {detailabsensis.map((e, index) => (
                    <tr>
                      <th>{index + 1}</th>
                      <th>{e.siswa[0].name}</th>
                      <th>
                        {e.keterangan}
                      </th>
                      <th>
                        {e.status}
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AbsensiShowOnly;
