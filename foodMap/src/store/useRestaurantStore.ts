import { create } from "zustand";

export interface RestaurantType {
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

export interface StoreStateType {
  restaurantsData: RestaurantType[];
  selectedRestaurant: string;
}

interface StoreActionType{
  setRestaurantsData: (data: RestaurantType[]) => void;
  setSelectedRestaurant: (name: string) => void;
}


const useRestaurantStore = create<StoreStateType & StoreActionType>((set) => ({
  restaurantsData: [],
  selectedRestaurant: "",
  setRestaurantsData : (data) => set({restaurantsData: data}),
  setSelectedRestaurant: (name) => set({ selectedRestaurant: name }),
})) 


export default useRestaurantStore;
