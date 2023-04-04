const getSearchId = async () => {
  const data = await fetch('https://aviasales-test-api.kata.academy/search');
  const res = await data.json();
  return res;
};

export default getSearchId;
