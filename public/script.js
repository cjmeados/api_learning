let apiBtn = document.getElementById('fetchBtn');
let landingOutput = document.getElementById('landingOutput');

apiBtn.addEventListener('click', async () => { //look into async more later
    const response = await fetch('/hello'); //look into let/const again and await

    const data = await response.json();

    // add error handle later

    landingOutput.textContent = data.message;




});