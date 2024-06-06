import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../authService.js";
import AuthLayouts from "../layouts/AuthLayouts.jsx";

const AddAbsensi = () => {
  //data rekap induk
  const [keterangan, setKeterangan] = useState("");
  const [kelas_id, setKelas] = useState("");
  const [mapel_id, setMapel] = useState("");
  const [tanggal, setTanggal] = useState("");
  const { token, axiosJWT,refreshToken } = useAuth();
  //data rekap

  const navigate = useNavigate();
  const [kelass, setKelass] = useState([]);
  const [mapels, setMapels] = useState([]);
  const [siswas, setSiswas] = useState([
    {
      siswa_id: "",
      keterangan: "",
      status: "",
      absensi_id: "",
    },
  ]);
  useEffect(() => {
    getKelass();
    getMapels();
    getSiswas();
    refreshToken();
  }, []);

  const getSiswas = async (e) => {
    const response = await axios.get(`http://localhost:5000/siswas/kelas/${e}`);
    setSiswas(response.data);
  };

  const getKelass = async () => {
    const response = await axios.get("http://localhost:5000/kelass");
    setKelass(response.data);
  };
  const getMapels = async () => {
    const response = await axios.get("http://localhost:5000/mapels");
    setMapels(response.data);
  };

  const handleinputchange = (e, index) => {
    const { name, value } = e.target;
    const list = [...siswas];
    list[index][name] = value;
    setSiswas(list);
    console.log(siswas);
  };

  const handlestatuschange = (e, index) => {
    const value = e.target.value;
    const name = "status";
    const list = [...siswas];
    list[index][name] = value;
    setSiswas(list);

    console.log(siswas);
  };

  const saveAbsensi = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosJWT.post(
        "http://localhost:5000/absensis",
        {
          tanggal,
          kelas_id,
          mapel_id,
          keterangan,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const absensiId = response.data._id;
      const updatedSiswas = siswas.map((siswa) => ({
        ...siswa,
        absensi_id: absensiId,
      }));
      const updatedSiswass = updatedSiswas.map(
        ({ _id, status, absensi_id, keterangan }) => ({
          siswa_id: _id,
          status,
          absensi_id,
          keterangan,
        }),
      );
      console.log(updatedSiswass);
      await axiosJWT.post(
        "http://localhost:5000/detailabsensis/many",
        updatedSiswass,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      navigate("/absensi");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayouts name={"Absensi"} >
        <div className="columns mt-5 is-mobile is-centered">
          <div className="column is-four-fifths ">
          <p class="title has-text-centered">ABSENSI SISWA</p>
              <div class="field is-horizontal">
                <div class="field-body">
                  <div className="field">
                    <label className="label">KELAS</label>
                    <div className="control">
                      <div className="select is-fullwidth">
                        <select
                          value={kelas_id}
                          onChange={(e) => {
                            setKelas(e.target.value);
                            getSiswas(e.target.value);
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
                        dateFormat="YYYY-MM-DD"
                        timeFormat="HH:mm"
                        type="datetime-local"
                        className="input"
                        value={tanggal}
                        onChange={(e) => setTanggal(e.target.value)}
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
              <div className="box mt-1 table-container"> 
                <table className="table is-striped is-fullwidth">
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
                    {siswas.map((e, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{e.name}</td>
                        <td>
                          <div className="control">
                            <input
                              type="text"
                              className="input"
                              name="keterangan"
                              placeholder="keterangan"
                              onChange={(e) => handleinputchange(e, index)}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="control">
                            <input
                              className="mr-1"
                              type="radio"
                              name={"status " + index}
                              value="h"
                              onChange={(e) => handlestatuschange(e, index)}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="control">
                            <input
                              className="mr-1"
                              type="radio"
                              name={"status " + index}
                              value="i"
                              onChange={(e) => handlestatuschange(e, index)}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="control">
                            <input
                              className="mr-1"
                              type="radio"
                              name={"status " + index}
                              value="s"
                              onChange={(e) => handlestatuschange(e, index)}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="control">
                            <input
                              className="mr-1"
                              type="radio"
                              name={"status " + index}
                              value="a"
                              onChange={(e) => handlestatuschange(e, index)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="field">
                <div className="control">
                  <button
                    type="submit" onClick={saveAbsensi}
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
          </div>
        </div>
    </AuthLayouts>
  );
};

export default AddAbsensi;
