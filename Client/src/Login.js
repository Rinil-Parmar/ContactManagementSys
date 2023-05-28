import React, { useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,

} from "mdb-react-ui-kit";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const handler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const submit = () => {
    if(user.username && user.password){

    
    try {
      console.log(user);
      axios.post("https://localhost:7163/api/Users/login", user).then((res) => {
        console.log(res);
        // console.log(JSON.parse(window.localStorage.getItem("token")))
        if (res.data) {
          window.localStorage.setItem("token",JSON.stringify(res.data));
          toast.success("Login Successful", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate(`/contacts`);
        }
        else{
          toast.error("Invalid Cradentials!", {
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
  else{
    toast.error('Please fill all the fields', {
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
  // const handleSignUp = (e) => {
  //   e.preventDefault();
  //   const url = "https://localhost:7163/api/Users/login";
  //   const data = {
  //     username: user.username,
  //     email: user.email,
  //     password: user.password,
  //   };
  //   try {
  //     if (username== "" || email == "" || password == "") {
  //       alert(
  //         "None of the given fields can be empty so please enter the value!"
  //       );
  //     } else {
  //       axios
  //         .post(url, data)
  //         .then((result) => {
  //           navigate('/');
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <MDBContainer fluid className="p-5">
      <MDBRow>
        <ToastContainer />
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Phone image"
          />
        </MDBCol>

        <MDBCol col="4" md="6">
          <MDBInput
            label="Username"
            id="formControlLg"
            type="text"
            size="lg"
            name="username"
            onChange={handler}
          />
          <MDBInput
            label="Password"
            id="formControlLg"
            type="password"
            name="password"
            size="lg"
            onChange={handler}
          />

           
          <MDBBtn className="mb-4 w-40" size="lg" onClick={submit} >
            Sign in
          </MDBBtn>
          <br />
          <p>You dont have an account!!
            Then create an account.
          </p>
          <MDBBtn className="mb-4 w-40" size="lg" href="/signup">
            Sign up
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
