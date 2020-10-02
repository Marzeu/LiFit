const URL = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/devs'
    : 'https://api-lifit.herokuapp.com/devs';

async function getAll() {
    const res = await fetch(URL);
    const data = await res.json();

    for (let i = 0; i < data.length; i++) {

        document.getElementById('mostrar').innerHTML += `O id é ${data[i].id} com os nome ${data[i].name}` + "<br>";
    }
}

getAll();
