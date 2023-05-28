import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  
} from "mdb-react-ui-kit";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [submited, setSubmitted] = useState(false);
  const [rePass, setRePass] = useState("");
  const handler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const submit = () => {
    setSubmitted(true);
    if (user.username && user.email && user.password && rePass) {
      if (user.password !== rePass) {
        setUser({ ...user, password: "" });
        setRePass("");
        toast.warn("Both password should be same", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setSubmitted(false);
      } else {
        try {
          axios
            .post("https://localhost:7163/api/Users/signup", user)
            .then((res) => {
              // window.localStorage.setItem("token", res.data);
              toast.success("Signup Successful!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });

              navigate(`/signin`);
            });
        } catch (err) {
          toast.error(err.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    }
    else{
      toast.warning('Please fill all the fields', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setSubmitted(false);
    }
  };

  return (
    <MDBContainer fluid className="p-5">
      <ToastContainer />
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className="order-2 order-lg-1 d-flex flex-column align-items-center"
            >
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Sign up
              </p>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size="lg" />
                <MDBInput
                  label="UserName"
                  value={user.username}
                  name="username"
                  onChange={handler}
                  id="form1"
                  type="text"
                  className="w-100"
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size="lg" />
                <MDBInput
                  label="Your Email"
                  value={user.email}
                  name="email"
                  onChange={handler}
                  id="form2"
                  type="email"
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size="lg" />
                <MDBInput
                  label="Password"
                  value={user.passoword}
                  name="password"
                  onChange={handler}
                  id="form3"
                  type="password"
                />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size="lg" />
                <MDBInput
                  label="Repeat your password"
                  value={rePass}
                  onChange={(e) => setRePass(e.target.value)}
                  id="form4"
                  type="password"
                />
              </div>

              <MDBBtn
                className="mb-4"
                size="lg"
                onClick={submit}
                disabled={submited}
              >
                Register
              </MDBBtn>
            </MDBCol>

            <MDBCol
              md="10"
              lg="6"
              className="order-1 order-lg-2 d-flex align-items-center"
            >
              <MDBCardImage
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                fluid
              />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Signup;
