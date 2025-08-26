const fetch = require('node-fetch'); 

async function verificarSites(sites) {
  const promessas = sites.map(site =>
    fetch(site).then(res => ({ site, status: res.status }))
  );
  const resultados = await Promise.all(promessas);

  console.log("Status dos Sites:");
  resultados.forEach(res => {
    console.log(`${res.site}: Status ${res.status}`);
  });
}

const sites = ["https://www.google.com", "https://www.github.com", "https://umsitequenaoexiste.com.br"];
verificarSites(sites);
