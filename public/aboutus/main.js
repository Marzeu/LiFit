const URL = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/devs'
    : 'https://api-lifit.herokuapp.com/devs';

const devs = document.getElementById('devs');

let devList = [];

async function loadDevs() {
    try {
        const res = await fetch(URL);
        devList = await res.json();
        displayDevs(devList);
    } catch (err) {
        console.error(err);
    }
};

function displayDevs(people) {
    const htmlString = people
        .map((people) => {
            return `
            <div class="founders">                
                <a href="${people.linkedin}" class="photo" url="${people.linkedin}" style="background-image: url(${people.photo})"></a>
                    <div class="infos">
                        <h4>
                            <a href="${people.linkedin}">${people.name}</a>
                        </h4>                       
                        <p class="text">${people.history}</p>
                    </div>
            </div>               
            `;
        })
        .join('');
    devs.innerHTML = htmlString;
};

loadDevs();

