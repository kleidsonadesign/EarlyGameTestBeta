let treinoAtivo = false;
let tempoInicio;
let numCliques = 0;
let somaTempos = 0;

function iniciarTreino() {
    const menu = document.getElementById('menu');
    menu.style.display = 'none';

    treinoAtivo = true;
    criarBola();
}

function iniciarTeste() {
    // Adicione o código necessário para o teste de monitor, se necessário
}

function definirCor(tempo) {
    if (tempo > 650) {
        return 'red';
    } else if (tempo >= 480 && tempo <= 650) {
        return 'yellow';
    } else {
        return 'green';
    }
}

function criarBola() {
    const bola = document.createElement('div');
    bola.classList.add('bola');
    document.body.appendChild(bola);

    const tempoResposta = document.createElement('div');
    tempoResposta.id = 'tempoResposta';
    document.body.appendChild(tempoResposta);

    bola.onclick = function () {
        const minX = -150;
        const minY = -150;
        const maxX = 300;
        const maxY = 300;

        const randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        const randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

        bola.style.left = `calc(50% + ${randomX}px)`;
        bola.style.top = `calc(50% + ${randomY}px)`;

        if (treinoAtivo) {
            const tempoFim = new Date().getTime();
            const tempoRespostaValor = tempoFim - tempoInicio;
            const cor = definirCor(tempoRespostaValor);

            tempoResposta.style.color = cor;
            tempoResposta.innerText = `Tempo de resposta: ${tempoRespostaValor}ms`;

            numCliques++;
            somaTempos += tempoRespostaValor;

            if (numCliques === 25) {
                const media = somaTempos / numCliques;
                alert(`Média do tempo de resposta após 25 cliques: ${media.toFixed(2)}ms`);
                treinoAtivo = false;
                resetarTreino();
            }

            tempoInicio = tempoFim; // Atualiza o tempo de início para o próximo clique
        }
    };
}

function resetarTreino() {
    const menu = document.getElementById('menu');
    menu.style.display = 'block';

    const bola = document.querySelector('.bola');
    if (bola) {
        document.body.removeChild(bola);
    }

    const tempoResposta = document.getElementById('tempoResposta');
    if (tempoResposta) {
        document.body.removeChild(tempoResposta);
    }

    numCliques = 0;
    somaTempos = 0;
}
