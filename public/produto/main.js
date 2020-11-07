const URL = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/products'
    : 'https://api-lifit.herokuapp.com/products';

var product;
const idValue = window.location.href.split('#');

// GET pegar apenas um item por id
async function getOne() {
    try {
        const res = await fetch(`${URL}/${idValue[1]}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        product = await res.json();
        displayProducts(product);

    } catch (err) {
        console.error(err);
    }
};

function displayProducts(product) {

    let productsList = document.getElementById('productsList');

    let divGallery = document.createElement('div');
    divGallery.className = "gallery";

    let img = document.createElement('img');
    img.src = product.url;

    let divInfo = document.createElement('div');
    divInfo.className = "info";

    let h1 = document.createElement('h1');
    h1.innerHTML = product.name

    let divPublished = document.createElement('div');
    divPublished.className = "published";
    divPublished.innerHTML = "criado as tal horas ";

    let divDescription = document.createElement('div');
    divDescription.className = "description";
    divDescription.innerHTML = product.description;

    let divPriceBuy = document.createElement('div');
    divPriceBuy.className = "price-buy";

    let divPrice = document.createElement('div');
    divPrice.className = "price"
    divPrice.innerHTML = formatPrice(product.price);

    let divBuy = document.createElement('div');
    divBuy.className = "buy"

    let buttonBtn = document.createElement('button');
    buttonBtn.className = "btn btn-success";
    buttonBtn.addEventListener("click", () => { createLocalStorage() });
    buttonBtn.innerHTML = "Comprar";

    divBuy.appendChild(buttonBtn);

    divPriceBuy.appendChild(divPrice);
    divPriceBuy.appendChild(divBuy);

    divInfo.appendChild(h1);
    // divInfo.appendChild(divPublished);
    divInfo.appendChild(divDescription);
    divInfo.appendChild(divPriceBuy);

    divGallery.appendChild(img);

    productsList.appendChild(divGallery);
    productsList.appendChild(divInfo);
};

// função de alerta que é chamada dentro do atualizar
function sweetAlert() {
    swal({
        title: "Produto atualizado com sucesso!",
        text: "Deseja atualizar outro produto?",
        icon: "success",
        buttons: {
            cancel: "Não",
            confirm: { text: "Sim", value: true }
        },
    })
        .then((updateProduct) => {
            if (updateProduct) {
                window.location.href = '/usuarios/produtos'
            } else {
                window.location.href = '/'
            };
        });
};

getOne();
