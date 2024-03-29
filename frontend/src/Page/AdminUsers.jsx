import React from "react";
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from "../slices/userApiSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { Loader, Message } from "../components";
const AdminUsers = () => {
  const { data: users, refetch, isError, isLoading } = useGetAllUsersQuery();
  const [deleteUser, { isLoading: deleteLoading, isError: errorDelete }] =
    useDeleteUserMutation();

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await deleteUser(id);
      console.log(res);
      toast.success("item removed");
    } catch (err) {
      console.log(err);
      toast.error("error");
    }
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
                  <Link className="btn" to={`/admin/${user._id}/edit`}>
                    <FaEdit />
                  </Link>
                  <button
                    className="btn"
                    onClick={() => handleDelete(user._id)}
                  >
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
