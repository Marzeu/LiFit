const URL = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/products'
    : 'https://api-lifit.herokuapp.com/products';

async function getAll() {
    const res = await fetch(URL);
    const data = await res.json();
    
    var { name, id, description, price, url } = data;

    for (let i = 0; i < data.length; i++) {

        let container = document.getElementById('mostrar');

        let divCard = document.createElement('div');
        let img = document.createElement('img');
        let divCardBody = document.createElement('div');
        let h5CardTitle = document.createElement('h5');
        let pCardText = document.createElement('p');
        // let ulListGroup = document.createElement('ul');
        // let liListGroupItem = document.createElement('li');
        let divCardBodyBotton = document.createElement('div');
        let aCardLink = document.createElement('a');

        divCard.className = "card";

        img.className = "card-img-top";
        img.src = data[i].url;

        divCardBody.className = "card-body";

        h5CardTitle.className = "card-title";
        h5CardTitle.innerHTML = data[i].name;

        pCardText.className = "card-text";
        pCardText.innerHTML = data[i].description;

        // ulListGroup.className = "list-group list-group-flush";
        // ulListGroup.innerHTML = "ulListGroup";

        // liListGroupItem.className = "list-group-item";
        // liListGroupItem.innerHTML = "liListGroupItem";

        divCardBodyBotton.className = "card-body";
        divCardBodyBotton.innerHTML = "Preço ";

        aCardLink.className = "card-link";
        aCardLink.innerHTML = data[i].price;

        divCardBody.appendChild(h5CardTitle);
        divCardBody.appendChild(pCardText);
        // ulListGroup.appendChild(liListGroupItem);
        divCardBodyBotton.appendChild(aCardLink);
        divCard.appendChild(img);
        divCard.appendChild(divCardBody);
        // divCard.appendChild(ulListGroup);
        divCard.appendChild(divCardBodyBotton);
        container.appendChild(divCard);
        
    }
}
getAll();
