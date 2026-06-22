import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, font, spacing } from '../theme/theme';

export function SectionHeader({ title, actionLabel, onAction }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {actionLabel && (
        <TouchableOpacity onPress={onAction} hitSlop={8}>
          <Text style={styles.action}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export function EmptyState({ icon = 'compass-outline', title, subtitle }) {
  return (
    <View style={styles.empty}>
      <Ionicons name={icon} size={48} color={colors.muted} />
      <Text style={styles.emptyTitle}>{title}</Text>
      {subtitle ? <Text style={styles.emptySub}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  title: { fontSize: font.h2, fontWeight: '800', color: colors.ink },
  action: { fontSize: font.small, fontWeight: '700', color: colors.primary },
  empty: { alignItems: 'center', paddingVertical: spacing.xxl * 1.5 },
  emptyTitle: { marginTop: spacing.md, fontSize: font.h3, fontWeight: '700', color: colors.ink },
  emptySub: {
    marginTop: spacing.xs,
    fontSize: font.small,
    color: colors.muted,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
});