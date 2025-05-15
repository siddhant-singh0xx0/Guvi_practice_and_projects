import React from "react";
import "./App.css";
import Inventory from "./components/Inventory";
import Navbar from "./components/Navbar";
import Counter from "./components/Counter";
import UpdateCounterSeperate from "./components/UpdateCounterSeperate";
function App() {
  // const courses = [
  //   {
  //     id: 1,
  //     title: "AI",
  //     price: 50,
  //   },
  //   {
  //     id: 2,
  //     title: "HTML",
  //     price: 205,
  //   },
  //   {
  //     id: 3,
  //     title: "CSS",
  //     price: 500,
  //   },
  //   {
  //     id: 4,
  //     title: "Javascript",
  //     price: 700,
  //   },
  // ];

  // const getListItem = courses.map((courses) => (
  //   <li key={courses.id}>
  //     {courses.title} | {courses.price}
  //   </li>
  // ));
  // const purchase = () => console.log("Course is purchased");
  return (
    <>
      <Navbar />
      {/* <div className="container">
        <h2>Courses (Mapping)</h2>
        <ul>{getListItem}</ul>
        <button onClick={purchase}>Access Now</button>
        <hr />
        <Inventory
          size={150}
          person={{
            name: "rohan",
            role: "paneer",
            age: 5,
          }}
        />
        <hr />
        <Counter />
        <hr />
        <UpdateCounterSeperate />
      </div> */}
    </>
  );
}

export default App;
