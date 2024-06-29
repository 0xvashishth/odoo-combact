"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const ROOT_URL = "http://localhost:8082/api/v1";
import { useRouter } from "next/navigation";

const Login = () => {
  const { push } = useRouter();
  const [admin, setAdmin] = useState({
    password: "",
    email: "",
  });
  useEffect(() => {
    if (localStorage.getItem("admin") && localStorage.getItem("adminToken")) {
      push("/admin/dashboard");
    }
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setAdmin((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Sending data..");

    try {
      const response = await axios.post(`${ROOT_URL}/admin/login`, { admin });
      console.log(response.data.message); // Assuming the server returns some data
      toast.success(response.data.message, {
        id: toastId,
      });
      localStorage.setItem("admin", JSON.stringify(response.data.admin));
      localStorage.setItem("adminToken", response.data.token);
      // Update the timestamp for the latest signup attempt
      localStorage.setItem("userLoginAttempt", Date.now().toString());
      setAdmin({
        password: "",
        email: "",
      });
      push("/admin/dashboard");
    } catch (error) {
      console.error("Error loggin in:", error);
      toast.error(error.response.data.error, {
        id: toastId,
      });
    }
  };

  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content flex-col">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-center">Admin Login Now 🚀</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={admin.email}
                onChange={handleChange}
                id="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                value={admin.password}
                onChange={handleChange}
                id="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a
                  href="/forgotPassword"
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-outline">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;   