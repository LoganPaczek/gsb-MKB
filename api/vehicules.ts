const API_BASE = process.env.EXPO_PUBLIC_API_URL;

export const getVehiculeByVisiteurId = async (visiteurLogin: string) => {
  if (!API_BASE) {
    throw new Error("API non configurée.");
  }

  const response = await fetch(`${API_BASE}/vehicule.php?login=${visiteurLogin}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la récupération du véhicule.");
  }

  const result = await response.text().catch(() => '');
  return JSON.parse(result);
};

