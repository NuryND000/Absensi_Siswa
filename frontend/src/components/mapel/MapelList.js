import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
import { BsGearFill, BsTrashFill } from "react-icons/bs";
import useAuth from "../authService.js";
import AuthLayouts from "../layouts/AuthLayouts.jsx";

const MapelList = () => {
  const [mapels, setMapel] = useState([]);
  const {token, axiosJWT} = useAuth();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
};

const handleSubmit = async () => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        await axiosJWT.post('http://localhost:5000/importMapel', formData,{
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
        alert('Data uploaded successfully');
    } catch (error) {
        console.error(error);
        alert('Failed to upload data');
    }
};

  useEffect(() => {
    getMapels()
  }, []);

  const getMapels = async () => {
    try {
      const response = await axiosJWT.get("http://localhost:5000/mapels",{
      headers: {
          Authorization: `Bearer ${token}`
      }
  });
  setMapel(response.data);
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
          onClick: () => deleteMapel(id),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const deleteMapel = async (id) => {
    try {
      await axiosJWT.delete(`http://localhost:5000/mapels/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      getMapels();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayouts name={"Mapel"}>
      <div className="columns mt-5 is-mobile is-centered">
        <div className="column is-four-fifths">
        <div className=" box">
            <div className="columns">
              <div className="column">
          <Link
            to="/mapel/add"
            className="button is-success"
          >
            Tambah Mapel
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
                <th>NAMA</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {mapels.map((mapel, index) => (
                <tr key={mapel._id}>
                  <td>{index + 1}</td>
                  <td>{mapel.name}</td>
                  <td>
                    <Link
                      to={`edit/${mapel._id}`}
                      className="button is-info is-small mr-3"
                    >
                      <BsGearFill />
                    </Link>
                    <button
                      onClick={() => submit(mapel._id)}
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

export default MapelList;
