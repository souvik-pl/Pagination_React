import { useState } from "react";
import { PaginationProps } from "./common/pagination.type";
import styles from "./Pagination.module.css";

function Pagination(props: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPageButtonCount: number = 3;
  const showLeftEllipsis: boolean = currentPage > maxPageButtonCount;
  const showRightEllipsis: boolean = currentPage + maxPageButtonCount <= props.pagesCount;
  const pageButtonCount: number =
    props.pagesCount < maxPageButtonCount ? props.pagesCount : maxPageButtonCount;

  function prevButtonClickHandler() {
    const newPage = currentPage - 1;
    if (newPage < 1) return;
    setCurrentPage(newPage);
    props.updatePageNumber(newPage);
  }

  function nextButtonClickHandler() {
    const newPage = currentPage + 1;
    if (newPage > props.pagesCount) return;
    setCurrentPage(newPage);
    props.updatePageNumber(newPage);
  }

  function pageButtonClickHandler(pageNumber: number) {
    setCurrentPage(pageNumber);
    props.updatePageNumber(pageNumber);
  }

  return (
    <div className={styles.container}>
      <button className={`${styles.btn} ${styles.prevnextBtn}`} onClick={prevButtonClickHandler}>
        <span>&lt;</span>
        Previous
      </button>
      {/* Left Ellipsis */}
      {showLeftEllipsis && <span className={styles.ellipsis}>...</span>}
      {/* Page Buttons */}
      {showLeftEllipsis &&
        showRightEllipsis &&
        Array.from({ length: maxPageButtonCount }).map((_, index) => (
          <button
            key={index}
            onClick={() => pageButtonClickHandler(currentPage - 1 + index)}
            className={
              currentPage - 1 + index === currentPage
                ? `${styles.btn} ${styles.selected}`
                : styles.btn
            }
          >
            {currentPage - 1 + index}
          </button>
        ))}
      {showLeftEllipsis &&
        !showRightEllipsis &&
        Array.from({ length: maxPageButtonCount }).map((_, index) => (
          <button
            key={index}
            onClick={() =>
              pageButtonClickHandler(props.pagesCount - maxPageButtonCount + index + 1)
            }
            className={
              props.pagesCount - maxPageButtonCount + index + 1 === currentPage
                ? `${styles.btn} ${styles.selected}`
                : styles.btn
            }
          >
            {props.pagesCount - maxPageButtonCount + index + 1}
          </button>
        ))}
      {showRightEllipsis &&
        !showLeftEllipsis &&
        Array.from({ length: maxPageButtonCount }).map((_, index) => (
          <button
            key={index}
            onClick={() => pageButtonClickHandler(index + 1)}
            className={index + 1 === currentPage ? `${styles.btn} ${styles.selected}` : styles.btn}
          >
            {index + 1}
          </button>
        ))}
      {!showLeftEllipsis &&
        !showRightEllipsis &&
        Array.from({ length: pageButtonCount }).map((_, index) => (
          <button
            key={index}
            onClick={() => pageButtonClickHandler(index + 1)}
            className={index + 1 === currentPage ? `${styles.btn} ${styles.selected}` : styles.btn}
          >
            {index + 1}
          </button>
        ))}
      {/* Right Ellipsis */}
      {showRightEllipsis && <span className={styles.ellipsis}>...</span>}
      <button className={`${styles.btn} ${styles.prevnextBtn}`} onClick={nextButtonClickHandler}>
        Next
        <span>&gt;</span>
      </button>
    </div>
  );
}

export default Pagination;
