const key = '63bd84f73c0b0036ac56402d126fccdb';

navigator.geolocation.getCurrentPosition(obterLocalizacao, erroLocalizacao);

document.addEventListener("DOMContentLoaded", () => {
    const botao = document.getElementById("button-search");
    const input = document.querySelector(".input-city");

    if (botao && input) {
        botao.addEventListener("click", () => {
            const cidade = input.value.trim();
            if (cidade) buscarCidade(cidade);
            else exibirErro("Por favor, digite o nome de uma cidade.");
        });
    }
});

async function obterLocalizacao(posicao) {
    const { latitude, longitude } = posicao.coords;
    try {
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&lang=pt_br&units=metric`);
        const dados = await resposta.json();
        exibirDados(dados);
    } catch (erro) {
        exibirErro("Erro ao obter previsão pela localização.");
    }
}

async function buscarCidade(cidade) {
    try {
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`);
        const dados = await resposta.json();

        if (dados.cod !== 200) {
            exibirErro("Cidade não encontrada.");
        } else {
            exibirDados(dados);
        }
    } catch (erro) {
        exibirErro("Erro ao buscar a cidade.");
    }
}

function exibirDados(dados) {
    document.querySelector(".city").innerHTML = "Tempo em " + dados.name;
    document.querySelector(".temp").innerHTML = Math.round(dados.main.temp) + "°C";
    document.querySelector(".weather-text").innerHTML = dados.weather[0].description;
    document.querySelector(".humidity").innerHTML = "Umidade: " + dados.main.humidity + "%";
    document.querySelector(".weather-image").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
}

function exibirErro(mensagem) {
    document.querySelector(".city").innerHTML = mensagem;
    document.querySelector(".temp").innerHTML = "";
    document.querySelector(".weather-text").innerHTML = "";
    document.querySelector(".humidity").innerHTML = "";
    document.querySelector(".weather-image").src = "";
}

function erroLocalizacao(erro) {
    if (erro.code === 1) {
        exibirErro("Permissão de localização negada pelo usuário.");
    }
}
