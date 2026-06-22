import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import PlaceCard from '../components/PlaceCard';
import { SectionHeader, EmptyState } from '../components/SectionHeader';
import { CategoryChips } from '../components/UIComponents';
import { PLACES, CATEGORIES } from '../data/places';
import { colors, spacing, font } from '../theme/theme';

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const popular = useMemo(() => PLACES.filter((p) => p.popular), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PLACES.filter((p) => {
      const matchesCategory = category === 'All' || p.category === category;
      const matchesQuery =
        q === '' || p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const openDetails = (place) => navigation.navigate('PlaceDetails', { place });

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.eyebrow}>EXPLORE THE WORLD</Text>
        <Text style={styles.heroTitle}>Where to{'\n'}next, traveller?</Text>

        <View style={{ marginTop: spacing.lg }}>
          <SearchBar value={query} onChangeText={setQuery} />
        </View>

        <CategoryChips categories={CATEGORIES} selected={category} onSelect={setCategory} />

        {query.trim() === '' && category === 'All' && (
          <>
            <SectionHeader title="Popular Destinations" />
            <FlatList
              data={popular}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <PlaceCard place={item} variant="compact" onPress={() => openDetails(item)} />
              )}
            />
          </>
        )}

        <SectionHeader
          title={query.trim() || category !== 'All' ? 'Results' : 'Recommended for you'}
          actionLabel="See all"
          onAction={() => navigation.navigate('Places')}
        />

        {filtered.length === 0 ? (
          <EmptyState icon="search-outline" title="No places found" subtitle="Try a different name, city or category." />
        ) : (
          filtered.map((place) => <PlaceCard key={place.id} place={place} onPress={() => openDetails(place)} />)
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl },
  eyebrow: { marginTop: spacing.md, fontSize: font.tiny, letterSpacing: 2, fontWeight: '800', color: colors.primary },
  heroTitle: { fontSize: font.h1 + 6, fontWeight: '800', color: colors.ink, lineHeight: 38, marginTop: spacing.xs },
});