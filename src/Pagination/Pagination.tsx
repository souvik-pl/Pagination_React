import { useEffect, useState } from "react";
import { PaginationProps } from "./common/common.type";
import styles from "./Pagination.module.css";
import usePagination, { DOTS } from "./usePagination";

function Pagination(props: PaginationProps) {
  const { totalPages, onChange } = props;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const paginationUIElements = usePagination(totalPages, currentPage);

  useEffect(() => {
    onChange(currentPage);
  }, [currentPage]);

  function updatePage(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  function prevHandler() {
    const newPage = currentPage - 1;
    if (newPage > 0) {
      updatePage(newPage);
    }
  }

  function nextHandler() {
    const newPage = currentPage + 1;
    if (newPage <= totalPages) {
      updatePage(newPage);
    }
  }

  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={prevHandler}>
        Prev
      </button>
      {paginationUIElements.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <span key={index}>{DOTS}</span>;
        }

        return (
          <button
            key={index}
            className={
              pageNumber === currentPage ? `${styles.btn} ${styles.btn_selected}` : styles.btn
            }
            onClick={() => updatePage(pageNumber as number)}
          >
            {pageNumber}
          </button>
        );
      })}
      <button className={styles.btn} onClick={nextHandler}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
