const URL = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/products'
    : 'https://api-lifit.herokuapp.com/products';

const productsList = document.getElementById('productsList');
const searchBar = document.getElementById('searchBar');
let lifitProducts = [];

searchBar.addEventListener('input', (e) => {

    const searchProductName = e.target.value.toLowerCase();

    const filteredProducts = lifitProducts.filter((products) => {
        return products.name.toLowerCase().includes(searchProductName);
    });
    displayProducts(filteredProducts);
});

const loadProducts = async () => {
    try {
        const res = await fetch(URL);
        lifitProducts = await res.json();
        displayProducts(lifitProducts);
    } catch (err) {
        console.error(err);
    }
};

const displayProducts = (products) => {
    const htmlString = products
        .map((product) => {
            return `
            <li class="character">
            <div>
                <h2>${character.name}</h2>
                <p>House: ${character.house}</p>
                <img src="${character.image}"></img>
            </li>
        `;
        })
        .join('');
    productsList.innerHTML = htmlString;
};

loadProducts();

// async function getAll() {
//     const res = await fetch(URL);
//     const data = await res.json();

//     var { name, id, description, price, url } = data;
function lista(data) {

    for (let i = 0; i < data.length; i++) {

        let container = document.getElementById('productsList');

        let divCard = document.createElement('div');
        let img = document.createElement('img');
        let divCardBody = document.createElement('div');
        let h5CardTitle = document.createElement('h5');
        let pCardText = document.createElement('p');

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

        divCardBodyBotton.className = "card-body";
        divCardBodyBotton.innerHTML = "Preço ";

        aCardLink.className = "card-link";
        aCardLink.innerHTML = data[i].price;

        divCardBody.appendChild(h5CardTitle);
        divCardBody.appendChild(pCardText);

        divCardBodyBotton.appendChild(aCardLink);
        divCard.appendChild(img);
        divCard.appendChild(divCardBody);

        divCard.appendChild(divCardBodyBotton);
        container.appendChild(divCard);

    }
}
// getAll();
