import { View, Text } from 'react-native';
import { MotiView } from 'moti';

export default function TabTwoScreen() {
  return (
    <View className="flex-1 bg-bg items-center justify-center p-8">
      <MotiView
        from={{ opacity: 0, translateY: 12 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500 }}
        className="items-center"
      >
        <Text className="text-4xl mb-4">🍃</Text>
        <Text className="text-xl font-serif text-fg mb-2">
          Coming soon
        </Text>
        <Text className="font-sans text-sm text-fg-muted text-center leading-relaxed">
          More features are on the way.
        </Text>
      </MotiView>
    </View>
  );
}
