import logo from "./logo.svg";
import "./App.css";
import CRUD from "./CRUD";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Users from "./Users";
import Contacts from "./Contacts";
import { Sidebar } from "./Sidebar";
import AddContact from "./AddContact";


function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-regal-cyan ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signin" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/" element={<Sidebar />}>
            <Route path="Users" element={<Users />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="addcontact" element={<AddContact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
