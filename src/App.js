import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setItems,
  setIsLoadingFalse,
  setBasketItems,
} from "./components/redux/slices/mainSlice";

import Header from "./components/Header/Header";
import Card from "./components/Card/Card";
import SearchBlock from "./components/SearchBlock/SearchBlock";
import Drawer from "./components/Drawer/Drawer";
import Contacts from "./pages/Contacts";
import About from "./pages/About";
import Footer from "./components/Footer/Footer";

// const arr = [
//   {"title": "Baseball best goods", "price": 999, "imageURL": "img/baseball.png"},
//   {"title": "Football nice goods", "price": 1099, "imageURL": "img/football_1.jpg"},
//   {"title": "Basketball nice goods", "price": 699, "imageURL": "img/basketball.png"},
//   {"title": "Tennis nice goods", "price": 199, "imageURL": "img/tennis.jpg"},
//   {"title": "Bowling nice goods", "price": 10999, "imageURL": "img/bowling.png"},
//   {"title": "Football other nice goods", "price": 99, "imageURL": "img/football_2.jpg"},
//   {"title": "Some also useful goods", "price": 499, "imageURL": "img/bubble.jpg"},
//   {"title": "Other football best goods", "price": 79, "imageURL": "img/football_3.jpg"},
//   {"title": "Golf goods", "price": 5099, "imageURL": "img/golf.jpg"},
//   {"title": "Other basketball nice goods", "price": 2599, "imageURL": "img/man.jpg"},
//   {"title": "Ones again football goods", "price": 384, "imageURL": "img/football_4.jpg"},
//   {"title": "Is moon priceless?", "price": 9999, "imageURL": "img/moon.jpg"}
// ]

function App() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.main.items);
  const basketOpened = useSelector((state) => state.main.basketOpened);
  const searchValue = useSelector((state) => state.main.searchValue);
  const isLoading = useSelector((state) => state.main.isLoading);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const itemsResponse = await axios.get(
          "https://6319e5bb8e51a64d2befd040.mockapi.io/items"
        );
        const basketResponse = await axios.get(
          "https://6319e5bb8e51a64d2befd040.mockapi.io/basket"
        );
        dispatch(setItems(itemsResponse.data));
        dispatch(setBasketItems(basketResponse.data));
        dispatch(setIsLoadingFalse());
      } catch (err) {
        alert("Unable to get items list from server");
        console.log("Unable to get items list from server");
        console.log(err);
      }
    }

    fetchData();
  }, []);

  const loadArr = [...Array(8)];

  return (
    <div className="wrapper">
      <Header />
      {basketOpened && <Drawer />}
      <Routes>
        <Route index element={<SearchBlock />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contacts />} />
      </Routes>

      <div className="card_container">
        <Routes>
          <Route
            index
            element={
              isLoading
                ? loadArr.map((el, ind) => <Card key={ind} />)
                : items
                    .filter(
                      (item) =>
                        item &&
                        item.title
                          .toUpperCase()
                          .includes(searchValue.toUpperCase())
                    )
                    .map((item) => (
                      <Card
                        id={item.id}
                        key={item.id}
                        title={item.title}
                        price={item.price}
                        imageURL={item.imageURL}
                      />
                    ))
            }
          />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
