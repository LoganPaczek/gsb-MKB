const API_BASE = process.env.EXPO_PUBLIC_API_URL;

export const addSaisieJour = async (date: string, kmJournee: number, id_visiteur: number, id_vehicule: number) => {
  if (!API_BASE) {
    throw new Error("API non configurée.");
  }

  const response = await fetch(`${API_BASE}/saisieJour.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ date, kmJournee, id_visiteur, id_vehicule }),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de l'ajout de la saisie journalière.");
  }

  const text = await response.text().catch(() => '');
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Réponse saisie invalide: ${text.slice(0, 120)}`);
  }
};

export const getDixSaisieJourByVisiteurId = async (id_visiteur: number) => {
  if (!API_BASE) {
    throw new Error("API non configurée.");
  }

  const response = await fetch(`${API_BASE}/saisieJour.php?id_visiteur=${id_visiteur}&statistic=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des saisies journalières.");
  }

  const text = await response.text().catch(() => '');
  if (!text) {
    throw new Error("Réponse saisies journalières vide.");
  }

  try {
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) ? parsed.slice(0, 10) : parsed;
  } catch {
    throw new Error(`Réponse saisies journalières invalide: ${text.slice(0, 120)}`);
  }
};