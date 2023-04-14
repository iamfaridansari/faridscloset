import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmpassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };
  //
  const signup = async (e) => {
    e.preventDefault();
    //
    const { name, email, mobile, password, confirmpassword } = input;
    if (!name || !email || !mobile || !password) {
      setError(true);
      setMessage("Enter complete details");
    } else if (mobile.length !== 10) {
      setError(true);
      setMessage("Enter a valid 10 digit mobile number");
    } else if (password.length < 8 || password.length > 15) {
      setError(true);
      setMessage(
        "Password should be less than 15 and atleast 8 characters long"
      );
    } else if (password !== confirmpassword) {
      setError(true);
      setMessage("Password does not match");
    } else {
      try {
        const res = await fetch("/api/signup/faridcloset/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            mobile,
            password,
          }),
        });
        const data = await res.json();
        console.log(data);
        //
        if (res.status !== 200) {
          setError(true);
          setMessage(data.message);
        } else {
          setError(false);
          setMessage(data.message);
          setInput({
            name: "",
            email: "",
            mobile: "",
            password: "",
            confirmpassword: "",
          });
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="container py-4">
      <div className="row align-items-center justify-content-center">
        <form className="col-md-6">
          <div className="d-flex align-items-stretch justify-content-between flex-column mb-4">
            <label>Full name</label>
            <input
              type="text"
              className="input"
              name="name"
              value={input.name}
              onChange={handleInput}
            />
          </div>
          <div className="d-flex align-items-stretch justify-content-between flex-column mb-4">
            <label>Email address</label>
            <input
              type="text"
              className="input"
              name="email"
              value={input.email}
              onChange={handleInput}
            />
          </div>
          <div className="d-flex align-items-stretch justify-content-between flex-column mb-4">
            <label>Mobile number</label>
            <input
              type="text"
              className="input"
              name="mobile"
              value={input.mobile}
              onChange={handleInput}
            />
          </div>
          <div className="d-flex align-items-stretch justify-content-between flex-column mb-4">
            <label>password</label>
            <input
              type="password"
              className="input"
              name="password"
              value={input.password}
              onChange={handleInput}
            />
          </div>
          <div className="d-flex align-items-stretch justify-content-between flex-column mb-4">
            <label>Confirm password</label>
            <input
              type="password"
              className="input"
              name="confirmpassword"
              value={input.confirmpassword}
              onChange={handleInput}
            />
          </div>
          <div className="text-end">
            <p className={`mb-2 ${error ? "text-danger" : "text-success"}`}>
              {message}
            </p>
            <button className="button" onClick={signup}>
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
