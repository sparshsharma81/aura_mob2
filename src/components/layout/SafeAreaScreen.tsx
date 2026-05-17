import { ReactNode } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

type SafeAreaScreenProps = Readonly<{
  children: ReactNode;
  scroll?: boolean;
}>;

export function SafeAreaScreen({ children, scroll = true }: SafeAreaScreenProps) {
  if (scroll) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scroll}>{children}</ScrollView>
      </SafeAreaView>
    );
  }

  return <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f6f8fc'
  },
  scroll: {
    flexGrow: 1
  }
});
