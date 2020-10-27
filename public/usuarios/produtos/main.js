const URL = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/products'
    : 'https://api-lifit.herokuapp.com/products';

const productsList = document.getElementById('productsList');

let lifitProducts = [];

async function loadProducts() {
    try {
        const res = await fetch(URL);
        lifitProducts = await res.json();
        displayProducts(lifitProducts);
    } catch (err) {
        console.error(err);
    }
};

function displayProducts(products) {
    const htmlString = products
        .map((product) => {
            return `    
            <tr>
                <td>
                    <span style="background-image: url(${product.url})"></span>
                    ${product.name}
                </td>
                <td>${product.description}</td>
                <td>${product.quantity}</td>
                <td>${product.price}</td>
                <td><a href="./editar/#${product.id}">editar</a></td> 
            </tr>
            `;
        })
        .join('');
    productsList.innerHTML = htmlString;
};

loadProducts();