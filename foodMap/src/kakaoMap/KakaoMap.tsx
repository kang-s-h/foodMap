import { useEffect } from 'react'

declare global {
  interface Window {
    kakao: any;
  }
}


function MapContainer() {
  useEffect(() => {
    const container = document.getElementById('map')
    const options = {
      center: new window.kakao.maps.LatLng(36.350439, 127.384950), // 지도의 중심 좌표
      level: 3,
      setMaxLevel: 8,
      setMinLevel: 1,
    }

    new window.kakao.maps.Map(container, options)
  }, [])

  return (
    <div className='border border-neutral-300 shadow-2xl border-4'>
      <div id="map" className="w-250 h-160" />
    </div>
  )
}

export default MapContainer