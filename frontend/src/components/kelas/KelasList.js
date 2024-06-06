import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { BsGearFill, BsTrashFill } from "react-icons/bs";
import useAuth from "../authService.js";
import AuthLayouts from "../layouts/AuthLayouts.jsx";

const KelasList = () => {
  const [kelass, setKelas] = useState([]);
  const { token, axiosJWT} = useAuth();
  const [file, setFile] = useState(null);

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission for file upload
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      await axiosJWT.post("http://localhost:5000/importKelas", formData, {
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

  // Fetch the list of classes on component mount
  useEffect(() => {
    getKelass();
  }, []);

  // Fetch classes from the server
  const getKelass = async () => {
    try {
      const response = await axiosJWT.get("http://localhost:5000/kelass", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setKelas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Show confirmation dialog before deleting a class
  const submit = async (id) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteKelas(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  // Delete a class by ID
  const deleteKelas = async (id) => {
    try {
      await axiosJWT.delete(`http://localhost:5000/kelass/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getKelass();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthLayouts name={"Kelas"}>
      <div className="columns mt-5 is-mobile is-centered">
        <div className="column is-four-fifths">
        <div className=" box">
            <div className="columns">
              <div className="column">
          <Link
            to="/kelas/add"
            className="button is-success"
          >
            Tambah Kelas
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
                <th>NAMA KELAS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {kelass.map((kelas, index) => (
                <tr key={kelas._id}>
                  <td>{index + 1}</td>
                  <td>{kelas.name}</td>
                  <td>
                    <Link to={`edit/${kelas._id}`} className="button is-info is-small mr-3">
                      <BsGearFill />
                    </Link>
                    <button
                      onClick={() => submit(kelas._id)}
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

export default KelasList;
