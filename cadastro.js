const flores = JSON.parse(localStorage.getItem('flores')) || [];

class Flor {
    constructor(nomeComum, nomeCientifico, cor, tamanho, preco, imagemUrl) {
        this.nomeComum = nomeComum;
        this.nomeCientifico = nomeCientifico;
        this.cor = cor;
        this.tamanho = tamanho;
        this.preco = preco;
        this.imagemUrl = imagemUrl;
    }
}

const nomeComumInput = document.getElementById('nomeComum');
const nomeCientificoInput = document.getElementById('nomeCientifico');
const corInput = document.getElementById('cor');
const tamanhoInput = document.getElementById('tamanho');
const precoInput = document.getElementById('preco');
const imagemUrlInput = document.getElementById('imagemUrl');

const btnSave = document.getElementById("btn-save");
const btnList = document.getElementById("btn-list");
const containerList = document.getElementById("container-flores");
const ulListFlores = document.getElementById("floresCadastradas");

btnSave.addEventListener("click", () => {
    if (!nomeComumInput.value || !corInput.value || !tamanhoInput.value || !precoInput.value) {
        alert("Por favor, preencha todos os campos obrigatórios (Nome Comum, Cor, Tamanho, Preço).");
        return;
    }

    if (isNaN(parseFloat(precoInput.value))) {
        alert("Por favor, insira um preço válido.");
        return;
    }

    const flor = new Flor(
        nomeComumInput.value,
        nomeCientificoInput.value,
        corInput.value,
        tamanhoInput.value,
        parseFloat(precoInput.value),
        imagemUrlInput.value
    );

    flores.push(flor);
    localStorage.setItem('flores', JSON.stringify(flores));
    alert("Flor cadastrada com sucesso!");
    limparFormulario();
    listCadastros();
});

btnList.addEventListener("click", listCadastros);

function listCadastros() {
    ulListFlores.innerHTML = '';
    containerList.style.display = "block";

    if (flores.length === 0) {
        ulListFlores.innerHTML = '<li>Nenhuma flor cadastrada ainda.</li>';
        return;
    }

    flores.forEach((flor, index) => {
        createListItem(index, flor);
    });
}

function createListItem(index, flor) {
    const listItem = document.createElement("li");
    listItem.classList.add("flor-card");
    listItem.dataset.index = index;

    const nomeComumElement = document.createElement("h3");
    nomeComumElement.textContent = flor.nomeComum;

    const divInformacoes = document.createElement("div");
    divInformacoes.classList.add("flor-info");

    if (flor.imagemUrl) {
        const imagemElement = document.createElement("img");
        imagemElement.src = flor.imagemUrl;
        imagemElement.alt = `Imagem de ${flor.nomeComum}`;
        imagemElement.classList.add("flor-imagem");
        imagemElement.onerror = function () {
            this.src = `https://placehold.co/150x150/cccccc/ffffff?text=Sem+Imagem`;
        };
        listItem.appendChild(imagemElement);
    }

    const nomeCientificoElement = document.createElement("p");
    nomeCientificoElement.textContent = `Nome Científico: ${flor.nomeCientifico}`;

    const corElement = document.createElement("p");
    corElement.textContent = `Cor: ${flor.cor}`;

    const tamanhoElement = document.createElement("p");
    tamanhoElement.textContent = `Tamanho: ${flor.tamanho}`;

    const precoElement = document.createElement("p");
    precoElement.textContent = `Preço: R$ ${flor.preco.toFixed(2)}`;

    const btnEdit = document.createElement("button");
    btnEdit.textContent = 'Editar';
    btnEdit.classList.add('btn-edit');
    btnEdit.addEventListener("click", () => {
        const florParaEditar = flores[index];
        nomeComumInput.value = florParaEditar.nomeComum;
        nomeCientificoInput.value = florParaEditar.nomeCientifico;
        corInput.value = florParaEditar.cor;
        tamanhoInput.value = florParaEditar.tamanho;
        precoInput.value = florParaEditar.preco;
        imagemUrlInput.value = florParaEditar.imagemUrl;

        flores.splice(index, 1);
        localStorage.setItem('flores', JSON.stringify(flores));
        listCadastros();
    });

    const btnDelete = document.createElement("button");
    btnDelete.textContent = 'Deletar';
    btnDelete.classList.add('btn-delete');
    btnDelete.addEventListener("click", () => {
        if (confirm(`Tem certeza que deseja deletar a flor ${flor.nomeComum}?`)) {
            flores.splice(index, 1);
            localStorage.setItem('flores', JSON.stringify(flores));
            listCadastros();
        }
    });

    divInformacoes.appendChild(nomeCientificoElement);
    divInformacoes.appendChild(corElement);
    divInformacoes.appendChild(tamanhoElement);
    divInformacoes.appendChild(precoElement);

    listItem.appendChild(nomeComumElement);
    listItem.appendChild(divInformacoes);
    listItem.appendChild(btnEdit);
    listItem.appendChild(btnDelete);

    ulListFlores.appendChild(listItem);
}

function limparFormulario() {
    nomeComumInput.value = "";
    nomeCientificoInput.value = "";
    corInput.value = "";
    tamanhoInput.value = "";
    precoInput.value = "";
    imagemUrlInput.value = "";
}