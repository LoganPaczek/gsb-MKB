import { StyleSheet, Text, View } from 'react-native';
import { CarIcon } from '@/components/ui/icons';

type Vehicule = {
    marque?: string;
    modele?: string;
    immatriculation?: string;
  };
  type VehiculeCardProps = {
    vehicule: Vehicule | null;
    loading?: boolean;
    totalKmWithVehicule: number;
  };

export default function VehiculeCard({ vehicule, loading, totalKmWithVehicule }: VehiculeCardProps) {

  return (
    <View style={styles.vehicleContainer}>
        <View style={styles.vehicleHeader}>
            <View style={styles.vehicleTitleContainer}>
            <Text style={styles.vehicleHeaderTitle}>
                Véhicule Actuel
            </Text>
            </View>
            <CarIcon fill="#E0E7FF"/>
        </View>

        <View style={styles.vehicleInfoContainer}>
            <Text style={styles.vehicleModel}>
              {vehicule?.marque ?? 'Non renseigné'}
            </Text>
            <Text style={styles.vehicleBrand}>
              {vehicule?.modele ?? 'Non renseigné'}
            </Text>
        </View>

        <View style={styles.vehicleInfoRow}>
            <View style={styles.vehicleInfoPlateContainer}>
            <Text style={styles.vehicleInfoPlate}>
                {vehicule?.immatriculation ?? 'Non renseigné'}
            </Text>
            </View>
            <View style={styles.vehicleInfoTotalContainer}>
            <Text style={styles.vehicleInfoTotal}>
                Total
            </Text>
            <Text style={styles.vehicleInfoTotalValue}>
                {totalKmWithVehicule} km
            </Text>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  vehicleContainer: {
    width: '90%',
    backgroundColor: '#4F39F6',
    borderRadius: 15,
    padding: 16,
    gap: 10,
  },

  // Header
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vehicleTitleContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 25,
    backgroundColor: '#62748E',
  },
  vehicleHeaderTitle: {
    fontSize: 12,
    fontWeight: 'semibold',
    color: 'white',
  },

  // Info
  vehicleInfoContainer: {
    flexDirection: 'column',
    gap: 2,
  },
  vehicleModel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "white",
  },
  vehicleBrand: {
    fontSize: 14,
    color: '#E0E7FF',
  },

  // Info Row
  vehicleInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vehicleInfoPlateContainer: {
    backgroundColor: '#4F1EBE',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  vehicleInfoPlate: {
    fontSize: 14,
    color: "white",
  },
  vehicleInfoTotalContainer: {
    alignItems: 'flex-end',
  },
  vehicleInfoTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "white",
  },
  vehicleInfoTotalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "white",
  },
});