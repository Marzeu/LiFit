// Variavel criada para a definir se o endereço em que as requisições são localhost ou na
// heroku, se o localhost não estiver disponivel ele define a heroku.
const URL = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/products'
    : 'https://api-lifit.herokuapp.com/products';

let lifitProducts = [];

// Funlção para trazer os dados para mostrar na pagina.
async function loadProducts() {
    try {
        const res = await fetch(URL);
        lifitProducts = await res.json();
        searchProducts(lifitProducts);
    } catch (err) {
        console.error(err);
    }
};

// filtro de produtos

const productsList = document.getElementById('productsList');

// função para listar os produtos
function searchProducts(products) {
    clearList();
    for (const product of products) {

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
        img.src = product.url;

        divCardBody.className = "card-body";

        h5CardTitle.className = "card-title";
        h5CardTitle.innerHTML = product.name;

        pCardText.className = "card-text";
        pCardText.innerHTML = product.description;

        pCardTextMuted.className = "text-muted";
        pCardTextMuted.innerHTML = formatPrice(product.price);

        divCardFotter.className = "card-footer";

        aBtn.className = "btn btn-success";
        aBtn.href = `./produto/#${product.id}`;
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

        productsList.appendChild(divCol);
    }

    if (products.length === 0)
        noResults();
}

// função para limpar a lista
function clearList() {
    while (productsList.firstChild) {
        productsList.removeChild(productsList.firstChild);
    }
}

function noResults() {

    const item = document.createElement('div');
    item.className = "col-sm-4 mt-4";
    const text = document.createTextNode('Produto não encontrado');
    item.appendChild(text);
    productsList.appendChild(item);
}

function relevency(value, searchTerm) {
    if (value === searchTerm) {
        return 2;
    } else if (value.startsWith(searchTerm)) {
        return 1;
    } else {
        return 0;
    }
}

const searchInput = document.getElementById('searchBar');
searchInput.addEventListener('input', (e) => {

    let value = e.target.value;  

    document.getElementById('h2').innerHTML = '';

    if (value && value.trim().length > 0) {
        value = value.trim().toLowerCase();
        searchProducts(lifitProducts.filter(product => {
            return product.name.includes(value);
        }).sort((productA, productB) => {
            return relevency(productB.name, value) - relevency(productA.name, value);
        }));
    } else {
        clearList();
    }
});

const searchButton = document.getElementById('searchButton'); 

searchButton.addEventListener('click', () => {
    
    let value = searchInput.value;
    console.log(value);

    document.getElementById('h2').innerHTML = '';

    if (value && value.trim().length > 0) {
        value = value.trim().toLowerCase();
        searchProducts(lifitProducts.filter(product => {
            return product.name.includes(value);
        }).sort((productA, productB) => {
            return relevency(productB.name, value) - relevency(productA.name, value);
        }));
    } else {
        clearList();
    }
})

loadProducts();