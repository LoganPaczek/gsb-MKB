import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ClockRotateIcon } from '@/components/ui/icons';
import HistoryItem from '../ui/historyItem';

export default function History({ saisiesJournalieres }: { saisiesJournalieres: any[] }) {

  console.log(saisiesJournalieres);
  return (
    <View style={styles.historyContainer}>
      <View style={styles.historyHeader}>
        <ClockRotateIcon />
        <Text style={styles.historyHeaderText}>Historique récent</Text>
      </View>
      <ScrollView
        style={styles.historyContent}
        contentContainerStyle={styles.historyContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {saisiesJournalieres.length === 0 ? (
          <Text>Aucune saisie pour le moment</Text>
        ) : (
          saisiesJournalieres.map((saisieJournaliere) => (
            <HistoryItem
              key={saisieJournaliere.id}
              kmJournee={saisieJournaliere.kmJournee}
              dateSaisie={saisieJournaliere.date}
            />
          ))
        )}
      </ScrollView>
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
    maxHeight: 200,
  },
  historyContentContainer: {
    gap: 10,
  },
});