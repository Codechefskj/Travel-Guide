import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import RatingStars from '../components/RatingStars';
import SmartImage from '../components/SmartImage';
import { EmptyState } from '../components/SectionHeader';
import { useFavorites } from '../context/FavoritesContext';
import { colors, spacing, font, radius, shadow } from '../theme/theme';

function InfoRow({ icon, label, value, tint = colors.primary }) {
  return (
    <View style={styles.infoRow}>
      <View style={[styles.infoIcon, { backgroundColor: tint + '1A' }]}>
        <Ionicons name={icon} size={18} color={tint} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

export default function PlaceDetailsScreen({ route, navigation }) {
  const { place } = route.params || {};
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!place) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.notFoundBar}>
          <TouchableOpacity style={styles.roundBtnDark} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color={colors.ink} />
          </TouchableOpacity>
        </View>
        <EmptyState
          icon="alert-circle-outline"
          title="Place not found"
          subtitle="This destination could not be loaded."
        />
      </SafeAreaView>
    );
  }

  const fav = isFavorite(place.id);

  return (
    <View style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <SmartImage uri={place.image} style={styles.hero} iconSize={40} />
          <SafeAreaView style={styles.heroBar} edges={['top']}>
            <TouchableOpacity
              style={styles.roundBtn}
              onPress={() => navigation.goBack()}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <Ionicons name="chevron-back" size={22} color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.roundBtn}
              onPress={() => toggleFavorite(place.id)}
              accessibilityRole="button"
              accessibilityLabel={fav ? 'Remove from favourites' : 'Add to favourites'}
            >
              <Ionicons
                name={fav ? 'heart' : 'heart-outline'}
                size={22}
                color={fav ? colors.coral : colors.white}
              />
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        <View style={styles.sheet}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>{place.category}</Text>
          </View>

          <Text style={styles.name}>{place.name}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={16} color={colors.muted} />
            <Text style={styles.location}>{place.location}</Text>
          </View>

          <View style={{ marginTop: spacing.sm }}>
            <RatingStars rating={place.rating} reviews={place.reviews} size={16} />
          </View>

          <View style={styles.infoCard}>
            <InfoRow icon="cash-outline" label="Entry Fee" value={place.entryFee} tint={colors.primary} />
            <View style={styles.divider} />
            <InfoRow icon="time-outline" label="Timings" value={place.timings} tint={colors.accent} />
          </View>

          <Text style={styles.sectionTitle}>About this place</Text>
          <Text style={styles.description}>{place.description}</Text>
        </View>
      </ScrollView>

      <SafeAreaView style={styles.bottomBar} edges={['bottom']}>
        <TouchableOpacity
          style={[styles.cta, fav && styles.ctaActive]}
          activeOpacity={0.9}
          onPress={() => toggleFavorite(place.id)}
        >
          <Ionicons name={fav ? 'heart' : 'heart-outline'} size={20} color={colors.white} />
          <Text style={styles.ctaText}>{fav ? 'Saved to Favourites' : 'Add to Favourites'}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  hero: { width: '100%', height: 320 },
  heroBar: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  notFoundBar: { paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  roundBtn: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: 40, height: 40,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  roundBtnDark: {
    backgroundColor: colors.surface,
    width: 40, height: 40,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.line,
  },
  sheet: {
    backgroundColor: colors.background,
    marginTop: -26,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.lg,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radius.pill,
    marginBottom: spacing.sm,
  },
  categoryText: { color: colors.primaryDark, fontSize: font.tiny, fontWeight: '800' },
  name: { fontSize: font.h1, fontWeight: '800', color: colors.ink },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  location: { fontSize: font.body, color: colors.muted, marginLeft: 4 },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow.card,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center' },
  infoIcon: {
    width: 38, height: 38,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  infoLabel: { fontSize: font.tiny, color: colors.muted, fontWeight: '700' },
  infoValue: { fontSize: font.body, color: colors.ink, fontWeight: '700', marginTop: 1 },
  divider: { height: 1, backgroundColor: colors.line, marginVertical: spacing.md },
  sectionTitle: { fontSize: font.h3, fontWeight: '800', color: colors.ink, marginTop: spacing.xl, marginBottom: spacing.sm },
  description: { fontSize: font.body, color: colors.muted, lineHeight: 23 },
  bottomBar: { backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.line, paddingHorizontal: spacing.lg },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    height: 52,
    borderRadius: radius.md,
    marginVertical: spacing.sm,
  },
  ctaActive: { backgroundColor: colors.coral },
  ctaText: { color: colors.white, fontSize: font.body, fontWeight: '800', marginLeft: 8 },
});