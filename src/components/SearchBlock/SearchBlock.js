import React from "react";
import "./SearchBlock.css";
import { useSelector, useDispatch } from "react-redux";
import { setSearchValue } from "../redux/slices/mainSlice";

const SearchBlock = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.main.searchValue);

  const onChangeSearchInput = (e) => dispatch(setSearchValue(e.target.value));

  return (
    <div className="search__block">
      <h1>
        {searchValue ? `Searching "${searchValue}"` : "List of All Goods!"}
      </h1>
      <div className="search__input__block">
        <img
          src="/img/search-icon.png"
          alt="search"
          width={15}
          height={15}
        ></img>
        <input
          value={searchValue}
          onChange={onChangeSearchInput}
          type="text"
          placeholder="Search..."
        ></input>
        {searchValue && (
          <img
            style={{ cursor: "pointer" }}
            src="/img/remove.svg"
            alt="clear"
            width={20}
            height={20}
            onClick={() => dispatch(setSearchValue(""))}
          ></img>
        )}
      </div>
    </div>
  );
};

export default SearchBlock;
