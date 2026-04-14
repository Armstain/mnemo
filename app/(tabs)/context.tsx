import React from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView, ActivityIndicator, Share } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useContextStore } from '@/hooks/use-context-store';
import { summarizeContext } from '@/lib/gemini';
import { ChevronLeft, Trash2, Sparkles, ExternalLink as ExternalLinkIcon, Share2, Clock } from 'lucide-react-native';
import { ExternalLink } from '@/components/ExternalLink';
import { formatDistanceToNow } from 'date-fns';
import { MotiView } from 'moti';
import { ZenButton } from '@/components/ZenButton';
import { ZenCard } from '@/components/ZenCard';

export default function ContextDetailScreen() {
  const { id } = useLocalSearchParams();
  const { contexts, updateContext, deleteContext } = useContextStore();

  const [isGenerating, setIsGenerating] = React.useState(false);

  const context = contexts.find(c => c.id === id);

  if (!context) {
    return (
      <View className="flex-1 bg-bg items-center justify-center p-10">
        <Text className="text-4xl mb-4">🌫️</Text>
        <Text className="font-serif text-xl text-fg mb-2">
          Not found
        </Text>
        <Text className="font-sans text-sm text-fg-muted mb-8 text-center">
          This note may have drifted away.
        </Text>
        <ZenButton
          onPress={() => router.back()}
          title="Go back"
          variant="outline"
          size="md"
        />
      </View>
    );
  }

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      const summary = await summarizeContext(context.notes, context.links);
      updateContext(context.id, { summary });
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `${context.title}\n\n${context.summary?.leftOff ?? context.notes}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View className="flex-1 bg-bg">
      <SafeAreaView className="flex-1">
        {/* Navigation Bar */}
        <View className="flex-row justify-between items-center px-6 py-4">
          <Pressable
            onPress={() => router.back()}
            className="w-11 h-11 rounded-full bg-surface items-center justify-center border border-border/50 active:opacity-70"
          >
            <ChevronLeft size={20} color="#3D3A36" />
          </Pressable>

          <View className="flex-row gap-2">
            <Pressable
              onPress={onShare}
              className="w-11 h-11 rounded-full bg-surface items-center justify-center border border-border/50 active:opacity-70"
            >
              <Share2 size={17} color="#3D3A36" />
            </Pressable>
            <Pressable
              onPress={() => { deleteContext(context.id); router.back(); }}
              className="w-11 h-11 rounded-full bg-error/10 items-center justify-center active:opacity-70"
            >
              <Trash2 size={17} color="#C17A6A" />
            </Pressable>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Title & Metadata */}
          <MotiView
            from={{ opacity: 0, translateY: 16 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 500 }}
            className="px-6 py-8"
          >
            <View className="flex-row items-center mb-4">
              <Clock size={13} color="#8B9E7E" />
              <Text className="font-sans-medium text-xs text-accent ml-1.5">
                {formatDistanceToNow(context.createdAt)} ago
              </Text>
            </View>

            <Text className="text-3xl font-serif text-fg leading-snug mb-4">
              {context.title}
            </Text>

            <View className="flex-row gap-2">
              <View className="bg-surface-warm px-3 py-1.5 rounded-full">
                <Text className="font-sans text-[11px] text-fg-muted">
                  {context.id.slice(0, 8)}
                </Text>
              </View>
            </View>
          </MotiView>

          {/* AI Summary Section */}
          <MotiView
            from={{ opacity: 0, translateY: 16 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 500, delay: 150 }}
            className="px-6 py-6"
          >
            <View className="flex-row justify-between items-center mb-6">
              <View className="flex-row items-center">
                <Sparkles size={18} color="#8B9E7E" />
                <Text className="text-lg font-serif text-fg ml-2">
                  Summary
                </Text>
              </View>

              {!context.summary && (
                <ZenButton
                  onPress={handleGenerateReport}
                  disabled={isGenerating}
                  title={isGenerating ? "Thinking..." : "Generate"}
                  variant="primary"
                  size="sm"
                  icon={isGenerating ? <ActivityIndicator color="#FFFFFF" size="small" /> : undefined}
                />
              )}
            </View>

            {isGenerating && (
              <View className="py-16 items-center rounded-[16px] bg-surface-warm">
                <MotiView
                  from={{ opacity: 0.4 }}
                  animate={{ opacity: 1 }}
                  transition={{ type: 'timing', duration: 1200, loop: true }}
                >
                  <Text className="text-3xl mb-4">✨</Text>
                </MotiView>
                <Text className="font-sans text-sm text-fg-muted text-center">
                  Reflecting on your thoughts...
                </Text>
              </View>
            )}

            {!isGenerating && !context.summary && (
              <View className="py-16 items-center rounded-[16px] border border-dashed border-border bg-surface/50">
                <Text className="text-3xl mb-3">🪷</Text>
                <Text className="font-sans text-sm text-fg-muted text-center px-8">
                  Tap "Generate" to create an AI summary{"\n"}of your captured thoughts.
                </Text>
              </View>
            )}

            {context.summary && (
              <MotiView
                from={{ opacity: 0, translateY: 16 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'timing', duration: 500 }}
                className="gap-5"
              >
                {/* Where you left off */}
                <ZenCard variant="warm" animated={false}>
                  <Text className="font-sans-medium text-xs text-accent mb-3 tracking-wide">
                    Where you left off
                  </Text>
                  <Text className="font-serif text-xl text-fg leading-relaxed">
                    "{context.summary.leftOff}"
                  </Text>
                </ZenCard>

                {/* Next Steps */}
                <View>
                  <Text className="font-serif text-lg text-fg mb-4">
                    Next steps
                  </Text>
                  <View className="gap-3">
                    {context.summary.nextSteps.map((step, i) => (
                      <View key={i} className="flex-row items-start bg-surface rounded-[12px] p-5 border border-border/40">
                        <View className="w-7 h-7 rounded-full bg-accent/15 items-center justify-center mr-4 mt-0.5">
                          <Text className="font-sans-semi text-xs text-accent">{i + 1}</Text>
                        </View>
                        <Text className="flex-1 font-sans text-sm text-fg leading-relaxed">
                          {step}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Resources */}
                {context.summary.resources.length > 0 && (
                  <View>
                    <Text className="font-serif text-lg text-fg mb-4">
                      Resources
                    </Text>
                    <View className="gap-2">
                      {context.summary.resources.map((res, i) => (
                        <ExternalLink key={i} href={res.url} className="flex-row items-center justify-between bg-surface rounded-[12px] px-5 py-4 border border-border/40">
                          <Text className="font-sans text-sm text-fg flex-1 mr-4" numberOfLines={1}>
                            {res.name}
                          </Text>
                          <ExternalLinkIcon size={14} color="#8B9E7E" />
                        </ExternalLink>
                      ))}
                    </View>
                  </View>
                )}
              </MotiView>
            )}
          </MotiView>

          {/* Raw Notes */}
          <MotiView
            from={{ opacity: 0, translateY: 16 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'timing', duration: 500, delay: 300 }}
            className="px-6 pb-24 mt-4"
          >
            <Text className="font-serif text-lg text-fg mb-4">
              Your notes
            </Text>

            <View className="rounded-[16px] p-6 bg-surface-warm/60 border border-border/30">
              <Text className="font-sans text-sm leading-7 text-fg/80">
                {context.notes}
              </Text>

              {context.links.length > 0 && (
                <View className="mt-6 pt-6 border-t border-border/40">
                  <Text className="font-sans-medium text-xs text-fg-muted mb-3 tracking-wide">
                    Attached links
                  </Text>
                  <View className="gap-2">
                    {context.links.map((link, i) => (
                      <ExternalLink key={i} href={link} className="flex-row items-center justify-between rounded-[10px] px-4 py-3 bg-surface border border-border/30 active:opacity-70">
                        <Text className="font-sans text-xs text-fg-muted flex-1 mr-4" numberOfLines={1}>
                          {link}
                        </Text>
                        <ExternalLinkIcon size={12} color="#9E9890" />
                      </ExternalLink>
                    ))}
                  </View>
                </View>
              )}
            </View>
          </MotiView>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
