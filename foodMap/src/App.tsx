import { useEffect, useState } from "react";
import MapContainer from "./kakaoMap/KakaoMap"
import { fetchData } from "./API/ restaurant";
import useRestaurantStore from "./store/useRestaurantStore";

// interface restaurantType {
//   ADDR: string;
//   LAT: string;
//   LOT: string;
//   MENU_AMT: string;
//   MENU_MENU_ADD_INFO: string;
//   OPEN_HR_INFO: string;
//   REST_NM: string;
//   TELNO: string;
//   TOB_INFP: string;
// }


function App() {
  const { restaurantsData, setRestaurantsData } = useRestaurantStore();

  const [page, setPage] = useState<number>(1);
  //const [restaurantData, setRestaurantData] = useState<restaurantType[] | []>([])

  const handleClickPageUp = () => {
    setPage(page + 1);
  }



  // ✅ App.tsx (또는 컴포넌트 내부)
  useEffect(() => {
    const getData = async () => {
      const data = await fetchData(page);
      setRestaurantsData(data); // 여기서 상태 업데이트
    };
    getData();
  }, [page]);


  return (
    <div className='w-100% h-100%'>
      <header className='mb-20 justify-self-center m-10 text-3xl'>
        대전광역시 음식점 지도
      </header>
      <button className="bg-gray-300 rounded-lg p-2 border border-gray-400 active:bg-gray-400"
        onClick={handleClickPageUp}>page up</button>
      <section className='flex gap-40'>
        <div className="w-130 flex flex-col gap-2 h-160 overflow-scroll border p-5">
          {restaurantsData.map((restaurant) => (
            <div key={restaurant.REST_ID}>
              <div>{restaurant.REST_NM} ///// {restaurant.TOB_INFO}</div>
            </div>


          ))}
        </div>
        <MapContainer />
      </section>
      <footer>footer</footer>
    </div>
  )
}

export default App
