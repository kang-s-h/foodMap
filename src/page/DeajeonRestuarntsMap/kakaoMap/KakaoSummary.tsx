import CloseIcon from '@/assets/close.svg';
import useRestaurantStore from '@/store/useRestaurantStore';

interface SummaryProps {
  onClose: () => void;
}

function Kakaosummary({ onClose }: SummaryProps) {
  const { selectedRestaurant } = useRestaurantStore();

  if (!selectedRestaurant) return <div>오류가 발생했습니다.</div>;

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg border-3 border-yellow-200">
      <div className="flex justify-between items-center gap-4">
        <h1 className="font-bold text-lg">{selectedRestaurant.REST_NM}</h1>
        <button
          onClick={onClose}
          className="cursor-pointer bg-neutral-200 px-2 py-2 rounded-full hover:bg-neutral-300 active:bg-neutral-400"
        >
          <CloseIcon />
        </button>
      </div>
      <div className="font-semibold text-neutral-600">
        {selectedRestaurant.TOB_INFO}
      </div>
      <div>대표메뉴 : {selectedRestaurant.RPRS_MENU_NM}</div>
      <div>{selectedRestaurant.ADDR}</div>
      <div>{selectedRestaurant.TELNO}</div>
      <a
        href={selectedRestaurant.SD_URL}
        target="_blank"
        className="hover:border-b-1 border-blue-800 text-blue-800"
      >
        사이트 이동(네이버 지도)
      </a>
    </div>
  );
}

export default Kakaosummary;
