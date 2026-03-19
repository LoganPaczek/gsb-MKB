import { Stack, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CarIcon, BracketIcon } from '@/components/ui/icons';
import { clearAuth } from '@/storage/authStorage';

/**
 * Layout du groupe (main) : bandeau perso (View) au-dessus de toutes les pages du groupe.
 * Le header natif du Stack est désactivé pour éviter la double barre.
 */
export default function MainLayout() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  async function onLogout() {
    await clearAuth();
    router.replace('/');
  }

  return (
    <View style={styles.root}>
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                <View style={styles.headerIconContainer}>
                    <CarIcon fill="white"/>
                </View>
                <Text style={styles.headerTitle}>Mes Kilos Boulots</Text>
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
});
