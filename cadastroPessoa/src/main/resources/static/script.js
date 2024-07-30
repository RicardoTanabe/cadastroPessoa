document.addEventListener('DOMContentLoaded', function() {
    const formPessoa = document.getElementById('formPessoa');
    const listaPessoas = document.getElementById('listaPessoas');

    const apiUrl = '/api/pessoas';

    formPessoa.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const idade = document.getElementById('idade').value;
        const errorDiv = document.getElementById('error');

        if (nome.trim() === '' || idade.trim() === '') {
            errorDiv.textContent = 'Por favor, preencha todos os campos.';
            errorDiv.style.display = 'block';
            return;
        }

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, idade })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(error => {
                    throw new Error(error.message || 'Erro desconhecido');
                });
            }
        })
        .then(data => {
            alert('Pessoa cadastrada com sucesso!');
            adicionarPessoaNaLista(data);
        })
        .catch(error => {
            alert('Erro ao cadastrar pessoa: ' + error.message);
        });

        formPessoa.reset();
    });

    function adicionarPessoaNaLista(pessoa) {
        const li = document.createElement('li');
        li.textContent = `${pessoa.nome} - ${pessoa.idade} anos`;
        listaPessoas.appendChild(li);
    }

    function carregarPessoas() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                data.forEach(pessoa => {
                    adicionarPessoaNaLista(pessoa);
                });
            });
    }

    carregarPessoas();
});