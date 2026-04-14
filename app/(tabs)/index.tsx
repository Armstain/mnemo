import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Mic, PenLine, ChevronRight } from 'lucide-react-native';
import { useContextStore } from '@/hooks/use-context-store';
import { formatDistanceToNow } from 'date-fns';
import { router } from 'expo-router';
import { MotiView } from 'moti';
import { ZenButton } from '@/components/ZenButton';
import { ZenCard } from '@/components/ZenCard';

export default function MnemoDashboard() {
  const { contexts, isLoaded } = useContextStore();

  if (!isLoaded) {
    return (
      <View className="flex-1 bg-bg items-center justify-center">
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: 'timing', duration: 800 }}
        >
          <Text className="font-sans-medium text-sm text-fg-muted tracking-wide">
            Loading your thoughts...
          </Text>
        </MotiView>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-bg">
      <SafeAreaView className="flex-1">
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 220 }}
        >
          {/* Greeting */}
          <MotiView
            from={{ opacity: 0, translateY: 16 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 600 }}
            className="mb-12 mt-4"
          >
            <Text className="font-sans text-sm text-fg-muted mb-3 tracking-wide">
              Welcome back
            </Text>
            <Text className="text-4xl font-serif text-fg leading-tight">
              What's on{"\n"}your mind?
            </Text>
          </MotiView>

          {/* Recent Notes */}
          {contexts.length > 0 && (
            <MotiView
              from={{ opacity: 0, translateY: 16 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 600, delay: 200 }}
            >
              <View className="flex-row justify-between items-baseline mb-6">
                <Text className="text-lg font-serif text-fg">
                  Recent notes
                </Text>
                <Text className="font-sans text-xs text-fg-muted">
                  {contexts.length} {contexts.length === 1 ? 'note' : 'notes'}
                </Text>
              </View>

              {contexts.slice(0, 5).map((ctx, index) => (
                <ZenCard
                  key={ctx.id}
                  onPress={() => router.push(`/(tabs)/context?id=${ctx.id}` as any)}
                  title={ctx.title}
                  label={`${formatDistanceToNow(ctx.createdAt)} ago`}
                  delay={300 + index * 100}
                >
                  <View className="flex-row justify-between items-center mt-2 pt-3 border-t border-border/50">
                    <Text className="font-sans text-xs text-fg-muted" numberOfLines={1}>
                      {ctx.notes.substring(0, 60)}{ctx.notes.length > 60 ? '...' : ''}
                    </Text>
                    <ChevronRight size={16} color="#9E9890" />
                  </View>
                </ZenCard>
              ))}
            </MotiView>
          )}

          {/* Empty State */}
          {contexts.length === 0 && (
            <MotiView
              from={{ opacity: 0, translateY: 12 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: 'timing', duration: 600, delay: 300 }}
              className="py-16 items-center rounded-[16px] border border-dashed border-border bg-surface-warm/50"
            >
              <Text className="text-5xl mb-4">🍃</Text>
              <Text className="font-serif text-lg text-fg mb-2">
                A quiet space
              </Text>
              <Text className="font-sans text-sm text-fg-muted text-center px-8 leading-relaxed">
                Capture your first thought to get started.{"\n"}Use your voice or write it down.
              </Text>
            </MotiView>
          )}
        </ScrollView>

        {/* Bottom Action Area */}
        <MotiView
          from={{ translateY: 120 }}
          animate={{ translateY: 0 }}
          transition={{ type: 'timing', duration: 500, delay: 400 }}
          className="absolute bottom-0 left-0 right-0 p-6 bg-bg/95 border-t border-border/60"
          style={{ paddingBottom: 48 }}
        >
          <View className="gap-3">
            <ZenButton
              onPress={() => router.push('/dump' as any)}
              title="Start recording"
              variant="primary"
              size="lg"
              fullWidth
              hapticIntensity="medium"
              icon={<Mic size={22} color="#FFFFFF" />}
            />
            <ZenButton
              onPress={() => router.push('/manual' as any)}
              title="Write a note"
              variant="outline"
              size="md"
              fullWidth
              icon={<PenLine size={18} color="#3D3A36" />}
            />
          </View>
        </MotiView>
      </SafeAreaView>
    </View>
  );
}
