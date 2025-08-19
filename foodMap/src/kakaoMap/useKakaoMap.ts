import { useEffect,useState } from "react";


function useKakaoMap() {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  useEffect(() => {

    const container = document.getElementById('map')

    if (container === null) return
    
    const options = {
      center: new kakao.maps.LatLng(36.350439, 127.384950),
      level: 7,
    }

    const newMap = new kakao.maps.Map(container, options);
    newMap.setMaxLevel(10);
    setMap(newMap);

  },[]);

  return map;


} 
export default useKakaoMap;