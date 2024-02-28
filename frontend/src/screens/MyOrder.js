import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setorderData] = useState({});

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem("userEmail"));
    await fetch("https://backend-bkc0.onrender.com/api/myOrderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
    //   console.log(response);
      await setorderData(response);
      //   await res.map((data)=>{
      //     console.log(data)
      //  })
    });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
  
    // Check if orderData contains the orderData property
    if (orderData.orderData && orderData.orderData.order_data) {
      // Iterate over each set of orders
      orderData.orderData.order_data.forEach((order) => {
        // Check if order is an array
        if (Array.isArray(order)) {
          // Iterate over each item in the order
          order.forEach((item) => {
            // Check if item has a price property
            if (item.price) {
              totalPrice += item.price;
            }
          });
        }
      });
    }
  
    return totalPrice;
  };
  
  
  
  
  

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="container">
        <div className="row">
          {Object.keys(orderData).length !== 0
            ? Array(orderData).map((data) => {
                return data.orderData
                  ? data.orderData.order_data
                      .slice(0)
                      .reverse()
                      .map((item) => {
                        return item.map((arrayData) => {
                          return (
                            <div>
                              {arrayData.Order_date ? (
                                <div className="m-auto mt-5">
                                  {(data = arrayData.Order_date)}
                                  <hr />
                                </div>
                              ) : (
                                <div className="col-12 col-md-6 col-lg-3">
                                  <div
                                    className="card mt-3"
                                    style={{
                                      width: "16rem",
                                      maxHeight: "360px",
                                    }}
                                  >
                                    {/* <img
                                      src={arrayData.img}
                                      className="card-img-top"
                                      alt="..."
                                      style={{
                                        height: "120px",
                                        objectFit: "fill",
                                      }}
                                    /> */}
                                    <div className="card-body">
                                      <h5 className="card-title">
                                        {arrayData.name}
                                      </h5>
                                      <div
                                        className="container w-100 p-0"
                                        style={{ height: "38px" }}
                                      >
                                        <span className="m-1">
                                          {arrayData.qty}
                                        </span>
                                        <span className="m-1">
                                          {arrayData.size}
                                        </span>
                                        <span className="m-1">{data}</span>
                                        <div className=" d-inline ms-2 h-100 w-20 fs-5">
                                          ₹{arrayData.price}/-
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        });
                      })
                      
                  : "";
              })
            : ""}
        </div>
        <div className="col-12">
                <h5>Total Price: ₹{calculateTotalPrice()}/-</h5>
              </div>
      </div>

      <Footer />
    </div>
  );
}
// {"orderData":{"_id":"63024fd2be92d0469bd9e31a","email":"mohanDas@gmail.com","order_data":[[[{"id":"62ff20fbaed6a15f800125e9","name":"Chicken Fried Rice","qty":"4","size":"half","price":520},{"id":"62ff20fbaed6a15f800125ea","name":"Veg Fried Rice","qty":"4","size":"half","price":440}],"2022-08-21T15:31:30.239Z"],[[{"id":"62ff20fbaed6a15f800125f4","name":"Mix Veg Pizza","qty":"4","size":"medium","price":800},{"id":"62ff20fbaed6a15f800125f3","name":"Chicken Doub;e Cheeze Pizza","qty":"4","size":"regular","price":480}],"2022-08-21T15:32:38.861Z"]],"__v":0}}
