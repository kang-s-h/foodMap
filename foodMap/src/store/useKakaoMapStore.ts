import { create } from 'zustand'

type marker = kakao.maps.Marker;

interface KakaoMapStoreType {
  markers: marker[];
  addMarker: (marker: marker) => void;
  clearMarkers: () => void;
}

export const useKakaoMapStore = create<KakaoMapStoreType>((set,get) => ({
  markers: [],
  addMarker: (marker : marker)=> set((state) => ({
    markers: [...state.markers, marker],
  })),
  clearMarkers: () => { 
    const { markers } = get();
    markers.map((m) => m.setMap(null));
    set({ markers: [] });
  },
}))
