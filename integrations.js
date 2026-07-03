from pathlib import Path

js_code = r'''#!/usr/bin/env node

/**
 * weather.js
 *
 * Exemplo simples em JavaScript/Node.js consumindo a API pública Open-Meteo.
 * Não precisa de API Key.
 *
 * Como executar:
 *   node weather.js "São Paulo"
 *   node weather.js "Rio de Janeiro"
 *   node weather.js "Mexico City"
 *
 * Requisito: Node.js 18+ ou versão mais recente com fetch global.
 */

const cidade = process.argv.slice(2).join(" ") || "São Paulo";

const WEATHER_CODES = {
  0: "Céu limpo",
  1: "Principalmente limpo",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Neblina",
  48: "Neblina com geada",
  51: "Garoa leve",
  53: "Garoa moderada",
  55: "Garoa intensa",
  61: "Chuva fraca",
  63: "Chuva moderada",
  65: "Chuva forte",
  71: "Neve fraca",
  73: "Neve moderada",
  75: "Neve forte",
  80: "Pancadas de chuva fracas",
  81: "Pancadas de chuva moderadas",
  82: "Pancadas de chuva fortes",
  95: "Tempestade",
  96: "Tempestade com granizo leve",
  99: "Tempestade com granizo forte",
};

async function buscarCoordenadas(nomeCidade) {
  const url = new URL("https://geocoding-api.open-meteo.com/v1/search");

  url.search = new URLSearchParams({
    name: nomeCidade,
    count: "1",
    language: "pt",
    format: "json",
  });

  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error(`Erro ao consultar geocoding: HTTP ${resposta.status}`);
  }

  const dados = await resposta.json();

  if (!dados.results || dados.results.length === 0) {
    throw new Error(`Cidade não encontrada: ${nomeCidade}`);
  }

  return dados.results[0];
}

async function buscarPrevisao({ latitude, longitude, timezone }) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");

  url.search = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    timezone: timezone || "auto",
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
    ].join(","),
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_probability_max",
    ].join(","),
    forecast_days: "3",
  });

  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error(`Erro ao consultar previsão: HTTP ${resposta.status}`);
  }

  return resposta.json();
}

function imprimirPrevisao(local, previsao) {
  const atual = previsao.current;
  const daily = previsao.daily;
  const descricao = WEATHER_CODES[atual.weather_code] || "Condição desconhecida";

  console.log(`\nPrevisão do tempo para ${local.name}, ${local.country}`);
  console.log("-".repeat(50));
  console.log(`Agora: ${descricao}`);
  console.log(`Temperatura: ${atual.temperature_2m}°C`);
  console.log(`Sensação térmica: ${atual.apparent_temperature}°C`);
  console.log(`Umidade: ${atual.relative_humidity_2m}%`);
  console.log(`Vento: ${atual.wind_speed_10m} km/h`);
  console.log(`Precipitação agora: ${atual.precipitation} mm`);

  console.log("\nPróximos 3 dias:");
  for (let i = 0; i < daily.time.length; i++) {
    console.log(
      `${daily.time[i]} | Min: ${daily.temperature_2m_min[i]}°C | Max: ${daily.temperature_2m_max[i]}°C | Chance chuva: ${daily.precipitation_probability_max[i]}%`
    );
  }

  console.log("");
}

async function main() {
  try {
    const local = await buscarCoordenadas(cidade);
    const previsao = await buscarPrevisao(local);
    imprimirPrevisao(local, previsao);
  } catch (erro) {
    console.error("Erro:", erro.message);
    process.exit(1);
  }
}

main();
'''

path = Path("/mnt/data/weather.js")
path.write_text(js_code, encoding="utf-8")
print(f"Arquivo criado: {path}")
