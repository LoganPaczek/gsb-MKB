import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ClockRotateIcon } from '@/components/ui/icons';
import HistoryItem from '../ui/historyItem';

export default function History({ saisiesJournalieres }: { saisiesJournalieres: any[] }) {
  const [range, setRange] = useState<'7j' | '30j' | 'tout'>('tout');

  const filteredSaisies = useMemo(() => {
    if (range === 'tout') return saisiesJournalieres;

    const now = new Date();
    const days = range === '7j' ? 7 : 30;

    return saisiesJournalieres.filter((item) => {
      const rawDate = item?.date ?? item?.dateSaisie;
      if (!rawDate) return false;

      const d = new Date(rawDate);
      if (Number.isNaN(d.getTime())) return false;

      const diffMs = now.getTime() - d.getTime();
      return diffMs >= 0 && diffMs <= days * 24 * 60 * 60 * 1000;
    });
  }, [range, saisiesJournalieres]);

  return (
    <View style={styles.historyContainer}>
      <View style={styles.historyHeader}>
        <ClockRotateIcon />
        <Text style={styles.historyHeaderText}>Historique récent</Text>
      </View>
      <View style={styles.filterRow}>
        <Pressable
          style={range === '7j' ? styles.filterChipActive : styles.filterChip}
          onPress={() => setRange('7j')}
        >
          <Text style={range === '7j' ? styles.filterTextActive : styles.filterText}>7 jours</Text>
        </Pressable>
        <Pressable
          style={range === '30j' ? styles.filterChipActive : styles.filterChip}
          onPress={() => setRange('30j')}
        >
          <Text style={range === '30j' ? styles.filterTextActive : styles.filterText}>30 jours</Text>
        </Pressable>
        <Pressable
          style={range === 'tout' ? styles.filterChipActive : styles.filterChip}
          onPress={() => setRange('tout')}
        >
          <Text style={range === 'tout' ? styles.filterTextActive : styles.filterText}>Tout</Text>
        </Pressable>
      </View>
      <ScrollView
        style={styles.historyContent}
        contentContainerStyle={styles.historyContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredSaisies.length === 0 ? (
          <Text>Aucune saisie pour le moment</Text>
        ) : (
          filteredSaisies.map((saisieJournaliere) => (
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
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    borderRadius: 999,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  filterChipActive: {
    borderRadius: 999,
    backgroundColor: '#4F39F6',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  filterText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
  },
  filterTextActive: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  historyContent: {
    maxHeight: 200,
  },
  historyContentContainer: {
    gap: 10,
  },
});