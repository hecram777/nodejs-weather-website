console.log("Client side javascript file is loaded!");

const getWeather = (address, callback) => {
  fetch(`/weather?address=${address}`).then((response) => {
    response
      .json()
      .then(({ error, location, forecast } = {}) => {
        if (error) {
          return callback({ error });
        }

        return callback({ data: { location, forecast } });
      })
      .catch((error) => {
        return callback({ error });
      });
  });
};

const weatherForm = document.querySelector("#form-weather");
const search = document.querySelector("#input-search");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

messageOne.textContent = "";
messageTwo.textContent = "";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const address = search.value;
  messageOne.textContent = "Loading ...";
  messageTwo.textContent = "";
  getWeather(address, ({ error, data }) => {
    if (error) {
      return (messageOne.textContent = error);
    }

    const { location, forecast } = data;
    messageOne.textContent = location;
    messageTwo.textContent = forecast;
  });
});
