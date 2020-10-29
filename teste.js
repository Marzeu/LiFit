// module.exports = {
//     async findOne(filters) {
//         let query = "SELECT * FROM users"

//         Object.keys(filters).map(key => {
//             query = `${query}
//             ${key}                     
//         `

//             Object.keys(filters[key]).map(field => {
//                 query = `${query} ${field} = '${filters[key][field]}'`
//             });
//         });

//         const results = await db.query(query);

//         return results.rows[0]
//     }
// }


// module.exports = {
//     registerForm(req, res) {
//         return res.render("user/register")
//     },

//     // checar se todos os campos dos cadastros estão preenchidos

//     async post(req, res) {
//         // armazena na constantes as chaves (no objeto existe o par chave/valor) que vieram no corpo da requisição
//         const keys = Object.keys(req.body);

//         // faz uma interação em todas as chaves que vieram 
//         for (key of keys) {
//             // se a chave estiver vazia retona uma resposta enviando a msg
//             if (req.body[key] == "") {
//                 return res.send('Preencha todos os campos!');
//             }
//         }
//         // checar se os campos ja existem no banco de dados
//         let { email, cpf_cnpj, password, passwordRepeat } = req.body;

//         cpf_cnp = cpf_cnp.replace(/\D/g, "");

//         const user = await findOne({
//             where: { email },
//             or: { cpf_cnpj }
//         });

//         if (user) return res.send('Usurario já existe');

//         if (password != passwordRepeat)
//             return res.send('Senha não confere');

//         return res.send('Sucesso!');
//     }
// }


// function displayProducts(product) {

//     let productsList = document.getElementById('productsList');

//     let divRowNoGutters = document.createElement('div');
//     divRowNoGutters.className = "row no-gutters";

//     let divColMd4 = document.createElement('div');
//     divColMd4.className = "col-md-4";

//     let divColMd8 = document.createElement('div');
//     divColMd8.className = "col-md-8";

//     let img = document.createElement('img');
//     img.className = "card-img-top mx-auto";
//     img.src = product.url;

//     let divCardBody = document.createElement('div');
//     divCardBody.className = "card-body";

//     let h5 = document.createElement('h5');
//     h5.className = "card-title";
//     h5.innerHTML = product.name;

//     let small = document.createElement('small');
//     small.className = "text-success float-right";
    
//     let i = document.createElement('i');
//     i.className = "fas fa-seedling";
//     i.innerHTML = " Produto Vegano";

//     let pCardText = document.createElement('p');
//     pCardText.className = "card-text text-justify";
//     pCardText.innerHTML = product.description;

//     let pTextMuted = document.createElement('p');
//     pTextMuted.className = "text-muted";
//     pTextMuted.innerHTML = product.price;

//     let divFormInline = document.createElement('div');
//     divFormInline.className = "form-inline";

//     let buttonBtnSuccess = document.createElement('button');
//     buttonBtnSuccess.className = "btn btn-success ml-2";
    
//     let iFas = document.createElement('i');
//     iFas.className = "fas fa-cart-plus";
//     iFas.innerHTML = " Adicionar ao carrinho";

//     h5.appendChild(small);
//     small.appendChild(i);

//     divCardBody.appendChild(h5);

//     divCardBody.appendChild(pCardText);
    
//     divCardBody.appendChild(pTextMuted);

//     divFormInline.appendChild(buttonBtnSuccess);
//     buttonBtnSuccess.appendChild(iFas);

//     divCardBody.appendChild(divFormInline);

//     divColMd8.appendChild(divCardBody);

//     divColMd4.appendChild(img);

//     divRowNoGutters.appendChild(divColMd4);
//     divRowNoGutters.appendChild(divColMd8);

//     productsList.appendChild(divRowNoGutters);
   
// };

// função para padronizar a moeda

function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price / 100);
}

// carinho 

// adicionar um item ao carrinho
// remover um item do carrinho
// deletar todo o item

const Cart = {
    init(oldCart) {
        if (oldCart) {
            this.items = oldCart.items;
            this.total = oldCart.total;
        } else {
            this.items = []
            this.total = {
                quantity: 0,
                price: 0,
                formattedPrice: formatPrice(0)
            }
        }
        return this;
    },
    addOne(product){
        // ver se o produto já existe no carrinho
        let inCard = this.items.find(item => item.product.id == product.id)
    },
    removeOne(productId){},
    delete(productId){}
}

const product = {
    id: 1,
    price: 199,
    quantity: 2
}
