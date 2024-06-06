import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddKelas = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const saveKelas = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/kelass", {
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
        <p class="title">Tambah Data Kelas</p>
      </div>
      <div className="columns is-mobile is-centered">
        <div className="column is-half">
          <form onSubmit={saveKelas}>
            <div class="field is-horizontal">
              <div class="field-body">
                <div className="field">
                  <label className="label">Nama Kelas</label>
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
                  Save
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

export default AddKelas;
