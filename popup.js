document.getElementById('getWeather').addEventListener('click', () => {
  if (!navigator.geolocation) {
    document.getElementById('result').innerText = "Geolocation not supported";
    return;
  }

  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const key = "https://www.weatherapi.com/";
    const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${lat},${lon}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const city = data.location.name;
        const temp = data.current.temp_c;
        const condition = data.current.condition.text;
        document.getElementById('result').innerHTML =
          `${city}<br>${temp}°C<br>${condition}`;
      })
      .catch(() => {
        document.getElementById('result').innerText = "Weather fetch failed";
      });
  }

  function error() {
    document.getElementById('result').innerText = "Location access denied";
  }
});
