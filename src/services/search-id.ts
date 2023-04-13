export const getSearchId = async () => {
  const data = await fetch('https://aviasales-test-api.kata.academy/search');
  return await data.json();
};
