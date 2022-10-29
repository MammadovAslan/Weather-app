const resolve = (position) => {
  //*---------------------------Weather API-----------------------------
  const request = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=b9e1392e3720d63b937ad2a6e1142a1e`
  );

  const now = new Date(position.timestamp);
  const hours = now.getHours() > 9 ? `${now.getHours()}` : `0${now.getHours()}`;
  const minutes = now.getMinutes() > 9 ? `${now.getMinutes()}` : `0${now.getMinutes()}`;

  request
    .then((response) => {
      return response.json();
    })
    .then((resp) => {
      const container = document.querySelector(".container");
      container.innerHTML = `
      <main>
      <div id="temp">
      <p class="degrees">${`${Math.floor(304 - resp.main.temp)}<span>&#176;</span>`}</p>
        </div>
        <div id="location">
        <h3 id="city">${resp["name"]}</h3>
        <p class="date">${`${hours}:${minutes} -  ${new Date().toLocaleDateString()}`}</p>
        </div>
        </main>
        <aside>
        <div id="details">
        <h1>Details</h1>
        <p class="wind">${`Wind : ${resp.wind.speed} m/s`}</p>
        <p class="clouds">${`Cloudy : ${resp.clouds.all}%`}</p>
        <figure>
        <img src=http://openweathermap.org/img/w/${
          resp["weather"][0]["icon"]
        }.png alt="weather icon" class="wheather_image">
            <figcaption>${resp["weather"][0]["description"]}</figcaption>
        </figure>
        </div>
        </aside>
        `;
    })
    .catch((error) => {
      console.log(error);
    });
};

const reject = (error) => {
  console.log(error);
};

//*----------------Request location------------------------
navigator.geolocation.getCurrentPosition(resolve, reject);
