import "./Drawer.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleBasketOpened, setBasketItems } from "../redux/slices/mainSlice";
import axios from "axios";

const Drawer = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.main.basketItems);
  const basketSum = items.reduce((acc, current) => acc + current.price, 0);

  const onCardClose = () => dispatch(toggleBasketOpened());

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://6319e5bb8e51a64d2befd040.mockapi.io/basket/${id}`);
      dispatch(setBasketItems(items.filter((item) => item.id !== id)));
    } catch (err) {
      alert("Unable to delete item from basket");
      console.log("Unable to delete item from basket");
      console.log(err);
    }
  };

  return (
    <div className="drawer_overlay" onClick={onCardClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <h2>
          Basket
          <svg
            onClick={onCardClose}
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="30.000000pt"
            height="30.000000pt"
            viewBox="0 0 1280.000000 1280.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <metadata>
              Created by potrace 1.15, written by Peter Selinger 2001-2017
            </metadata>
            <g
              transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
              stroke="none"
            >
              <path
                d="M6180 11089 c-921 -38 -1841 -368 -2584 -926 -356 -267 -701 -614
-961 -963 -907 -1222 -1165 -2801 -694 -4250 127 -389 329 -804 561 -1149 987
-1473 2722 -2269 4468 -2050 966 121 1831 515 2559 1165 1571 1403 2010 3690
1070 5574 -418 836 -1056 1515 -1869 1985 -608 352 -1377 582 -2040 610 -283
12 -330 12 -510 4z m555 -719 c1327 -114 2497 -871 3146 -2035 484 -870 622
-1920 378 -2895 -175 -702 -530 -1330 -1039 -1840 -329 -330 -687 -585 -1095
-781 -545 -261 -1114 -389 -1725 -389 -641 0 -1227 139 -1795 425 -760 383
-1377 1001 -1760 1763 -588 1171 -560 2582 74 3717 648 1160 1815 1918 3131
2034 139 12 546 12 685 1z"
              />
              <path
                d="M4609 8719 c-26 -4 -57 -13 -70 -19 -40 -21 -409 -392 -432 -435 -29
-53 -30 -173 -3 -225 10 -19 378 -395 817 -835 l799 -800 -796 -795 c-462
-462 -804 -812 -817 -835 -33 -62 -31 -175 5 -235 39 -66 394 -414 442 -434
49 -20 152 -21 202 0 29 11 255 231 842 817 l802 802 803 -802 c586 -586 812
-806 841 -817 50 -21 153 -20 202 0 48 20 403 368 442 434 36 60 38 173 5 235
-13 23 -355 373 -817 835 l-796 795 799 800 c439 440 807 816 817 835 27 52
26 172 -3 225 -32 59 -399 420 -448 441 -51 21 -148 21 -200 -1 -30 -12 -249
-225 -842 -818 l-803 -802 -802 802 c-464 464 -816 807 -833 814 -47 19 -106
25 -156 18z"
              />
            </g>
          </svg>
        </h2>
        {items.length > 0 ? (
          <div className="fragment">
            <div className="basket_items">
              {items.map((obj) => (
                <div className="basket_item" key={obj.id}>
                  <img
                    width={50}
                    height={50}
                    src={obj.imageURL}
                    alt="Goods"
                  ></img>
                  <div className="basket_item_text">
                    <p>{obj.title}</p>
                    <b>{obj.price + " USD"}</b>
                  </div>
                  <div
                    className="basket_item_remove"
                    onClick={() => onRemoveItem(obj.id)}
                  >
                    <svg
                      version="1.0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30.000000pt"
                      height="30.000000pt"
                      viewBox="0 0 1280.000000 1280.000000"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <metadata>
                        Created by potrace 1.15, written by Peter Selinger
                        2001-2017
                      </metadata>
                      <g
                        transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                        stroke="none"
                      >
                        <path
                          d="M6180 11089 c-921 -38 -1841 -368 -2584 -926 -356 -267 -701 -614
-961 -963 -907 -1222 -1165 -2801 -694 -4250 127 -389 329 -804 561 -1149 987
-1473 2722 -2269 4468 -2050 966 121 1831 515 2559 1165 1571 1403 2010 3690
1070 5574 -418 836 -1056 1515 -1869 1985 -608 352 -1377 582 -2040 610 -283
12 -330 12 -510 4z m555 -719 c1327 -114 2497 -871 3146 -2035 484 -870 622
-1920 378 -2895 -175 -702 -530 -1330 -1039 -1840 -329 -330 -687 -585 -1095
-781 -545 -261 -1114 -389 -1725 -389 -641 0 -1227 139 -1795 425 -760 383
-1377 1001 -1760 1763 -588 1171 -560 2582 74 3717 648 1160 1815 1918 3131
2034 139 12 546 12 685 1z"
                        />
                        <path
                          d="M4609 8719 c-26 -4 -57 -13 -70 -19 -40 -21 -409 -392 -432 -435 -29
-53 -30 -173 -3 -225 10 -19 378 -395 817 -835 l799 -800 -796 -795 c-462
-462 -804 -812 -817 -835 -33 -62 -31 -175 5 -235 39 -66 394 -414 442 -434
49 -20 152 -21 202 0 29 11 255 231 842 817 l802 802 803 -802 c586 -586 812
-806 841 -817 50 -21 153 -20 202 0 48 20 403 368 442 434 36 60 38 173 5 235
-13 23 -355 373 -817 835 l-796 795 799 800 c439 440 807 816 817 835 27 52
26 172 -3 225 -32 59 -399 420 -448 441 -51 21 -148 21 -200 -1 -30 -12 -249
-225 -842 -818 l-803 -802 -802 802 c-464 464 -816 807 -833 814 -47 19 -106
25 -156 18z"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
            <div className="basket_total_block">
              <ul>
                <li>
                  <span>Total:</span>
                  <div></div>
                  <b>{basketSum} USD</b>
                </li>
                <li>
                  <span>VAT 20%:</span>
                  <div></div>
                  <b>{Math.round(basketSum / 6)} USD</b>
                </li>
              </ul>
              <button>Order</button>
            </div>
          </div>
        ) : (
          <div className="empty">
            <p>Nothing Added Yet</p>
            <img width="100%" src="/img/empty_basket.jpg" alt="empty"></img>
            <p>Please add at least 1 item to make order!</p>
            <button onClick={onCardClose}>Return</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Drawer;
