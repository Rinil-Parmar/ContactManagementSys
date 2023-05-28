import React, { useState, useEffect, Fragment } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBSelect,
  MDBRadio,
} from "mdb-react-ui-kit";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddContact() {
  // New Contact
  const id = JSON.parse(
    window.localStorage.getItem("token").toString()
  ).userId.toString();

  const [contact, setContact] = useState({
    id: 0,
    name: "",
    email: "",
    phone: 0,
    dob: "",
    userId: id,
  });

  const handler = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`https://localhost:7163/user/${id}`)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        toast.error("Error in fetching the data");
      });
  };

  const handleSave = () => {
    const url = "https://localhost:7163/api/contacts";
    axios
      .post(url, contact)
      .then((result) => {
        getData();
        clear();
        toast.success("Contact has been added.");
      })
      .catch((error) => {
        toast.error("Error in adding the Contact");
      });
  };

  const clear = () => {
    setContact({
      id: 0,
      name: "",
      email: "",
      phone: 0,
      dob: "",
    });
  };

  return (
    <Fragment>
      <MDBContainer fluid>
        <ToastContainer />
        <MDBRow className="justify-content-center align-items-center m-5 w-100 h-100">
          <MDBCard>
            <MDBCardBody className="px-4">
              <MDBRow>
                <MDBCol>
                  <h3 className="fw-bold mb-4 pb-2 pb-md-0 mb-md-5">
                    Create Contact
                  </h3>

                  <MDBCol col="10" md="6">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Google_Contacts_icon_%282022%29.svg/800px-Google_Contacts_icon_%282022%29.svg.png"
                      className="img-fluid"
                      alt="Phone image"
                    />
                  </MDBCol>
                </MDBCol>
                <MDBCol>
                  <br />
                  <MDBCol md="8">
                    <MDBInput
                      wrAddContacterClass="mb-4"
                      label="Name"
                      type="text"
                      className="form-control"
                      placeholder="Enter Name"
                      value={contact.name}
                      name="name"
                      onChange={(e) => handler(e)}
                    />
                  </MDBCol>
                  <br />
                  <MDBCol md="8">
                    <MDBInput
                      wrAddContacterClass="mb-4"
                      label="Email"
                      type="email"
                      className="form-control"
                      placeholder="Enter Email"
                      value={contact.email}
                      name="email"
                      onChange={(e) => handler(e)}
                    />
                  </MDBCol>
                  <br />
                  <MDBCol md="8">
                    <MDBInput
                      wrAddContacterClass="mb-4"
                      label="Birthday"
                      type="date"
                      className="form-control"
                      placeholder="Enter DOB"
                      value={contact.dob}
                      name="dob"
                      onChange={(e) => handler(e)}
                    />
                  </MDBCol>
                  <br />
                  <MDBCol md="8">
                    <MDBInput
                      wrAddContacterClass="mb-4"
                      label="Phone Number"
                      type="number"
                      className="form-control"
                      placeholder="Enter Phone Number"
                      value={contact.phone}
                      name="phone"
                      onChange={(e) => handler(e)}
                    />
                  </MDBCol>
                  <br />
                  <MDBBtn
                    className="mb-4"
                    size="lg"
                    onClick={() => handleSave()}
                  >
                    Submit
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBRow>
      </MDBContainer>
    </Fragment>
  );
}

export default AddContact;
