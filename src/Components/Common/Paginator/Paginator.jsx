import React from "react";
import classes from "./Paginator.module.css";

const Paginator = (props) => {
	let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

	let pages = [];
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i);
	}

	return (
		<div className={classes.pages}>
			{pages.map((page, index) => (
				<span
					key={index}
					className={
						(props.currentPage === page ? classes.selectedPage : "") 
						+ " " + classes.numPage
					}
					onClick={() => { props.onPageChanged(page); }}
				>
					{page}
				</span>
			))}
		</div>
	);
};

export default Paginator;