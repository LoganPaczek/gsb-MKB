const API_BASE = process.env.EXPO_PUBLIC_API_URL;

export const getVehiculeByVisiteurId = async (visiteurId: number) => {
  if (!API_BASE) {
    throw new Error("API non configurée.");
  }

  const response = await fetch(`${API_BASE}/vehicule.php?visiteur_id=${visiteurId}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération du véhicule.");
  }

  const result = await response.text().catch(() => '');
  return JSON.parse(result);
};

