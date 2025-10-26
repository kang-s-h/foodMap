import { useSuspenseQuery } from '@tanstack/react-query';
import { getRestaurantData } from '@/API/foodData/restaurant';

export const useRestuarantData = (page: number) => {
  return useSuspenseQuery({
    queryKey: ['restaurantData', page],
    queryFn: () => getRestaurantData(page),
  });
};
