import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, font, radius } from '../theme/theme';

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Uncaught UI error:', error, info);
  }

  reset = () => this.setState({ hasError: false });

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.wrap}>
          <Ionicons name="warning-outline" size={56} color={colors.coral} />
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.sub}>
            An unexpected error occurred. Please try again.
          </Text>
          <TouchableOpacity style={styles.btn} onPress={this.reset} activeOpacity={0.9}>
            <Text style={styles.btnText}>Try again</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: spacing.xl,
  },
  title: { marginTop: spacing.md, fontSize: font.h2, fontWeight: '800', color: colors.ink },
  sub: {
    marginTop: spacing.xs,
    fontSize: font.small,
    color: colors.muted,
    textAlign: 'center',
  },
  btn: {
    marginTop: spacing.xl,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
  },
  btnText: { color: colors.white, fontSize: font.body, fontWeight: '800' },
});