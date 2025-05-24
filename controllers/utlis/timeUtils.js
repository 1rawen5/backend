// Vérifie si l'heure actuelle est entre 22h et 6h
function isWithinServiceHours() {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 22 || hour < 6;
}

module.exports = { isWithinServiceHours };
