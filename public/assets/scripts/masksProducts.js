// máscara que converte o valor em no campo price do tipo text em dinheiro 

const moneyMask = document.querySelector('input[name="price"]');
moneyMask.addEventListener("keydown", function (e) {

    setTimeout(function () {
        let value = e.target.value;

        value = value.replace(/\D/g, "");

        value = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value / 100);

        e.target.value = value;
    }, 1);
});

// dentro do replace é passado o parametro de expressões regulares que irá substituir, 
// nesse caso tudo o que não for número será substituido por um campo vazio "".
// O construtor formata para o R$ padrão internacional.
