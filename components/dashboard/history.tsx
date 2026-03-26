import { StyleSheet, Text, View } from 'react-native';
import { ClockRotateIcon } from '@/components/ui/icons';
import HistoryItem from '../ui/historyItem';

export default function History() {

  return (
    <View style={styles.historyContainer}>
      <View style={styles.historyHeader}>
        <ClockRotateIcon />
        <Text style={styles.historyHeaderText}>Historique récent</Text>
      </View>
      <View style={styles.historyContent}>
        {/* <Text>Aucune saisie pour le moment</Text> */}
        <HistoryItem />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  historyContainer: {
    width: '90%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    padding: 10,
    gap: 10,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  historyHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyContent: {
    flexDirection: 'column',
    gap: 10,
  },
});