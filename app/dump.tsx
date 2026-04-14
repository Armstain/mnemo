import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import { Mic, X, Check } from 'lucide-react-native';
import { router } from 'expo-router';
import { MotiView, AnimatePresence } from 'moti';
import { useContextStore } from '@/hooks/use-context-store';
import { processVoiceDump } from '@/lib/gemini';
import { ZenButton } from '@/components/ZenButton';

export default function DumpScreen() {
  const { addContext } = useContextStore();
  const [notes, setNotes] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulate live readout
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        const words = ["reflecting", "gathering", "capturing", "listening", "processing", "noting", "observing"];
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setNotes(prev => prev + (prev ? " " : "") + randomWord);
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleFinish = async () => {
    if (!notes.trim()) return;
    setIsProcessing(true);
    try {
      const processed = await processVoiceDump(notes);
      const newCtx = addContext({
        title: processed.title,
        notes: processed.notes,
        links: processed.links,
        summary: processed.summary
      });
      router.replace(`/(tabs)/context?id=${newCtx.id}` as any);
    } catch (e) {
      console.error(e);
      const newCtx = addContext({
        title: "Quick thought",
        notes: notes,
        links: [],
      });
      router.replace(`/(tabs)/context?id=${newCtx.id}` as any);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View className="flex-1 bg-bg px-6">
      <SafeAreaView className="flex-1">
        {/* Header */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 400 }}
          className="flex-row justify-between items-center mt-6 mb-8"
        >
          <Text className="font-sans-medium text-sm text-fg-muted">
            {isRecording ? "Listening..." : "Voice capture"}
          </Text>
          {isRecording && (
            <MotiView
              from={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              transition={{ type: 'timing', duration: 900, loop: true }}
            >
              <View className="w-2.5 h-2.5 rounded-full bg-accent-warm" />
            </MotiView>
          )}
        </MotiView>

        {/* Central Mic Area */}
        <View className="flex-1 items-center justify-center">
          <View className="relative items-center justify-center">
            {/* Breathing pulse ring */}
            {isRecording && (
              <MotiView
                from={{ scale: 1, opacity: 0.3 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ type: 'timing', duration: 2200, loop: true, repeatReverse: false }}
                className="absolute w-44 h-44 rounded-full border-2 border-accent"
              />
            )}
            {isRecording && (
              <MotiView
                from={{ scale: 1, opacity: 0.2 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ type: 'timing', duration: 2200, delay: 500, loop: true, repeatReverse: false }}
                className="absolute w-44 h-44 rounded-full border border-accent"
              />
            )}

            <MotiView
              animate={{
                scale: isRecording ? 1.05 : 1,
                backgroundColor: isRecording ? '#8B9E7E' : '#FFFFFF',
              }}
              transition={{ type: 'timing', duration: 400 }}
              className="w-44 h-44 rounded-full items-center justify-center shadow-soft-lg border border-border/30"
            >
              <Mic size={56} color={isRecording ? '#FFFFFF' : '#8B9E7E'} strokeWidth={1.5} />
            </MotiView>
          </View>

          <MotiView
            from={{ opacity: 0, translateY: 8 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 500, delay: 200 }}
            className="mt-10"
          >
            <Text className="text-2xl font-serif text-fg text-center">
              {isRecording ? "Listening..." : "Ready to listen"}
            </Text>
            <Text className="font-sans text-sm text-fg-muted text-center mt-2">
              {isRecording ? "Speak your thoughts freely" : "Tap to start capturing"}
            </Text>
          </MotiView>
        </View>

        {/* Transcript Area */}
        <View className="h-36 rounded-[16px] bg-surface border border-border/50 p-5 mb-8 shadow-soft-sm">
          <Text className="font-sans-medium text-xs text-fg-muted mb-2 tracking-wide">
            Transcript
          </Text>
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <Text className="font-sans text-sm text-fg/70 leading-relaxed">
              {notes || "Your words will appear here..."}
            </Text>
          </ScrollView>
        </View>

        {/* Actions */}
        <View className="gap-3 pb-12">
          <AnimatePresence>
            {!isRecording ? (
              <ZenButton
                onPress={() => setIsRecording(true)}
                title="Start recording"
                variant="primary"
                size="lg"
                fullWidth
                hapticIntensity="medium"
                icon={<Mic size={22} color="#FFFFFF" />}
              />
            ) : (
              <View className="flex-row gap-3">
                <ZenButton
                  onPress={() => { setIsRecording(false); setNotes(''); router.back(); }}
                  title="Cancel"
                  variant="outline"
                  size="md"
                  className="flex-1"
                  icon={<X size={20} color="#3D3A36" />}
                />
                <ZenButton
                  onPress={handleFinish}
                  disabled={isProcessing}
                  title={isProcessing ? "Saving..." : "Save"}
                  variant="primary"
                  size="md"
                  className="flex-[2]"
                  hapticIntensity="medium"
                  icon={isProcessing ? <ActivityIndicator color="#FFFFFF" size="small" /> : <Check size={20} color="#FFFFFF" />}
                />
              </View>
            )}
          </AnimatePresence>
        </View>
      </SafeAreaView>
    </View>
  );
}
