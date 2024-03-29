import React from "react";

const Message = ({ variants = "default-message", children }) => {
  return <div className={` ${variants}`}>{children}</div>;
};

export default Message;
