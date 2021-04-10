import React from "react";
import axios from "axios";

const paymentHandler = async (e) => {
  const API_URL = process.env.APP_URL
  e.preventDefault();
  const orderUrl = `${API_URL}order/1000/rec123`;
  const response = await axios.get(orderUrl);
  console.log("response zp", response);
  const { data } = response;
  const options = {
    key: process.env.RAZOR_PAY_KEY_ID,
    name: "Your App Name",
    description: "Some Description",
    order_id: data.id,
    handler: async (response) => {
      try {
        const paymentId = response.razorpay_payment_id;
        const url = `${API_URL}capture/${paymentId}/1000`;
        const captureResponse = await axios.post(url, {});
        console.log(captureResponse.data);
      } catch (err) {
        console.log(err);
      }
    },
    theme: {
      color: "#686CFD",
    },
  };
  console.log(options)
  const rzp1 = new window.Razorpay(options);
  rzp1.open();
};

const TestPayPage = () => {
  return (
    <div>
      GOOGLE_CLIENT_ID {process.env.GOOGLE_CLIENT_ID}
      <br></br>
      RAZOR_PAY_KEY_ID {process.env.RAZOR_PAY_KEY_ID}
      <br></br>
      RAZOR_PAY_KEY_SECRET {process.env.RAZOR_PAY_KEY_SECRET}
      <br></br>
      APP_URL {process.env.APP_URL}
      <br></br>
      {/* {process.env} */}
      <button onClick={paymentHandler}>Pay Now</button>
    </div>
  );
};



export default TestPayPage;
