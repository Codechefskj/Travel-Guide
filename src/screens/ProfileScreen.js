import React, { useMemo } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlaceCard from '../components/PlaceCard';
import { SectionHeader, EmptyState } from '../components/SectionHeader';
import { StatCard } from '../components/UIComponents';
import { useFavorites } from '../context/FavoritesContext';
import { PLACES } from '../data/places';
import { colors, spacing, font, radius, shadow } from '../theme/theme';

export default function ProfileScreen({ navigation }) {
  const { favoriteIds } = useFavorites();

  const favoritePlaces = useMemo(
    () => PLACES.filter((p) => favoriteIds.includes(p.id)),
    [favoriteIds]
  );

  const stats = useMemo(() => {
    const countries = new Set(favoritePlaces.map((p) => p.location.split(',').pop().trim()));
    const avgRating =
      favoritePlaces.length === 0
        ? 0
        : favoritePlaces.reduce((s, p) => s + p.rating, 0) / favoritePlaces.length;
    return {
      saved: favoritePlaces.length,
      countries: countries.size,
      explored: PLACES.length,
      avgRating: avgRating.toFixed(1),
    };
  }, [favoritePlaces]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <View style={styles.profileCard}>
          <Image source={{ uri: 'https://i.pravatar.cc/150?img=12' }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Sambhav Jha</Text>
            <Text style={styles.email}>explorer@travelguide.app</Text>
          </View>
        </View>

        <SectionHeader title="Travel Statistics" />
        <View style={styles.statRow}>
          <StatCard icon="bookmark" value={stats.saved} label="Saved" tint={colors.coral} />
          <StatCard icon="earth" value={stats.countries} label="Countries" tint={colors.primary} />
        </View>
        <View style={[styles.statRow, { marginTop: spacing.sm }]}>
          <StatCard icon="map" value={stats.explored} label="Explorable" tint={colors.accent} />
          <StatCard icon="star" value={stats.avgRating} label="Avg rating" tint={colors.star} />
        </View>

        <SectionHeader title="Favourite Places" />
        {favoritePlaces.length === 0 ? (
          <EmptyState icon="heart-outline" title="No favourites yet" subtitle="Tap the heart on any place to save it here." />
        ) : (
          favoritePlaces.map((place) => (
            <PlaceCard key={place.id} place={place} onPress={() => navigation.navigate('PlaceDetails', { place })} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow.card,
  },
  avatar: { width: 60, height: 60, borderRadius: radius.pill, marginRight: spacing.lg },
  name: { fontSize: font.h2, fontWeight: '800', color: colors.ink },
  email: { fontSize: font.small, color: colors.muted, marginTop: 2 },
  statRow: { flexDirection: 'row' },
});