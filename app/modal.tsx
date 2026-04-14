import { StatusBar } from 'expo-status-bar';
import { Platform, View, Text } from 'react-native';
import { MotiView } from 'moti';

export default function ModalScreen() {
  return (
    <View className="flex-1 bg-bg items-center justify-center p-8">
      <MotiView
        from={{ opacity: 0, translateY: 16 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500 }}
        className="items-center"
      >
        <Text className="text-2xl font-serif text-fg mb-4">
          Settings
        </Text>
        <View className="w-20 h-[1px] bg-border mb-6" />
        <Text className="font-sans text-sm text-fg-muted text-center leading-relaxed">
          Configuration options will appear here.
        </Text>
      </MotiView>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
