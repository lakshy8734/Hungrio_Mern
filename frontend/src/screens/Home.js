import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import './Home.css';
export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const loadFoodItems = async () => {
    let response = await fetch("https://backend-bkc0.onrender.com/api/foodData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    console.log(response[1][0].CategoryName);
    setFoodItems(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadFoodItems();

    // Auto change carousel image every 3 seconds
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % foodItems.length);
    }, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [foodItems.length]);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade "
          data-bs-ride="carousel"
        >
          <div
            className="carousel-inner "
            id="carousel"
            style={{ maxHeight: "600px" }}
          >
            {foodItems.map((item, index) => (
              <div
                key={index}
                className={`carousel-item ${
                  index === activeIndex ? "active" : ""
                }`}
              >
                <img
                  src={item.img}
                  className="d-block w-100"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "600px",
                    objectFit: "cover",
                  }}
                  alt={item.name}
                />
              </div>
            ))}
          </div>
          <div className="carousel-caption " style={{ zIndex: "9" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2 h-150 w-75 bg-white text-dark"
                type="search"
                placeholder="Search here..."
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn text-white bg-danger"
                onClick={() => setSearch("")}
              >
                X
              </button>
            </div>
          </div>
          {/* <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
          </button>
            
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            
          </button> */}
        </div>
      </div>
      <div className="container">
        {foodCat.length > 0
          ? foodCat.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data.id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr
                    id="hr-success"
                    style={{
                      height: "4px",
                      backgroundImage:
                        "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))",
                    }}
                  />
                  {foodItems.length > 0 ? (
                    foodItems
                      .filter(
                        (items) =>
                          items.CategoryName === data.CategoryName &&
                          items.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                      )
                      .map((filterItems) => {
                        return (
                          <div
                            key={filterItems.id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <Card
                              foodName={filterItems.name}
                              item={filterItems}
                              options={filterItems.options[0]}
                              ImgSrc={filterItems.img}
                            ></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div> No Such Data </div>
                  )}
                </div>
              );
            })
          : ""}
      </div>
      <Footer />
    </div>
  );
}
