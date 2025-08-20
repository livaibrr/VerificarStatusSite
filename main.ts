import fetch from "node-fetch";

// Interface para o resultado
interface SiteStatus {
  site: string;
  status: number | null;
  ok: boolean;
  message?: string;
}

// Função que verifica os sites
async function verificarSites(sites: string[]): Promise<SiteStatus[]> {
  return Promise.all(
    sites.map(async (site) => {
      try {
        const res = await fetch(site);
        return { site, status: res.status, ok: res.ok };
      } catch (e) {
        return {
          site,
          status: null,
          ok: false,
          message: e instanceof Error ? e.message : "Erro desconhecido",
        };
      }
    })
  );
}

// Exemplo de uso
(async () => {
  const sites = ["https://www.google.com", "https://www.github.com", "https://umsitequenaoexiste.com.br"];
  const resultados = await verificarSites(sites);

  resultados.forEach((res) =>
    console.log(`${res.site}: ${res.ok ? `✅ ${res.status}` : `❌ ${res.message}`}`)
  );
})();
