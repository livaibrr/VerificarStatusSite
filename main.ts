// Tipagem
interface SiteStatus {
  site: string;
  status: number | null; 
}

// Função 
async function verificarSites(sites: string[]): Promise<SiteStatus[]> {
  const promessas = sites.map(async (site) => {
    try {
      const res = await fetch(site);
      return { site, status: res.status };
    } catch {
      return { site, status: null }; 
    }
  });

  return Promise.all(promessas);
}

// Exemplo 
const sites = ["https://www.google.com", "https://www.github.com", "https://umsitequenaoexiste.com.br"];
verificarSites(sites).then(resultados => {
  console.log("Status dos Sites:");
  resultados.forEach(res => {
    console.log(`${res.site}: ${res.status !== null ? res.status : "Erro"}`);
  });
});
