import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '../components/SearchBar';
import PlaceCard from '../components/PlaceCard';
import { EmptyState } from '../components/SectionHeader';
import { CategoryChips } from '../components/UIComponents';
import useDebouncedValue from '../hooks/useDebouncedValue';
import { PLACES, CATEGORIES } from '../data/places';
import { colors, spacing, font } from '../theme/theme';

export default function PlacesScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [refreshing, setRefreshing] = useState(false);

  const debouncedQuery = useDebouncedValue(query, 250);

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    return PLACES.filter((p) => {
      const matchesCategory = category === 'All' || p.category === category;
      const matchesQuery =
        q === '' || p.name.toLowerCase().includes(q) || p.location.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [debouncedQuery, category]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 700);
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>All Places</Text>
        <Text style={styles.subtitle}>
          {filtered.length} destination{filtered.length === 1 ? '' : 's'}
        </Text>
      </View>

      <View style={styles.controls}>
        <SearchBar value={query} onChangeText={setQuery} />
        <CategoryChips categories={CATEGORIES} selected={category} onSelect={setCategory} />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        initialNumToRender={6}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        renderItem={({ item }) => (
          <PlaceCard place={item} onPress={() => navigation.navigate('PlaceDetails', { place: item })} />
        )}
        ListEmptyComponent={
          <EmptyState icon="search-outline" title="No places found" subtitle="Try another search term or category." />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  title: { fontSize: font.h1, fontWeight: '800', color: colors.ink },
  subtitle: { fontSize: font.small, color: colors.muted, marginTop: 2 },
  controls: { paddingHorizontal: spacing.lg, paddingTop: spacing.md },
  list: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl, paddingTop: spacing.sm },
});