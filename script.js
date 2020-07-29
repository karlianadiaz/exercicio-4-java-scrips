function Pessoa(nome, idade, cor) {
    this.nome = nome
    this.idade = idade
    this.cor = cor
}

function verificaMaisVelho(pessoas) {
    let maiorIdade;  // undefined
    let pessoaMaisVelha;

    for (let pessoa of pessoas) {
        if (typeof maiorIdade == 'undefined') {
            maiorIdade = pessoa.idade
            pessoaMaisVelha = pessoa
        } else {
            if (pessoa.idade > maiorIdade) {
                maiorIdade = pessoa.idade
                pessoaMaisVelha = pessoa
            }
        }
    }

    return pessoaMaisVelha
}

function checaCoresFavoritas(pessoas) {

    //{ nome, idade, cor }
    let cores = {};
    
    for (let pessoa of pessoas) {
         // olha se já existe registro para a cor
        if (typeof cores[pessoa.cor] === 'undefined') {
            // verde
            cores[pessoa.cor] = [ pessoa ]
        } else {
            cores[pessoa.cor].push(pessoa)
        }
    }

    return cores;
}

function listaRegistros(registros) {
    // for (let registro of registros) {

    // }
    let intro = document.createElement('div');
    intro.innerHTML += '<p>Esses são os registros que foram feitos:</p>'
    let lista = document.createElement('ul')

    registros.forEach( registro => {
        let item = document.createElement('li')
        item.textContent = `${registro.nome} possui ${registro.idade} anos`
        lista.appendChild(item)
    } )

    intro.appendChild(lista)

    adicionaResultado(intro)
}



document.querySelector('form').addEventListener('submit', (e) => {
    registraPessoa(e)
    limpaResultados()
    listaRegistros(registros)
    
    let maisVelho = verificaMaisVelho(registros)
    let resIdade = document.createElement('p')
    resIdade.textContent = `A pessoa mais velha é ${maisVelho.nome} com ${maisVelho.idade} anos`
    adicionaResultado(resIdade)


    let coresFavoritas = checaCoresFavoritas(registros)
    Object.keys(coresFavoritas).forEach(cor => {
        let introCor = document.createElement('p')
        introCor.textContent = `Pessoas que gostam de ${cor}: `
        adicionaResultado(introCor)
        // { nome, idade, cor }
        let listaCor = document.createElement('ul')
        coresFavoritas[cor].forEach( pessoa => {
            let nome = document.createElement('li')
            nome.textContent = pessoa.nome
            listaCor.appendChild(nome)
        })
        adicionaResultado(listaCor)
    })
})


let registros = []

function registraPessoa(event) {
    event.preventDefault()

    let form = event.target
    let dados = new FormData(form)

    let nome = dados.get('nome')
    let idade = Number(dados.get('idade'))
    let corFavorita = dados.get('cor')

    form.querySelectorAll('input[type=text]').forEach( campo => campo.value = '')

    let registro = new Pessoa(nome, idade, corFavorita)

    registros.push(registro)

}

function limpaResultados() {
    document.querySelector('#resultados').innerHTML = ''
}

function adicionaResultado(elemento) {
    document.querySelector('#resultados').appendChild(elemento)
}