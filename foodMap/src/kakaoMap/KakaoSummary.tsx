import useRestaurantStore from "../store/useRestaurantStore";

interface SummaryProps {
  onClose: () => void;
}

function Kakaosummary({ onClose }: SummaryProps) {

  const { selectedRestaurant } = useRestaurantStore();

  if (!selectedRestaurant) return <div>오류가 발생했습니다.</div>

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg">
      <div className="flex justify-between items-center">
        <h1>{selectedRestaurant.REST_NM}</h1>
        <button onClick={onClose} className="cursor-pointer bg-neutral-200 p-2 rounded-full hover:bg-neutral-300 active:bg-neutral-400">닫기</button>
      </div>
      <div>{selectedRestaurant.TOB_INFO}</div>
      <div>{selectedRestaurant.ADDR}</div>
      <div>{selectedRestaurant.TELNO}</div>
      <a href={selectedRestaurant?.SD_URL} target="_blank" className="hover:border-b-1 border-gray-500">사이트 이동(네이버 지도)</a>
    </div>
  );
}

export default Kakaosummary; 