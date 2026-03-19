# Projet React Native minimal

Ce projet a ete nettoye pour avoir une base presque vierge.

## Ce que contient maintenant le projet

- Une seule page: `app/index.tsx`
- Un seul texte affiche au centre: **Hello world**
- Style du texte en rouge
- Un layout simple avec `expo-router`: `app/_layout.tsx`

## Lancer le projet

1. Installer les dependances:

```bash
npm install
```

2. Demarrer l'application:

```bash
npm run start
```

Puis ouvre l'app dans Expo Go, emulateur Android, simulateur iOS ou web.

## Mini doc React Native

### 1) Composants

En React Native, tu construis l'UI avec des composants:

- `View`: bloc/conteneur (comme une `div` en web)
- `Text`: afficher du texte
- `Image`: afficher une image
- `Pressable` / `TouchableOpacity`: elements cliquables

Un composant est une fonction qui retourne du JSX:

```tsx
import { Text, View } from 'react-native';

export default function Exemple() {
  return (
    <View>
      <Text>Salut</Text>
    </View>
  );
}
```

### 2) Styles

Les styles se font en JavaScript avec `StyleSheet.create`.
Tu n'utilises pas du CSS classique.

Exemple:

```tsx
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'red',
    fontSize: 32,
    fontWeight: '700',
  },
});
```

Puis tu appliques le style:

```tsx
<View style={styles.container}>
  <Text style={styles.title}>Hello world</Text>
</View>
```

### 3) Mise en page avec Flexbox

React Native utilise Flexbox par defaut:

- `flex: 1`: prend toute la place disponible
- `flexDirection`: `column` (defaut) ou `row`
- `justifyContent`: aligne sur l'axe principal
- `alignItems`: aligne sur l'axe secondaire

### 4) Logique React

Tu retrouves les bases de React:

- `useState` pour l'etat local
- `useEffect` pour les effets secondaires
- Props pour passer des donnees entre composants

### 5) Navigation (plus tard)

Ici tu as une seule page pour debuter.
Quand tu voudras plusieurs ecrans, tu pourras ajouter des routes dans le dossier `app/` (avec `expo-router`).
