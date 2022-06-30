import React, { useState, useEffect } from "react";
import classes from "./Paginator.module.css";

const Paginator = (props) => {
  let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / props.portionSize);

  let [portionNumber, setPortionNumber] = useState(1);
  useEffect(
    () => setPortionNumber(Math.ceil(props.currentPage / props.portionSize)),
    [props.currentPage]
  );
  let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1;
  let rightPortionPageNumber = portionNumber * props.portionSize;
  let currentPages = pages.filter(
    (page) => page >= leftPortionPageNumber && page <= rightPortionPageNumber
  );
  return (
    <div className={classes.pages}>
      {portionNumber > 1 && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber - 1);
          }}
        >
          PREV
        </button>
      )}
      {currentPages.map((page, index) => (
        <span
          key={index}
          className={
            (props.currentPage === page ? classes.selectedPage : "") +
            " " +
            classes.numPage
          }
          onClick={() => {
            props.onPageChanged(page);
          }}
        >
          {page}
        </span>
      ))}
      {portionCount > portionNumber && (
        <button
          onClick={() => {
            setPortionNumber(portionNumber + 1);
          }}
        >
          NEXT
        </button>
      )}
    </div>
  );
};

export default Paginator;
