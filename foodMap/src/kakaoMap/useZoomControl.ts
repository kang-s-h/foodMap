import { useEffect } from "react";

type map = kakao.maps.Map | null;

function useZoomControl(map: map) {
  useEffect(() => {

    if (!map) return;

    const mapTypeControl = new window.kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

    const zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
    
  }, [map])
  
  return map;
}

export default useZoomControl;