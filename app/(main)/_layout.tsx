import { Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CarIcon, BracketIcon } from '@/components/ui/icons';
import { clearAuth, loadAuth } from '@/storage/authStorage';

/**
 * Layout du groupe (main) : bandeau perso (View) au-dessus de toutes les pages du groupe.
 * Le header natif du Stack est désactivé pour éviter la double barre.
 */
export default function MainLayout() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [storedLogin, setStoredLogin] = useState<string>('');

  async function onLogout() {
    await clearAuth();
    router.replace('/');
  }

  useEffect(() => {
    let cancelled = false;
    loadAuth()
      .then((auth) => {
        if (cancelled) return;
        setStoredLogin(auth?.login ?? '');
      })
      .catch(() => {
        // Si le stockage local plante en dev, on garde l'UI affichée.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <View style={styles.root}>
        <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
            <View style={styles.headerLeft}>
                <View style={styles.headerIconContainer}>
                    <CarIcon fill="white"/>
                </View>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Mes Kilos Boulots</Text>
                    <Text style={styles.headerSubtitle}>
                      {storedLogin ? `Connecté: ${storedLogin}` : 'Connecté'}
                    </Text>
                </View>
            </View>
            <Pressable onPress={onLogout} hitSlop={8}>
                <BracketIcon fill="grey"/>
            </Pressable>
        </View>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="dashboard" />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#4F39F6',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTitleContainer: {
    flexDirection: 'column',
    gap: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#62748E',
  },
});
