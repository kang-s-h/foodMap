export const fetchData = async (page: number) => {

    try {
      const res = await fetch(`/api/api/stores/?format=json&page=${page}`);
      const data = await res.json();
      console.log(data);
      return data.results;
    } catch (err) {
      console.error("fetch 실패:", err);
      return [];
    }
  
};
  