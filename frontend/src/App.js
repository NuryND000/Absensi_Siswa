import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./components/user/UserList.js";
import AddUser from "./components/user/AddUser.js";
import EditUser from "./components/user/EditUser.js";

import KelasList from "./components/kelas/KelasList.js";
import AddKelas from "./components/kelas/AddKelas.js";
import EditKelas from "./components/kelas/EditKelas.js";

import MapelList from "./components/mapel/MapelList.js";
import AddMapel from "./components/mapel/AddMapel.js";
import EditMapel from "./components/mapel/EditMapel.js";

import SiswaList from "./components/siswa/SiswaList.js";
import EditSiswa from "./components/siswa/EditSiswa.js";
import AddSiswa from "./components/siswa/AddSiswa.js";

import AbsensiList from "./components/absensi/AbsensiList.js";
import AddAbsensi from "./components/absensi/AddAbsensi.js";
import EditAbsensi from "./components/absensi/EditAbsensi.js";

import TentangTampil from "./components/tentang/TentangTampil.jsx";
import TentangEdit from "./components/tentang/TentangEdit.jsx";

import AbsensiShowOnly from "./components/absensi/AbsensiShowOnly.js";
import DetailAbsensiList from "./components/detailabsensi/DetailAbsensiList.js";
import Login from "./components/login/Login.jsx";

import PrivateRoute from "./components/PrivateRoute.jsx"; // Import PrivateRoute component
import Laporan from "./components/laporan/laporan.jsx";

function App() {
  return (
    <BrowserRouter className="has-background-grey">
      <Routes>
        {/* Routes for teachers or admins */}
        <Route path="/absensi" element={<PrivateRoute roles={["guru", "admin"]} element={AbsensiList} />} />
        <Route path="/absensi/add" element={<PrivateRoute roles={["guru", "admin"]} element={AddAbsensi} />} />
        <Route path="/absensi/edit/:id" element={<PrivateRoute roles={["guru", "admin"]} element={EditAbsensi} />} />

        {/* Admin-specific routes */}
        <Route path="/user" element={<PrivateRoute roles={["admin"]} element={UserList} />} />
        <Route path="/user/add" element={<PrivateRoute roles={["admin"]} element={AddUser} />} />
        <Route path="/user/edit/:id" element={<PrivateRoute roles={["admin"]} element={EditUser} />} />

        <Route path="/kelas" element={<PrivateRoute roles={["admin"]} element={KelasList} />} />
        <Route path="/kelas/add" element={<PrivateRoute roles={["admin"]} element={AddKelas} />} />
        <Route path="/kelas/edit/:id" element={<PrivateRoute roles={["admin"]} element={EditKelas} />} />

        <Route path="/mapel" element={<PrivateRoute roles={["admin"]} element={MapelList} />} />
        <Route path="/mapel/add" element={<PrivateRoute roles={["admin"]} element={AddMapel} />} />
        <Route path="/mapel/edit/:id" element={<PrivateRoute roles={["admin"]} element={EditMapel} />} />

        <Route path="/siswa" element={<PrivateRoute roles={["admin"]} element={SiswaList} />} />
        <Route path="/siswa/add" element={<PrivateRoute roles={["admin"]} element={AddSiswa} />} />
        <Route path="/siswa/edit/:id" element={<PrivateRoute roles={["admin"]} element={EditSiswa} />} />

        <Route path="/tentang/edit" element={<PrivateRoute roles={["admin"]} element={TentangEdit} />} />

        <Route path="/laporan" element={<PrivateRoute roles={["admin"]} element={Laporan} />} />

        {/* Routes accessible without login */}
        <Route path="/" element={<DetailAbsensiList />} />
        <Route path="/tentang" element={<TentangTampil/>} />
        <Route path="/absensiShow/:id" element={<AbsensiShowOnly />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
