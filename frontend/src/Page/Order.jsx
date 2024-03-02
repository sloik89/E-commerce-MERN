import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../wrapers/Order";
import { Loader, Message } from "../components";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {
  useGetOrderByIdQuery,
  useGetPayPalCientIdQuery,
  usePayOrderMutation,
} from "../slices/ordersSlices";
const testingAcc = {
  email: "sb-2qbex29692220@personal.example.com",
  pswd: "rEx!l4R{",
};
const Order = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    isError,
  } = useGetOrderByIdQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalCientIdQuery();
  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          console.log(window.paypal);
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment succesful");
        console.log(data);
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  }
  async function onApproveTest(data, actions) {
    const res = await payOrder({ orderId, details: { payer: {} } });
    refetch();
    console.log(res);
    console.log(first);
    toast.success("Payment succesful");
  }
  function onError() {}
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }
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
                  <div key={idx} className="order-item">
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
          <div className="orders-summary">
            <h3>Orders Summary</h3>
            <div className="orders-detail">
              <div className="orders-detail-item">
                <p>Items:</p>
                <p>{order.itemsPrice}</p>
              </div>
              <div className="orders-detail-item">
                <p>Tax:</p>
                <p>{order.taxPrice}</p>
              </div>
              <div className="orders-detail-item">
                <p>Shipping:</p>
                <p>{order.shippingPrice}</p>
              </div>
              <div className="orders-detail-item">
                <p>Total:</p>
                <p>{order.totalPrice}</p>
              </div>
            </div>
          </div>
          <div className="paypal-container">
            {!order.isPaid && (
              <div className="item">
                {loadingPay && <Loader />}
                {isPending ? (
                  <Loader />
                ) : (
                  <div>
                    <button onClick={onApproveTest} className="btn">
                      Test Pay order
                    </button>
                    <div>
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Order;
