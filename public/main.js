const URL = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/products'
    : 'https://api-lifit.herokuapp.com/products';

async function getAll() {
    const res = await fetch(URL);
    const data = await res.json();

    var { name, id, description, price, url } = data;

    for (let i = 0; i < data.length; i++) {

        let container = document.getElementById('mostrar');

        // let divRowBottom = document.createElement('div');
        let divCol = document.createElement('div');
        let divCardH100 = document.createElement('div');
        let divCardImg = document.createElement('div');
        let img = document.createElement('img');
        let divCardBody = document.createElement('div');
        let h5CardTitle = document.createElement('h5');
        let pCardText = document.createElement('p');
        let pCardTextMuted = document.createElement('p');
        let divCardFotter = document.createElement('footer');
        let aBtn = document.createElement('a');

        // divRowBottom.className = "row bottom-buffer"; 

        divCol.className = "col-sm-4 mt-4";

        divCardH100.className = "card h-100";

        divCardImg.className = "card-img d-flex flex-wrap align-items-center";

        img.className = "card-img-top mx-auto";
        img.src = data[i].url;

        divCardBody.className = "card-body";

        h5CardTitle.className = "card-title";
        h5CardTitle.innerHTML = data[i].name;

        pCardText.className = "card-text";
        pCardText.innerHTML = data[i].description;

        pCardTextMuted.className = "text-muted";
        pCardTextMuted.innerHTML = data[i].price + " R$/kg";

        divCardFotter.className = "card-footer";

        aBtn.className = "btn btn-success";
        aBtn.innerHTML = "Ver produto";

        divCardImg.appendChild(img);

        divCardBody.appendChild(h5CardTitle);
        divCardBody.appendChild(pCardText);
        divCardBody.appendChild(pCardTextMuted);

        divCardFotter.appendChild(aBtn);

        divCardH100.appendChild(divCardImg);
        divCardH100.appendChild(divCardBody);
        divCardH100.appendChild(divCardFotter);
        
        divCol.appendChild(divCardH100);

        // divRowBottom.appendChild(divCol);

        container.appendChild(divCol);
    }
}
getAll();
