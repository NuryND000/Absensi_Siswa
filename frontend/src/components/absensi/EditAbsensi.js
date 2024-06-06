import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../authService";

const EditAbsensi = () => {
  const [kelas_id, setKelas] = useState("");
  const [mapel_id, setMapel] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const {token, axiosJWT} = useAuth();

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
    const response = await axiosJWT.get(`http://localhost:5000/absensis/${id}`);
    setKelas(response.data.kelas_id);
    setMapel(response.data.mapel_id);
    setTanggal(response.data.tanggal);
    setKeterangan(response.data.keterangan);
    console.log(response.data);
  };

  const getKelass = async () => {
    const response = await axiosJWT.get("http://localhost:5000/kelass");
    setKelass(response.data);
    console.log(response.data);
  };

  const getDetail = async () => {
    const response = await axiosJWT.get(
      `http://localhost:5000/detail/absensis/${id}`,
    );
    setDetail(response.data);
    const dataa = response.data;
    const ids = dataa.map((e) => e._id);
    setIdDetail(ids);
    console.log({ids,detailabsensis});
  };

  const getMapels = async () => {
    const response = await axiosJWT.get("http://localhost:5000/mapels");
    setMapels(response.data);
    console.log(response.data);
  };

  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...detailabsensis];
    list[index][name] = value;
    setDetail(list);
  };

  const handlestatuschange = (e, index) => {
    const value = e.target.value;
    const name = "status";
    const list = [...detailabsensis];
    list[index][name] = value;
    setDetail(list);
  };

  const updateAbsensi = async (e) => {
    e.preventDefault();
    try {
      await axiosJWT.patch(`http://localhost:5000/absensis/${id}`, {
        mapel_id,
        keterangan,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await axiosJWT.patch(`http://localhost:5000/detailabsensis/update`, {
        detailabsensis,
        iddetail,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/absensi");
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
    <section class="hero is-small">
      <div class="hero-body has-text-centered">
        <p class="title">Edit Absensi</p>
      </div>
      <div className="columns is-mobile is-centered">
        <div className="column is-half">
          <form onSubmit={updateAbsensi}>
            <div class="field is-horizontal">
              <div class="field-body">
                <div className="field">
                  <label className="label">KELAS</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select
                        disabled="true"
                        value={kelas_id}
                        onChange={(e) => {
                          setKelas(e.target.value);
                        }}
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
                      <select
                        value={mapel_id}
                        onChange={(e) => setMapel(e.target.value)}
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
                      type="text"
                      className="input"
                      value={keterangan}
                      onChange={(e) => setKeterangan(e.target.value)}
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
                    <th>H </th>
                    <th> I </th>
                    <th> S </th>
                    <th> A</th>
                  </tr>
                </thead>
                <tbody>
                  {detailabsensis.map((e, index) => (
                    <tr>
                      <th>{index + 1}</th>
                      <th>{e.siswa[0].name}</th>
                      <th>
                        <div className="control">
                          <input
                            type="text"
                            className="input"
                            name="keterangan"
                            placeholder="keterangan"
                            value={e.keterangan}
                            onChange={(e) => handleinputchange(e, index)}
                          />
                        </div>
                      </th>
                      <th>
                        <div className="control">
                          <input
                            className="mr-1"
                            type="radio"
                            name={"status " + index}
                            value="h"
                            onChange={(e) => handlestatuschange(e, index)}
                            checked={e.status === "h"}
                          />
                        </div>
                      </th>
                      <th>
                        <div className="control">
                          <input
                            className="mr-1"
                            type="radio"
                            name={"status " + index}
                            value="i"
                            onChange={(e) => handlestatuschange(e, index)}
                            checked={e.status === "i"}
                          />
                        </div>
                      </th>
                      <th>
                        <div className="control">
                          <input
                            className="mr-1"
                            type="radio"
                            name={"status " + index}
                            value="s"
                            onChange={(e) => handlestatuschange(e, index)}
                            checked={e.status === "s"}
                          />
                        </div>
                      </th>
                      <th>
                        <div className="control">
                          <input
                            className="mr-1"
                            type="radio"
                            name={"status " + index}
                            value="a"
                            onChange={(e) => handlestatuschange(e, index)}
                            checked={e.status === "a"}
                          />
                        </div>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="field">
              <div className="control">
                <button
                  type="submit"
                  className="button is-success mr-5"
                >
                  Save
                </button>
                <a
                  href="/absensi"
                  className="button"
                >
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

export default EditAbsensi;
