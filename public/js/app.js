const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const forecast = document.querySelector("#forecast");
const place = document.querySelector("#place");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const address = search.value;
  forecast.textContent = "loading...";
  place.textContent = "";

  fetch("/weather?address=" + address).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        forecast.textContent = data.error;
      } else {
        forecast.textContent = data.forecast;
        place.textContent = data.location;
      }
    });
  });
});
