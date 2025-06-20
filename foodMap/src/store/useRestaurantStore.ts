import { create } from "zustand";

export interface restaurantType {
  ADDR: string;
  LAT: string;
  LOT: string;
  MENU_AMT: string;
  MENU_MENU_ADD_INFO: string;
  OPEN_HR_INFO: string;
  REST_NM: string;
  TELNO: string;
  TOB_INFO: string;
  REST_ID: string;
}

export interface useRestaurantStoreType {
  restaurantsData: restaurantType[];
  setRestaurantsData: (data : restaurantType[]) => void;
}


const useRestaurantStore = create<useRestaurantStoreType>((set) => ({
  restaurantsData : [],
  setRestaurantsData : (data : restaurantType[] ) => set((state)=> ({restaurantsData : [...state.restaurantsData , ...data]})),
  
})) 


export default useRestaurantStore;