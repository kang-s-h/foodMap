export interface Restaurant {
  ADDR: string;
  DADDR: string; // 상세 주소
  LAT: string;
  LOT: string;
  MENU_AMT: string[]; // 메뉴 가격
  MENU_MENU_ADD_INFO: string[];
  MENU_ENG_NM: string;
  MENU_ID: string;
  MENU_KORN_ADD_INFO: string[];
  MENU_KORN_NM: string[];
  OEPEN_HR_INFO: string;
  REST_ID: number;
  REST_NM: string; // 음식점 이름
  RPRS_MENU_NM: string; // 대표 메뉴명
  SD_ADD_INFO: string[];
  SD_ID: number;
  SD_NM: string;
  SD_URL: string;
  TELNO: string;
  TOB_INFO: string;
}

export interface RestaurantResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Restaurant[];
}
