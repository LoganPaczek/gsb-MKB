import { StyleSheet, Text, View } from 'react-native';
import { CalendarIcon } from './icons';

export default function HistoryItem({ kmJournee, dateSaisie }: { kmJournee: number, dateSaisie: string }) {

  return (
    <View style={styles.historyItem}>
        <CalendarIcon fill="#4F39F6"/>
        <View style={styles.historyItemText}>
        <Text style={styles.historyItemTextValue}>{kmJournee} Km</Text>
        <Text style={styles.historyItemTextDate}>{new Date(dateSaisie).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long' })}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  historyItemText: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  historyItemTextValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyItemTextDate: {
    fontSize: 14,
    color: '#62748E',
  },
});