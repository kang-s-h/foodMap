import { create } from 'zustand';
import type { Restaurant } from '@/API/foodData/entity';

export interface StoreStateType {
  currentPage: number;
  selectedRestaurant: Restaurant | null;
}

interface StoreActionType {
  setCurrentPage: (page: number) => void;
  setSelectedRestaurant: (restaurantData: Restaurant | null) => void;
  clearSelectedRestaurant: () => void;
}

const useRestaurantStore = create<StoreStateType & StoreActionType>((set) => ({
  currentPage: 1,
  selectedRestaurant: null,
  setCurrentPage: (page: number) => set({ currentPage: page }),
  setSelectedRestaurant: (restaurantData: Restaurant | null) =>
    set({ selectedRestaurant: restaurantData }),
  clearSelectedRestaurant: () => set({ selectedRestaurant: null }),
}));

export default useRestaurantStore;
