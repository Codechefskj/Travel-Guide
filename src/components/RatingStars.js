import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, font } from '../theme/theme';

export default function RatingStars({ rating, reviews, size = 14, showValue = true }) {
  const stars = [1, 2, 3, 4, 5].map((i) => {
    if (rating >= i) return 'star';
    if (rating >= i - 0.5) return 'star-half';
    return 'star-outline';
  });

  return (
    <View style={styles.row}>
      {stars.map((name, idx) => (
        <Ionicons key={idx} name={name} size={size} color={colors.star} />
      ))}
      {showValue && (
        <Text style={styles.value}>
          {rating.toFixed(1)}
          {reviews ? `  ·  ${formatReviews(reviews)}` : ''}
        </Text>
      )}
    </View>
  );
}

function formatReviews(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k reviews`;
  return `${n} reviews`;
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  value: { marginLeft: 6, fontSize: font.small, color: colors.muted, fontWeight: '600' },
});