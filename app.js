setInterval(() => {
  const resolve = (position) => {
    //*---------------------------Weather API-----------------------------
    const request = fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=b9e1392e3720d63b937ad2a6e1142a1e`
    );

    request
      .then((response) => {
        return response.json();
      })
      .then((resp) => {
        const container = document.querySelector(".container");
        const now = new Date(position.timestamp);

        const hours = now.getHours() > 9 ? `${now.getHours()}` : `0${now.getHours()}`;
        const minutes = now.getMinutes() > 9 ? `${now.getMinutes()}` : `0${now.getMinutes()}`;
        const seconds = now.getSeconds() > 9 ? `${now.getSeconds()}` : `0${now.getSeconds()}`;

        let time = `${hours}:${minutes}:${seconds}`;
        container.innerHTML = `
      <main>
      <div id="temp">
      <p class="degrees">${`${Math.floor(resp.main.temp)}<span>&#176;</span>`}</p>
        </div>
        <div id="location">
        <h3 id="city">${resp["name"]}</h3>
        <p class="date">${`${time} -  ${new Date().toLocaleDateString()}`}</p>
        </div>
        </main>
        <aside>
        <div id="details">
        <h1>Details</h1>
        <p class="wind">Wind : ${resp.wind.speed} m/s</p>
        <p class="clouds">Cloudy : ${resp.clouds.all}%</p>
        <p class="humidity">Humidity : ${resp.main.humidity}%</p>
        <figure>
        <img src=http://openweathermap.org/img/w/${
          resp["weather"][0]["icon"]
        }.png alt="weather icon" class="wheather_image">
            <figcaption>${resp["weather"][0]["description"]}</figcaption>
        </figure>
        </div>
        </aside>
        `;

        //*Code bellow will change background depending on current time
        // let test = 6 //<- to test it variable 'hours' may be replaced with 'test'

        if (hours >= 5 && hours < 18) {
          document.body.className = "";
          document.body.classList.add("day");
        } else if (hours >= 18 && hours < 21) {
          document.body.className = "";
          document.body.classList.add("sunset");
        } else {
          document.body.className = "";
          document.body.classList.add("night");
        }
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
}, 1000);
