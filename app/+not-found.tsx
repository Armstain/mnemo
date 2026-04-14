import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';
import { MotiView } from 'moti';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not found', headerShown: false }} />
      <View className="flex-1 bg-bg items-center justify-center p-8">
        <MotiView
          from={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500 }}
          className="items-center"
        >
          <Text className="text-5xl mb-6">🌿</Text>
          <Text className="text-2xl font-serif text-fg mb-3">
            Page not found
          </Text>
          <Text className="font-sans text-sm text-fg-muted text-center mb-8 leading-relaxed">
            This path doesn't seem to lead anywhere.
          </Text>

          <Link href="/" className="px-6 py-3 rounded-full bg-accent">
            <Text className="font-sans-semi text-sm text-white">
              Return home
            </Text>
          </Link>
        </MotiView>
      </View>
    </>
  );
}
