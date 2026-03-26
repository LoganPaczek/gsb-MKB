const API_BASE = process.env.EXPO_PUBLIC_API_URL;

export const login = async (login: string, password: string) => {
  if (!API_BASE) {
    throw new Error("API non configurée.");
  }

  const response = await fetch(`${API_BASE}/visiteur.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ login, password }),
  });

  if (!response.ok) {
    throw new Error("Identifiants incorrects.");
  }

  const text = await response.text().catch(() => '');
  // Certains backends renvoient 200/201 avec un body vide : on considère ça comme un succès.
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Réponse serveur invalide.");
  }
};

export const getVisiteurByLogin = async (login: string) => {
  if (!API_BASE) {
    throw new Error("API non configurée.");
  }

  const response = await fetch(`${API_BASE}/visiteur.php?login=${encodeURIComponent(login)}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error("Impossible de récupérer l'utilisateur.");
  }

  const text = await response.text().catch(() => '');
  if (!text) {
    throw new Error("Réponse serveur vide.");
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Réponse serveur invalide.");
  }
};

