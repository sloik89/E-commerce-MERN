import React from "react";
import { useGetAllUsersQuery } from "../slices/userApiSlice";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { Loader, Message } from "../components";
const AdminUsers = () => {
  const { data: users, refetch, isError, isLoading } = useGetAllUsersQuery();
  console.log(users);
  const handleDelete = (id) => {
    console.log(id);
  };
  const handleUpdate = (id) => {
    console.log(id);
  };
  return (
    <div className="page-full">
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message></Message>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? <FaCheck /> : <FaTimes />}</td>
                <td>{user.createdAt.substring(0, 10)}</td>
                <td>
                  <button className="btn" onClick={handleUpdate(user._id)}>
                    <FaEdit />
                  </button>
                  <button className="btn" onClick={handleDelete(user._id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;
