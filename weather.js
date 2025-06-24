const apiKey = "19b7154364ade3a2cfaeb0e5c18fbf95"; // Replace with your OpenWeatherMap API key

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let lon = position.coords.longitude;
      let lat = position.coords.latitude;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          weatherReport(data);
        });
    });
  }
});

function searchByCity() {
  const place = document.getElementById("input").value;
  const urlSearch = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}`;

  fetch(urlSearch)
    .then((res) => res.json())
    .then((data) => {
      weatherReport(data);
    });

  document.getElementById("input").value = "";
}

function weatherReport(data) {
  document.getElementById("city").innerText = `${data.name}, ${data.sys.country}`;
  document.getElementById("temperature").innerText =
    Math.floor(data.main.temp - 273.15) + " °C";
  document.getElementById("clouds").innerText = data.weather[0].description;

  const icon = data.weather[0].icon;
  document.getElementById("img").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
}
function getUpcomingDates() {
    const today = new Date();
    for (let i = 0; i < 4; i++) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i);

        const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
        const formatted = futureDate.toLocaleDateString('en-US', options);

        const el = document.getElementById(`date${i}`);
        if (el) el.textContent = formatted;
    }
}

// Call this when the page loads
getUpcomingDates();

