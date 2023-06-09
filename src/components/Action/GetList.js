import queryString from 'query-string';


export const getListProduct = async (currentPage) => {
  const dataPost = {
    page: currentPage,
  };
  const params = queryString.stringify(dataPost);

  const url = `http://127.0.0.1:8000/api/products?${params}`;
  const responese = await fetch(url);
  const responeJson = await responese.json();

//   console.log(responeJson.data.data);

  return responeJson;
};
