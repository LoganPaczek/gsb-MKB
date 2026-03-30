const API_BASE = process.env.EXPO_PUBLIC_API_URL;


export const addSaisieHebdo = async (date: string, kmHebdo: number, id_visiteur: number, id_vehicule: number) => {
    if (!API_BASE) {
      throw new Error("API non configurée.");
    }
  
    const response = await fetch(`${API_BASE}/saisieHebdo.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date, kmHebdo, id_visiteur, id_vehicule }),
    });
  
    if (!response.ok) {
      throw new Error("Erreur lors de l'ajout de la saisie hebdomadaire.");
    }
  
    const text = await response.text().catch(() => '');
    if (!text) return null;
  
    try {
      return JSON.parse(text);
    } catch {
      throw new Error(`Réponse saisie hebdomadaire invalide: ${text.slice(0, 120)}`);
    }
};

export const getDixSaisieHebdoByVisiteurId = async (id_visiteur: number) => {
  if (!API_BASE) {
    throw new Error("API non configurée.");
  }

  const response = await fetch(`${API_BASE}/saisieHebdo.php?id_visiteur=${id_visiteur}&statistic=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des saisies hebdomadaires.");
  }

  const text = await response.text().catch(() => '');
  if (!text) {
    throw new Error("Réponse saisies hebdomadaires vide.");
  }

  try {
    const parsed = JSON.parse(text);
    if (!Array.isArray(parsed)) return parsed;

    return [...parsed]
      .sort((a, b) => {
        const da = new Date(a?.date ?? a?.dateSaisie ?? 0).getTime();
        const db = new Date(b?.date ?? b?.dateSaisie ?? 0).getTime();
        return db - da;
      })
      .slice(0, 10);
  } catch {
    throw new Error(`Réponse saisies hebdomadaires invalide: ${text.slice(0, 120)}`);
  }
};