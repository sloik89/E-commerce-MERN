import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Loader } from "../components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { FormContainer } from "../components";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentail } from "../slices/authSlices";
import Wrapper from "../wrapers/Login";
const Login = () => {
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const url = new URLSearchParams(search);
  const redirect = url.get("redirect") || "/";
  console.log(redirect);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submit");
    try {
      const res = await login({ email, password: pswd }).unwrap();
      console.log(res);
      dispatch(setCredentail(res));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <Wrapper className="page-full flex-center">
      <FormContainer>
        <h1>Sign in</h1>
        <form onSubmit={submitHandler} className="login-form flex-column">
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
          <button disabled={isLoading} type="submit" className="btn btn-login">
            Sign In
          </button>
          {isLoading && <Loader />}
          <div className="form-row">
            <p>
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </FormContainer>
    </Wrapper>
  );
};

export default Login;
