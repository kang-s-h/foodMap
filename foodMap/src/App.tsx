import { useEffect, useState } from "react";
import { fetchData } from "./API/ restaurant";
import useRestaurantStore from "./store/useRestaurantStore";
import useKakaoMap from "./kakaoMap/useKakaoMap";
import useZoomControl from "./kakaoMap/useZoomControl";
import useMarker from "./kakaoMap/useMarker";
import type { RestaurantType } from "./store/useRestaurantStore";
import Kakaosummary from "./kakaoMap/KakaoSummary";
import MapCustomOverlay from "./kakaoMap/MapCustomOverlay";


function App() {
  const { restaurantsData, selectedRestaurant, setRestaurantsData, setSelectedRestaurant } = useRestaurantStore();
  const [page, setPage] = useState<number>(1);

  const map = useKakaoMap();

  useZoomControl(map);
  useMarker({ map, restaurants: restaurantsData });

  const handleClickPageUp = () => {
    setSelectedRestaurant(null);
    if (map) {
      map.setCenter(new kakao.maps.LatLng(36.350439, 127.384950));
      map.setLevel(7);
    }
    setPage(page + 1);
  }

  const handleClickRestaurant = (restaurant: RestaurantType) => {
    setSelectedRestaurant(restaurant);

    if (map && restaurant) {
      const moveLatLon = new kakao.maps.LatLng(
        Number(restaurant.LAT),
        Number(restaurant.LOT)
      );
      map.panTo(moveLatLon);
    }
  }

  const handleCloseOverlay = () => {
    setSelectedRestaurant(null);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData(page);
      setRestaurantsData(data);
    };
    getData();
  }, [page, setRestaurantsData]);


  return (
    <div className='w-full h-full flex justify-between'>
      <div className="w-120">
        <div className='mb-20 justify-self-center m-10 text-3xl w-auto'>
          대전광역시 음식점 지도
        </div>
        <button className="bg-gray-300 rounded-lg p-2 border border-gray-400 active:bg-gray-400"
          onClick={handleClickPageUp}>page up</button>
        <div className="w-auto flex flex-col gap-2 h-162 overflow-scroll border p-5 shadow-xl">
          {restaurantsData.map((restaurant) => (
            <div key={restaurant.REST_ID}
              className="border border-gray-400 border-2 p-2 cursor-pointer hover:bg-neutral-200 active:bg-neutral-300 rounded-lg shadow-lg"
              onClick={() => handleClickRestaurant(restaurant)}
            >
              <div className="justify-self-center">{restaurant.REST_NM} ({restaurant.TOB_INFO})</div>
            </div>
          ))}
        </div>
      </div>
      <div className='border border-neutral-300 shadow-2xl border-4 w-300 h-full'>
        <div id="map" className="w-full h-full z-0" />
        {map && selectedRestaurant ? (
          <MapCustomOverlay
            map={map}
            position={new kakao.maps.LatLng(
              Number(selectedRestaurant.LAT),
              Number(selectedRestaurant.LOT)
            )}
          >
            <Kakaosummary
              onClose={handleCloseOverlay}
            />
          </MapCustomOverlay>
        ) : null}
      </div>
    </div >
  )
}

export default App;
