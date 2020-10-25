const URL = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/products'
    : 'https://api-lifit.herokuapp.com/products';

const productsList = document.getElementById('productsList');

let lifitProducts = [];

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
            
            <div>
                <h2>${product.name}</h2>
                <a href="">editar</a>                
            </div>
        `;
        })
        .join('');
    productsList.innerHTML = htmlString;
};

loadProducts();


