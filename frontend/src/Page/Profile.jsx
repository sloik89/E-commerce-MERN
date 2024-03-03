import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Message, Loader } from "../components";
import { useProfileMutation } from "../slices/userApiSlice";
import { useGetMyOrdersQuery } from "../slices/ordersSlices";
import { setCredentail } from "../slices/authSlices";
import Wrapper from "../wrapers/Profile";
const Profile = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading, isError } = useGetMyOrdersQuery();
  const [profile, { isLoading: loadingProfile, isError: errorLoading }] =
    useProfileMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await profile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentail(res));
        toast.success("Profile updated successfully");
        console.log(res);
      } catch (err) {
        console.log(err);
        toast.error("Some error");
      }
    }
  };
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email]);
  return (
    <Wrapper>
      <div className="profile page-full">
        <div className="profile-left">
          <h3>Profile</h3>
          <form className="form-profile" onSubmit={submitHandler}>
            <div className="form-row">
              <label htmlFor="name">Name</label>
              <input
                className="input"
                value={name}
                type="text"
                name="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-row">
              <label htmlFor="name">Email</label>
              <input
                className="input"
                value={email}
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-row">
              <label htmlFor="password">Password</label>
              <input
                className="input"
                type="password"
                name="email"
                id="email"
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-row">
              <label htmlFor="confirmPassword"> Confirm Password</label>
              <input
                className="input"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn">
              {loadingProfile ? <Loader /> : "Update"}
            </button>
          </form>
        </div>
        <div className="profile-right">right</div>
      </div>
    </Wrapper>
  );
};

export default Profile;
