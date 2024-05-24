async function apiGetDrinks() {
  const APIURL = "https://apis-foodin-1.onrender.com/api/drinks";
  const options = {
    method: "GET",
  };
  const response = await fetch(APIURL, options);
  const data = await response.json();
  return data;
}

export default apiGetDrinks;
