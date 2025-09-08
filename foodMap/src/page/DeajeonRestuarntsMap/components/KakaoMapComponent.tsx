import clsx from 'clsx';
import { useRestuarantData } from '../hook/useRestuarantData';
import Pagination from './Pagination';
import type { Restaurant } from '@/API/foodData/entity';
import Kakaosummary from '@/page/DeajeonRestuarntsMap/kakaoMap/KakaoSummary';
import MapCustomOverlay from '@/page/DeajeonRestuarntsMap/kakaoMap/MapCustomOverlay';
import useKakaoMap from '@/page/DeajeonRestuarntsMap/kakaoMap/useKakaoMap';
import useMarker from '@/page/DeajeonRestuarntsMap/kakaoMap/useMarker';
import useZoomControl from '@/page/DeajeonRestuarntsMap/kakaoMap/useZoomControl';
import useRestaurantStore from '@/store/useRestaurantStore';

function KakaoMapComponent() {
  const { currentPage, selectedRestaurant, setSelectedRestaurant } =
    useRestaurantStore();

  const map = useKakaoMap();

  const { data } = useRestuarantData(currentPage);

  const LatLng =
    selectedRestaurant &&
    new kakao.maps.LatLng(
      Number(selectedRestaurant.LAT),
      Number(selectedRestaurant.LOT),
    );

  useZoomControl(map);
  useMarker({ map, restaurants: data });

  const handleClickRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);

    if (map && restaurant) {
      const moveLatLon = new kakao.maps.LatLng(
        Number(restaurant.LAT),
        Number(restaurant.LOT),
      );
      map.panTo(moveLatLon);
    }
  };

  const handleCloseOverlay = () => setSelectedRestaurant(null);

  return (
    <div className="w-full h-full flex justify-between">
      <div className="flex-1 flex flex-col gap-10">
        <div className=" text-center mt-10 text-3xl w-auto">
          대전광역시 음식점 지도
        </div>
        <div className="w-auto flex flex-col gap-2 h-162 overflow-scroll border p-5 m-5 shadow-xl">
          {data &&
            data.map((restaurant) => (
              <button
                key={restaurant.REST_ID}
                className={clsx(
                  'border border-gray-400 border-2 p-2 cursor-pointer hover:bg-neutral-200 active:bg-neutral-300 rounded-lg shadow-lg checked:bg-yellow-200',
                  {
                    'bg-yellow-200':
                      selectedRestaurant &&
                      selectedRestaurant.REST_ID === restaurant.REST_ID,
                  },
                )}
                onClick={() => handleClickRestaurant(restaurant)}
              >
                <div className="justify-self-center">
                  {restaurant.REST_NM} ({restaurant.TOB_INFO})
                </div>
              </button>
            ))}
        </div>
        <Pagination />
      </div>
      <div className="border border-neutral-300 shadow-2xl border-4 w-300 h-full">
        <div id="map" className="w-full h-full z-0" />
        {map && selectedRestaurant && (
          <MapCustomOverlay map={map} position={LatLng}>
            <Kakaosummary onClose={handleCloseOverlay} />
          </MapCustomOverlay>
        )}
      </div>
    </div>
  );
}

export default KakaoMapComponent;
