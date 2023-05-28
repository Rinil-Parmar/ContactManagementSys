import React, { useState, useEffect, Fragment, useRef } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Sidebar } from "./Sidebar";

import { useReactToPrint } from "react-to-print";

const Contacts = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [fullscreen, setFullscreen] = useState(true);

  const componentPDF = useRef();
  //for new user
  // const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("");
  // const [price, setPrice] = useState("");
  // const [copies, setCopies] = useState("");
  // //for edit user
  // const [editId, setEditId] = useState("");
  // const [editTitle, setEditTitle] = useState("");
  // const [editAuthor, setEditAuthor] = useState("");
  // const [editPrice, setEditPrice] = useState("");
  // const [editCopies, setEditCopies] = useState("");

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
  const handleEdit = (id) => {
    console.log(id);
    handleShow();
    axios
      .get(`https://localhost:7163/api/contacts/${id}`)
      .then((result) => {
        setContact(result.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure to remove this Contact?") == true) {
      axios
        .delete(`https://localhost:7163/api/Contacts/${id}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success("Contact has been removed");
            getData();
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
      getData();
    }
  };
  const handleUpdate = () => {
    const url = `https://localhost:7163/api/contacts/${contact.id}`;
    axios
      .put(url, contact)
      .then((result) => {
        handleClose();
        getData();
        clear();
        toast.success("Contact has been updated");
      })
      .catch((error) => {
        toast.error("Error in updating the Contact");
      });
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Contact Numbers",
    onAfterPrint: () => toast.success("Printed Successfully"),
  });
  // const handleSave = () => {
  //   const url = "https://localhost:7163/api/contacts";
  //   axios
  //     .post(url, contact)
  //     .then((result) => {
  //       getData();
  //       clear();
  //       toast.success("Contact has been added with the copies");
  //     })
  //     .catch((error) => {
  //       toast.error("Error in adding the Contact");
  //     });
  // };
  const clear = () => {
    setContact({
      id: 0,
      name: "",
      email: "",
      phone: 0,
      dob: "",
    });
  };
  const colors = [
    "bg-red-200",
    "bg-green-200",
    "bg-yellow-500",
    "bg-cyan-900",
    "bg-blue-400",
    "bg-zinc-400",
    "bg-red-700",
    "bg-orange-50",
    "bg-orange-200",
    "bg-orange-600",
  ];

  return (
    // <div className="grid grid-cols-7 gap-4">

    //   <div className="col-end-7 col-span-5">

    <Fragment>
      <h1 className="text-4xl px-10 py-3 font-bold">Contacts</h1>
      <ToastContainer />
      {/* <Container>
        <Row>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={contact.name}
              name="name"
              onChange={(e) => handler(e)}
            />
          </Col>
          <Col>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={contact.email}
              name="email"
              onChange={(e) => handler(e)}
            />
          </Col>
          <Col>
            <input
              type="date"
              className="form-control"
              placeholder="Enter DOB"
              value={contact.dob}
              name="dob"
              onChange={(e) => handler(e)}
            />
          </Col>
          <Col>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Phone Number"
              value={contact.phone}
              name="phone"
              onChange={(e) => handler(e)}
            />
          </Col>
          <Col>
            <button className="btn btn-primary" onClick={() => handleSave()}>
              Submit
            </button>
          </Col>
        </Row>
      </Container> */}
      <br></br>
      <div ref={componentPDF} style={{ width: "100%" }}>
        <Table striped bordered hover>
          <thead>
            <tr style={{ border: "1px solid gray" }}>
              <th></th>
              <th className="mx-30">Sr. No.</th>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th className="mx-30">Phone</th>
              <th className="mx-30">Date Of Birth</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0
              ? data.map((item, index) => {
                  return (
                    <tr key={index} style={{ border: "1px solid gray" }}>
                      {/* <div className={` ${colors[Math.floor(Math.random()*colors.length)]} `}> */}
                      <td>
                        <div
                          className={`rounded-full ${
                            colors[Math.floor(Math.random() * colors.length)]
                          } px-3 py-3 mx-3`}
                        >
                          {item.name[0]}
                        </div>
                      </td>
                      <td className="mx-3">
                        <div className="mx-2">{index + 1}</div>
                      </td>
                      <td className="mx-3">
                        <div className="mx-2">{item.id}</div>
                      </td>
                      <td className="mx-3">
                        <div className="mx-2">{item.name}</div>
                      </td>
                      <td className="mx-3">
                        <div className="mx-2">{item.email}</div>
                      </td>
                      <td className="mx-5">
                        <div className="mx-2">{item.phone}</div>
                      </td>
                      <td className="mx-5">
                        <div className="mx-2">{item.dob}</div>
                      </td>
                      <td colSpan={2}>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEdit(item.id)}
                        >
                          Edit
                        </button>{" "}
                        &nbsp;
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          Remove
                        </button>
                      </td>
                      {/* </div> */}
                    </tr>
                  );
                })
              : "Loading..."}
          </tbody>
        </Table>
      </div>
      
        <div className="d-grid d-md-flex justify-content-md-end mb-3">
          <button className="btn btn-primary " onClick={generatePDF}>
            Print
          </button>
        </div>
        
      
      <Modal show={show} fullscreen={fullscreen} onHide={handleClose}>
        <div className="h-100 w-100">
          <Modal.Header closeButton>
            <Modal.Title>Edit Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <Row> */}
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                value={contact.name}
                name="name"
                onChange={(e) => handler(e)}
              />
            </Col>
            <br />
            <Col>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                value={contact.email}
                name="email"
                onChange={(e) => handler(e)}
              />
            </Col>
            <br />
            <Col>
              <input
                type="date"
                className="form-control"
                placeholder="Enter DOB"
                value={contact.dob}
                name="dob"
                onChange={(e) => handler(e)}
              />
            </Col>
            <br />
            <Col>
              <input
                type="number"
                className="form-control"
                placeholder="Enter Phone Number"
                value={contact.phone}
                name="phone"
                onChange={(e) => handler(e)}
              />
            </Col>
            {/* <Col>
              <button className="btn btn-primary" onClick={() => handleSave()}>
                Submit
              </button>
            </Col> */}

            {/* </Row> */}
          </Modal.Body>
        </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
    // </div>
    // </div>
  );
};

export default Contacts;
