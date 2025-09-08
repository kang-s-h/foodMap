import clsx from 'clsx';
import ArrowLeft from '@/assets/arrow_left.svg';
import ArrowRight from '@/assets/arrow_right.svg';
import DoubleArrowLeft from '@/assets/doubleArrowLeft.svg';
import DoubleArrowRight from '@/assets/doubleArrowRight.svg';
import useRestaurantStore from '@/store/useRestaurantStore';

type Action = 'first' | 'prev' | 'next' | 'last';

function Pagination() {
  const totalPages = 400;
  const perLimit = 10;

  const { currentPage, setCurrentPage, clearSelectedRestaurant } =
    useRestaurantStore();

  const startPage = Math.floor((currentPage - 1) / perLimit) * perLimit + 1;
  const pageNumbers = Array.from(
    { length: perLimit },
    (_, i) => startPage + i,
  ).filter((page) => page <= totalPages);

  function handleClickPageMoveAction(action: Action) {
    switch (action) {
      case 'first':
        setCurrentPage(1);
        break;
      case 'prev':
        if (currentPage > 1) setCurrentPage(currentPage - 1);
        break;
      case 'next':
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
        break;
      case 'last':
        setCurrentPage(totalPages);
        break;
    }
    clearSelectedRestaurant();
  }

  function handleClickSetPage(page: number) {
    setCurrentPage(page);
    clearSelectedRestaurant();
  }

  return (
    <div className="flex justify-center items-center ">
      <button
        className="pageMoveButton"
        onClick={() => handleClickPageMoveAction('first')}
      >
        <DoubleArrowLeft className="w-4 h-4" />
      </button>
      <button
        className="pageMoveButton"
        onClick={() => handleClickPageMoveAction('prev')}
      >
        <ArrowLeft />
      </button>
      <div className="flex gap-2">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={clsx(`active:scale-90 cursor-pointer hover:scale-105`, {
              'border-b font-bold scale-105': currentPage === pageNumber,
            })}
            onClick={() => handleClickSetPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button
        className="pageMoveButton"
        onClick={() => handleClickPageMoveAction('next')}
      >
        <ArrowRight />
      </button>
      <button
        className="pageMoveButton"
        onClick={() => handleClickPageMoveAction('last')}
      >
        <DoubleArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export default Pagination;
