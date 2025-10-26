import { restaurantApiClient } from '..';
import type { RestaurantResponse } from './entity';

export const getRestaurantData = async (page: number) => {
  const response = await restaurantApiClient.get<RestaurantResponse>(
    `api/stores/?format=json&page=${page}`,
  );

  return response.results;
};
