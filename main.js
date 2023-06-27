const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji festejando"/>'
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji triste"/>'
const atividades = []; // precisamos das arrays para calcular a média final, porque são valores separados em cada registro
const notas = []; // definindo as constantes, notas e nomes de atividades são arrays. Começam como arrays vazios
const spanAprovado = "<span class='resultado aprovado'>Aprovado!</span></td>"
const spanReprovado = "<span class='resultado reprovado'>Reprovado!</span></td>"
const notaMinima = parseFloat(prompt('Digitea nota mínima: '));

let linhas = ''; // as linhas da tabela começam em branco

form.addEventListener('submit', function(e){ // essa função de evento chama todas as funções abaixo, de não dar refresh, adicionoar linha,atualizar a tabela e atualizar a media com a conta
    e.preventDefault();
    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
})

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if (atividades.includes(inputNomeAtividade.value)) {
        alert (`A atividade: ${inputNomeAtividade.value} já foi inserida`);
    } else{
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));
    
        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;
        linha += '</tr>';
    
        linhas += linha;
    }

    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizaTabela(){
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function calculaMediaFinal() {
    let somaDasNotas = 0;

    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }
    return somaDasNotas / notas.length;
}

function atualizaMediaFinal () {
    const mediaFinal = calculaMediaFinal();
    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}