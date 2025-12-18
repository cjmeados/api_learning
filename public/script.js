let apiBtn = document.getElementById('fetchBtn');
let landingOutput = document.getElementById('landingOutput');

apiBtn.addEventListener('click', async () => { //look into async more later
    const response = await fetch('/hello'); //look into let/const again and await

    const data = await response.json();

    // add error handle later

    landingOutput.textContent = data.message;

});

let weatherBtn = document.getElementById('weatherBtn');
let weatherOutput = document.getElementById('weatherOutput');

weatherBtn.addEventListener('click', async () => {
    const response = await fetch('/external');
    
    const data = await response.json();

    const temps = data.hourly.temperature_2m.slice(0,24).join(', ');
    weatherOutput.textContent = `${temps}`;
});