import { useEffect } from 'react';
import { useKakaoMapStore } from '../store/useKakaoMapStore';
import useRestaurantStore from '../store/useRestaurantStore';
import type { RestaurantType } from '../store/useRestaurantStore';

interface MarkersProps {
  map: kakao.maps.Map | null;
  restaurants: RestaurantType[];
}

function useMarker({ map, restaurants }: MarkersProps) {
  const { markers, addMarker, clearMarkers } = useKakaoMapStore();
  const { setSelectedRestaurant } = useRestaurantStore();

  useEffect(() => {

    if (!map || restaurants.length === 0) return;

    markers.forEach((marker) => marker.setMap(null));
    clearMarkers();

    restaurants.forEach((restaurant) => {
      const markerPosition = new kakao.maps.LatLng(
        Number(restaurant.LAT),
        Number(restaurant.LOT)
      );

      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      kakao.maps.event.addListener(marker, 'click', () => {
        setSelectedRestaurant(restaurant);
        
        const markerPosition = new kakao.maps.LatLng(
          Number(restaurant.LAT),
          Number(restaurant.LOT)
        );

        map.panTo(markerPosition);
      });
      
      marker.setMap(map);
      addMarker(marker);
    });

    return () => {
      markers.forEach((marker) => marker.setMap(null));
      clearMarkers();
    };

  }, [map, restaurants]);
}

export default useMarker;