import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditKelas = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getKelasById();
  }, []);

  const getKelasById = async () => {
    const response = await axios.get(`http://localhost:5000/kelass/${id}`);
    setName(response.data.name);
  };
  const updateKelas = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/kelass/${id}`, {
        name,
      });
      navigate("/kelas");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section class="hero is-small">
      <div class="hero-body has-text-centered">
        <p class="title">Edit Data Kelas</p>
      </div>
      <div className="columns is-mobile is-centered">
        <div className="column is-half">
          <form onSubmit={updateKelas}>
            <div class="field is-horizontal">
              <div class="field-body">
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
              <div className="control">
                <button
                  type="submit"
                  className="button is-success mr-5"
                >
                  Update
                </button>
                <a
                  href="/kelas"
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

export default EditKelas;
