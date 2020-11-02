const URL = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/users'
    : 'https://api-lifit.herokuapp.com/users';

// CRUD é uma sigla para definir verbos que são usadas nas aplicações.
// cada letra significa um verbo, C para Create (criar),
// R para Read (ler),
// U para Updade (atualizar),
// D para Delete (apagar), entretando os verbos CRUDs usados na internet (requisições http) são
// POST para criar,
// GET para ler,
// PUT/PATCH para atualuzar e
// DELETE para apagar
// mais informações em https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Methods

// GET para trazer as informações da url para o frontend.

// const URL = 'http://localhost:8080/users';

async function getAll() {
    const res = await fetch(URL);
    const data = await res.json();
    imprimeRetorno(data[0]);
    console.log(data);
}

function imprimeRetorno(valor) {
    document.getElementById('resultado').innerText = Object.values(valor)
    setTimeout(() => {
        document.getElementById('resultado').innerText = ''
    }, 2000);
}

// POST para enviar os dados para o backend e posteriormente salvas no banco de dados

async function createOne() {
    
    const res = await fetch(URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();
    console.log(data);
}

// PUT 

async function putOne(user) {

    const res = await fetch(`${URL}/${user.id}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    const data = await res.json();
    console.log(data);
}


