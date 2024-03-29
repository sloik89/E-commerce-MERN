import React from "react";
import { useGetAllOrdersQuery } from "../slices/ordersSlices";
import { Message, Loader } from "../components";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDeliverOrderMutation } from "../slices/ordersSlices";
import Wrapper from "../wrapers/Profile";
const AdminOrders = () => {
  const { data, isLoading, isError } = useGetAllOrdersQuery();

  return (
    <Wrapper className="page-full">
      <h1>Orders</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message></Message>
      ) : (
        <div className="orders">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.updatedAt.substring(0, 10)
                    ) : (
                      <FaTimes />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`} className="btn">
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Wrapper>
  );
};

export default AdminOrders;
