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