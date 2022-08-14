import React, { useState, useEffect } from 'react';
import classes from './Paginator.module.css';

type PropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  portionSize?: number | any;
  onPageChanged: (page: number) => void;
};

const Paginator: React.FC<PropsType> = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  let portionCount = Math.ceil(pagesCount / props.portionSize);

  let [portionNumber, setPortionNumber] = useState<number>(1);

  useEffect(
    () => setPortionNumber(Math.ceil(props.currentPage / props.portionSize)),
    [props.currentPage, props.portionSize]
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
            (props.currentPage === page ? classes.selectedPage : '') +
            ' ' +
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
