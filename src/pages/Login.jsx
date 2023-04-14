import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
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
  const login = async (e) => {
    e.preventDefault();
    //
    const { email, password } = input;
    if (!email || !password) {
      setError(true);
      setMessage("Enter complete details");
    } else if (password.length < 8) {
      setError(true);
      setMessage("Password should be  atleast 8 characters long");
    } else {
      try {
        const res = await fetch("/api/login/faridcloset/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
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
            email: "",
            password: "",
          });
          localStorage.setItem("faridclosetuser", JSON.stringify(data.token));
          setTimeout(() => {
            navigate("/profile", { replace: true });
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
            <label>password</label>
            <input
              type="password"
              className="input"
              name="password"
              value={input.password}
              onChange={handleInput}
            />
          </div>
          <div className="text-end">
            <p className={`mb-2 ${error ? "text-danger" : "text-success"}`}>
              {message}
            </p>
            <button className="button" onClick={login}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
