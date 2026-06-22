import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RatingStars from './RatingStars';
import SmartImage from './SmartImage';
import { useFavorites } from '../context/FavoritesContext';
import { colors, radius, spacing, font, shadow } from '../theme/theme';

export default function PlaceCard({ place, onPress, variant = 'wide' }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(place.id);

  if (variant === 'compact') {
    return (
      <TouchableOpacity
        style={styles.compact}
        activeOpacity={0.85}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${place.name}, ${place.location}`}
      >
        <SmartImage uri={place.image} style={styles.compactImg} iconSize={22} />
        <View style={styles.compactBody}>
          <Text style={styles.compactTitle} numberOfLines={1}>{place.name}</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={12} color={colors.muted} />
            <Text style={styles.locationText} numberOfLines={1}>{place.location}</Text>
          </View>
          <View style={styles.ratingPill}>
            <Ionicons name="star" size={11} color={colors.star} />
            <Text style={styles.ratingPillText}>{place.rating.toFixed(1)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${place.name}, ${place.location}, rated ${place.rating} out of 5`}
    >
      <View>
        <SmartImage uri={place.image} style={styles.image} />
        <TouchableOpacity
          style={styles.heart}
          onPress={() => toggleFavorite(place.id)}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel={fav ? 'Remove from favourites' : 'Add to favourites'}
        >
          <Ionicons
            name={fav ? 'heart' : 'heart-outline'}
            size={20}
            color={fav ? colors.coral : colors.white}
          />
        </TouchableOpacity>
        <View style={styles.categoryTag}>
          <Text style={styles.categoryText}>{place.category}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>{place.name}</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={13} color={colors.muted} />
          <Text style={styles.locationText} numberOfLines={1}>{place.location}</Text>
        </View>
        <RatingStars rating={place.rating} reviews={place.reviews} />
        <View style={styles.footer}>
          <Text style={styles.fee}>{place.entryFee}</Text>
          <Text style={styles.timings} numberOfLines={1}>{place.timings}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow.card,
  },
  image: { width: '100%', height: 180 },
  heart: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: radius.pill,
    padding: 8,
  },
  categoryTag: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    backgroundColor: 'rgba(14,124,123,0.92)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  categoryText: { color: colors.white, fontSize: font.tiny, fontWeight: '700' },
  body: { padding: spacing.lg },
  title: { fontSize: font.h3, fontWeight: '800', color: colors.ink },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  locationText: { fontSize: font.small, color: colors.muted, marginLeft: 3, flex: 1 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  fee: { fontSize: font.body, fontWeight: '800', color: colors.primary },
  timings: { fontSize: font.tiny, color: colors.muted, flex: 1, textAlign: 'right' },
  compact: {
    width: 180,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    marginRight: spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.line,
    ...shadow.card,
  },
  compactImg: { width: '100%', height: 110 },
  compactBody: { padding: spacing.md },
  compactTitle: { fontSize: font.body, fontWeight: '800', color: colors.ink },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
    marginTop: 6,
  },
  ratingPillText: { marginLeft: 3, fontSize: font.tiny, fontWeight: '800', color: colors.primaryDark },
});