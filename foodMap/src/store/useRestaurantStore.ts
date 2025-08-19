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
  SD_URL: string;
}

export interface StoreStateType {
  restaurantsData: RestaurantType[];
  selectedRestaurant: RestaurantType | null;

}

interface StoreActionType{
  setRestaurantsData: (data: RestaurantType[]) => void;
  setSelectedRestaurant: (restaurantData: RestaurantType | null) => void;
  clearSelectedRestaurant: () => void;

}

const useRestaurantStore = create<StoreStateType & StoreActionType>((set) => ({
  restaurantsData: [],
  selectedRestaurant: null,
  setRestaurantsData : (data) => set({restaurantsData: data}),
  setSelectedRestaurant: (restaurantData) => set({ selectedRestaurant: restaurantData }),
  clearSelectedRestaurant: () => set({ selectedRestaurant: null }),
})) 


export default useRestaurantStore;
