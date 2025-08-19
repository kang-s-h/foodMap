import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';

interface MapCustomOverlayProps {
  map: kakao.maps.Map;
  position: kakao.maps.LatLng | null;
  children: React.ReactNode;
}

function MapCustomOverlay({ map, position, children }: MapCustomOverlayProps) {
  const container = useMemo(() => {
    const el = document.createElement('div');

    el.addEventListener('mousedown', (e) => e.stopPropagation());
    el.addEventListener('mouseup', (e) => e.stopPropagation());
    return el;
  }, []);

  const [overlay, setOverlay] = useState<kakao.maps.CustomOverlay>();

  useEffect(() => {

    if (!map || !position) return;

    const customOverlay = new kakao.maps.CustomOverlay({
      position: position,
      content: container,
      map: map,
      yAnchor: 1.5,
    });
    setOverlay(customOverlay);

    return () => {
      customOverlay.setMap(null);
    };
  }, [map, container, position]);

  useEffect(() => {

    if (!overlay || !position) return;

    overlay?.setPosition(position);
  }, [overlay, position]);

  return ReactDOM.createPortal(children, container);
}

export default MapCustomOverlay;