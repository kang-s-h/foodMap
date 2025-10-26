interface CategoryType {
  page: number;
  category: string;
}

const fetchCategoryData = async ({ page, category }: CategoryType) => {
  try {
    const res = await fetch(
      `/api/api/stores/?format=json&category=${category}&page=${page}`,
    );
    const data = await res.json();
    console.log(data);
    return data.results;
  } catch (err) {
    console.error('fetch 실패:', err);
    return [];
  }
};

export default fetchCategoryData;
