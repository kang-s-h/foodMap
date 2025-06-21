import { useEffect } from 'react'
import useRestaurantStore from '../store/useRestaurantStore';

declare global {
  interface Window {
    kakao: any;
  }
}


function MapContainer() {
  const { selectedRestaurant, restaurantsData } = useRestaurantStore();

  useEffect(() => {
    const container = document.getElementById('map')
    const options = {
      center: new window.kakao.maps.LatLng(36.350439, 127.384950), // 지도의 중심 좌표
      level: 7,
    }

    const map = new window.kakao.maps.Map(container, options);
    map.setMaxLevel(7);


    restaurantsData.forEach((restaurant) => (
      new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(Number(restaurant.LAT), Number(restaurant.LOT)),
      }).setMap(map)
    ))

    const marker = new window.kakao.maps.Marker({
      map: map,
      position: new window.kakao.maps.LatLng(36.350430, 127.384958),
    }).setMap(map);

    //marker.setMap(map);

  }, [restaurantsData])

  return (
    <div className='border border-neutral-300 shadow-2xl border-4'>
      <div id="map" className="w-250 h-160" />
    </div>
  )
}

export default MapContainer
