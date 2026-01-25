import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#FFC300' },
        headerTintColor: '#4f0e1a',
        headerBackTitleStyle: { fontSize: 20 },
        contentStyle: {
          paddingHorizontal: 10,
          paddingTop: 10,
          backgroundColor: 'rgb(255, 247, 192)',
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: 'Notes' }} />
      <Stack.Screen name="notes" options={{ headerTitle: 'Notes' }} />
    </Stack>
  );
}
