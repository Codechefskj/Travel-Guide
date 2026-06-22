import React, { useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/theme';
export default function SmartImage({ uri, style, iconSize = 28, resizeMode = 'cover' }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <View style={[style, styles.wrap]}>
      {!error && (
        <Image
          source={{ uri }}
          style={StyleSheet.absoluteFill}
          resizeMode={resizeMode}
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
          accessible
          accessibilityRole="image"
        />
      )}

      {loading && !error && <ActivityIndicator color={colors.primary} />}

      {error && (
        <View style={styles.fallback}>
          <Ionicons name="image-outline" size={iconSize} color={colors.muted} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
    overflow: 'hidden',
  },
  fallback: { alignItems: 'center', justifyContent: 'center' },
});