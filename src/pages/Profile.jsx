import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Profile = () => {
  const navigate = useNavigate();
  //
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    address: [],
  });
  //
  const [loading, setLoading] = useState(false);
  const getUser = async () => {
    const faridclosetuser = JSON.parse(localStorage.getItem("faridclosetuser"));
    if (!faridclosetuser) {
      navigate("/login", { replace: true });
    } else {
      try {
        setLoading(true);
        const res = await fetch("/api/get/faridcloset/user", {
          method: "GET",
          headers: {
            "auth-token": `Bearer ${faridclosetuser}`,
          },
        });
        const data = await res.json();
        console.log(data);
        //
        if (res.status !== 200) {
          navigate("/login", { replace: true });
        } else {
          setLoading(false);
          setUser(data);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="container py-4">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="mb-2">Profile</h2>
          <p>
            Hello, <strong>{user.name}</strong> . Happy shopping.
          </p>
          <p>Email address: {user.email}</p>
          <p>Mobile: {user.mobile}</p>
          <hr />
        </>
      )}
    </div>
  );
};

export default Profile;
