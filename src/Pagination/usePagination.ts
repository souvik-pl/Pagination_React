export const DOTS = "...";
export function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
}

export default function usePagination(totalPages: number, currentPage: number) {
  let paginationUIElements: (string | number)[] = [];
  const maxPageButtonCount: number = 5;

  if (totalPages <= maxPageButtonCount) {
    paginationUIElements = range(1, totalPages);
    return paginationUIElements;
  }

  const shouldShowLeftDots = currentPage > 3;
  const shouldShowRightDots = currentPage < totalPages - 2;

  const firstPageNumber = 1;
  const lastPageNumber = totalPages;

  if (shouldShowLeftDots && shouldShowRightDots) {
    paginationUIElements = [
      firstPageNumber,
      DOTS,
      ...range(currentPage - 1, currentPage + 1),
      DOTS,
      lastPageNumber,
    ];
  } else if (shouldShowRightDots) {
    paginationUIElements = [...range(1, maxPageButtonCount - 1), DOTS, lastPageNumber];
  } else if (shouldShowLeftDots) {
    paginationUIElements = [
      firstPageNumber,
      DOTS,
      ...range(totalPages - maxPageButtonCount + 2, totalPages),
    ];
  }

  return paginationUIElements;
}
