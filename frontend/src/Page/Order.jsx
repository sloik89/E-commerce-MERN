import React from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../wrapers/Order";
import { Loader, Message } from "../components";

import { useGetOrderByIdQuery } from "../slices/ordersSlices";
const Order = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    isError,
  } = useGetOrderByIdQuery(orderId);
  console.log(order);

  return (
    <Wrapper className="page-full">
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message>
          <h2>unable to fetch orders</h2>
        </Message>
      ) : (
        <div className="orders">
          <h3 className="orders-id">Order ID: {order._id}</h3>
          <div className="orders-shipping">
            <h3>Shipping</h3>
            <h4>Name: {order.user.name}</h4>
            <h4>Email: {order.user.email}</h4>
            <h4>Adress: {Object.values(order.shippingAddress).join(", ")}</h4>
            <Message variants="danger-message">
              <p>{order.isDelivered ? "Delivered" : "Not delivered"}</p>
            </Message>
          </div>
          <div className="orders-payment">
            <h3>Payment Method: {order.paymentMethod}</h3>
            <h4>Method {order.isPaid}</h4>
            <Message variants="danger-message">
              <p>{order.isPaid ? "Paid" : "Not Paid"}</p>
            </Message>
          </div>
          <div className="orders-items">
            <h3>Order items</h3>
            <div className="orders-container">
              {order.orderItems.map((item, idx) => {
                return (
                  <div className="order-item">
                    <div className="order-heading">
                      <img src={item.image} alt="" />
                      <p>{item.name}</p>
                    </div>
                    <div className="order-summary">
                      <p>
                        {item.qty} x {item.price} = {item.qty * item.price}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Order;
