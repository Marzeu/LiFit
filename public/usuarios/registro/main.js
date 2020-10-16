//mascara para cpf e cnpj

const cpfCnpjMask = document.querySelector('input[name="cpf_cnpj"]');
cpfCnpjMask.addEventListener("keydown", function (e) {

    setTimeout(function () {
        let value = e.target.value;

        value = value.replace(/\D/g, ""); //limpar campos

        if (value.length > 14)
            value = value.slice(0, -1);

        //conferir se é um cpnj (tipicamente 11.222.333/0004-55)
        if (value.length > 11) {
            // o cnpj irá entrar dessa forma 11222333444455
            value = value.replace(/(\d{2})(\d)/, "$1.$2");
            // o valor do cnpj será substituido pelo replace e será da seguinte forma: 11.222333444455
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            // aplicando a mesma ideia novamente, mas para os três primeiros digitos "d" em sequencia representado por "d{3}"
            // o resultado será 11.222.333444455
            value = value.replace(/(\d{3})(\d)/, "$1/$2");
            // o resultado será 11.222.333/444455
            value = value.replace(/(\d{4})(\d)/, "$1-$2");
            // o resultado será 11.222.333/4444-55     
            e.target.value = value;

        } else {
            // cpf 111.222.333-55
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            value = value.replace(/(\d{3})(\d)/, "$1-$2");
            e.target.value = value;
        }
    }, 1);
});

// máscara para o cep
const cepMask = document.querySelector('input[name="cep"]');
cepMask.addEventListener("keydown", function (e) {

    setTimeout(function () {
        let value = e.target.value;

        value = value.replace(/\D/g, "");

        if (value.length > 8)
            value = value.slice(0, -1);

        value = value.replace(/(\d{5})(\d)/, "$1-$2");
        e.target.value = value;
    }, 1);
});

// validação do email pelo frontend
const Validade = {
    apply(input, func) {
        Validade.clearErrors(input);

        let results = Validade[func](input.value);
        input.value = results.value;

        if (results.error)
            Validade.displayError(input, results.error);

    },
    displayError(input, error) {
        const div = document.createElement('div');
        div.classList.add('error');
        div.innerHTML = error;
        input.parentNode.appendChild(div);
        input.focus();
    },
    clearErrors(input) {
        const errorDiv = input.parentNode.querySelector(".error")
        if (errorDiv)
            errorDiv.remove();
    },
    isEmail(value) {
        let error = null

        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!value.match(mailFormat))
            error = "Email inválido";

        return {
            error,
            value,
        };
    },
    isCpfCnpj(value) {
        let error = null;

        const cleanValues = value.replace(/\D/g, "");

        if (cleanValues.length > 11 && cleanValues.length !== 14) {
            error = "CNPJ incorreto";
        }
        else if (cleanValues.length < 12 && cleanValues.length !== 11) {
            error = "CPF incorreto";
        }

        return {
            error,
            value
        };
    },
    isCep(value) {
        let error = null;

        const cleanValues = value.replace(/\D/g, "");

        if (cleanValues.length !== 8) {
            error = "CEP incorreto";
        };

        return {
            error,
            value
        };

    }
}