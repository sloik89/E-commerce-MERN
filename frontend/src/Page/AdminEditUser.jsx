import React, { useState, useEffect } from "react";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../slices/userApiSlice";
import Wrapper from "../wrapers/EditPageProduct";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader, Message } from "../components";
const AdminEditUser = () => {
  const navigate = useNavigate();
  const { id: userId } = useParams();
  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUser, isError: errorUser }] =
    useUpdateUserMutation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsadmin] = useState(false);

  // update user
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(userId);
      const data = await updateUser({ name, email, userId, isAdmin });
      toast.success("User updated");
      refetch();
      navigate("/admin/users");
      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error(err?.message || "unable to update user");
    }
  };
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsadmin(user.isAdmin);
    }
  }, [user]);
  return (
    <Wrapper className="page-full">
      <h1>Edit Users</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message></Message>
      ) : (
        <form onSubmit={submitHandler} className="users-admin form-create">
          <div className="form-row">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="form-row">
            <label htmlFor="name">Email</label>
            <input
              type="email"
              name="name"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="form-row checbox-row">
            <label htmlFor="isAdmin">isAdmin</label>
            <input
              className="checkbox"
              type="checkbox"
              name="isAdmin"
              onChange={(e) => setIsadmin(e.target.checked)}
              checked={isAdmin}
            />
          </div>
          <button type="submit" className="btn">
            Update
          </button>
        </form>
      )}
    </Wrapper>
  );
};

export default AdminEditUser;
