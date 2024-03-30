import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
// import { FormContainer } from "../components";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentail } from "../slices/authSlices";
import Wrapper from "../wrapers/Login";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [confirmPswd, setConfirmPswd] = useState("");
  const [userName, setUserName] = useState("");
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const url = new URLSearchParams(search);
  const redirect = url.get("redirect") || "/";
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (pswd !== confirmPswd) {
      toast.error("Password do not match");
      return;
    }
    try {
      const res = await register({
        name: userName,
        email,
        password: pswd,
      }).unwrap();
      console.log(res);
      dispatch(setCredentail(res));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <Wrapper className="page-full flex-center">
      <h1>Register</h1>
      <form onSubmit={submitHandler} className="login-form flex-column">
        <div className="form-row">
          <label htmlFor="email">Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="email">Email Adress</label>
          <input
            name="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            value={pswd}
            onChange={(e) => setPswd(e.target.value)}
          />
        </div>
        <div className="form-row">
          <label htmlFor="password">Confirm Password</label>
          <input
            name="password"
            type="password"
            placeholder="Confirm password"
            value={confirmPswd}
            onChange={(e) => setConfirmPswd(e.target.value)}
          />
        </div>
        <button disabled={isLoading} type="submit" className="btn btn-login">
          Register
        </button>
        {isLoading && <Loader />}
        <div className="form-row">
          <p>
            Already have a account?
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Login
            </Link>
          </p>
        </div>
      </form>
    </Wrapper>
  );
};

export default Register;
