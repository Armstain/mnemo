import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { Mic, Search, History, ArrowRight, Trash2 } from 'lucide-react-native';
import { useContextStore } from '@/hooks/use-context-store';
import { formatDistanceToNow } from 'date-fns';
import { router } from 'expo-router';
import { MotiView } from 'moti';

export default function MnemoDashboard() {
  const { contexts, deleteContext, isLoaded } = useContextStore();
  const [searchQuery, setSearchQuery] = useState('');

  if (!isLoaded) {
    return (
      <View className="flex-1 bg-bg items-center justify-center">
        <Text className="font-mono text-fg opacity-50 uppercase tracking-widest">[ INITIALIZING ]</Text>
      </View>
    );
  }

  const lastContext = contexts[0];
  const filteredContexts = contexts.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-bg px-5">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mb-12 mt-4 items-center">
          <Text className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent mb-4 px-2 bg-fg">
            {"INITIALIZATION_COMPLETE"}
          </Text>
          <Text className="text-5xl font-black uppercase leading-[0.8] tracking-tighter text-fg text-center">
            COGNITIVE{"\n"}STATE
          </Text>
        </View>

        {/* Action Button */}
        <MotiView 
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-10"
        >
          <Pressable 
            onPress={() => router.push('/dump' as any)}
            className="bg-accent border-[1.5px] border-fg p-6 flex-row items-center justify-between shadow-hard active:translate-x-[2px] active:translate-y-[2px] active:shadow-none min-h-[90px]"
          >
            <View className="flex-row items-center">
              <View className="bg-fg p-3 border-[1.5px] border-fg">
                <Mic size={24} color="#F5B82A" />
              </View>
              <View className="ml-4">
                <Text className="font-mono text-[10px] font-bold uppercase tracking-widest text-fg opacity-60">
                   Capture_Brain_Dump
                </Text>
                <Text className="text-xl font-black uppercase text-fg">
                  TRIGGER_MIC
                </Text>
              </View>
            </View>
            <ArrowRight size={24} color="#0A0A0A" />
          </Pressable>
        </MotiView>

        {/* Latest Context Preview */}
        {lastContext && (
          <View className="mb-10">
            <Pressable 
              onPress={() => router.push(`/(tabs)/context?id=${lastContext.id}` as any)}
              className="bg-surface border-[1.5px] border-fg p-8 shadow-hard active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <Text className="font-mono text-[10px] font-bold uppercase tracking-widest text-fg opacity-50 mb-3 block">
                Last Preserved Context
              </Text>
              <Text className="text-3xl font-black uppercase mb-3 text-fg leading-none">{lastContext.title}</Text>
              <Text className="font-mono text-sm text-fg opacity-70 leading-5" numberOfLines={3}>
                {lastContext.notes}
              </Text>
              <View className="mt-8 flex-row justify-between items-center pt-6 border-t-[1.5px] border-fg/10">
                <Text className="font-mono text-xs font-bold text-accent uppercase">
                  {formatDistanceToNow(lastContext.createdAt)} ago
                </Text>
                <View className="bg-fg px-4 py-2 border-[1.5px] border-fg">
                  <Text className="font-mono text-[10px] uppercase font-black text-bg">
                    Restore Now
                  </Text>
                </View>
              </View>
            </Pressable>
          </View>
        )}

        {/* History List */}
        <View className="mb-10">
          <View className="flex-row justify-between items-center mb-8 px-1">
            <Text className="text-4xl font-black uppercase tracking-tighter text-fg">
              Archive
            </Text>
            <History size={24} color="#0A0A0A" />
          </View>

          {filteredContexts.length === 0 ? (
            <View className="border-dashed border-[1.5px] border-fg opacity-30 p-10 items-center">
              <Text className="font-mono text-xs uppercase tracking-widest">Memory Banks Empty</Text>
            </View>
          ) : (
            <View className="space-y-4">
              {filteredContexts.slice(1, 5).map((ctx) => (
                <Pressable 
                  key={ctx.id}
                  className="bg-surface border-[1.5px] border-fg p-5 flex-row items-center justify-between shadow-hard active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                  onPress={() => router.push(`/(tabs)/context?id=${ctx.id}` as any)}
                >
                  <View className="flex-1 mr-4">
                    <Text className="text-lg font-black uppercase text-fg" numberOfLines={1}>
                      {ctx.title}
                    </Text>
                    <Text className="font-mono text-[10px] text-fg opacity-50 uppercase tracking-widest mt-1">
                      {formatDistanceToNow(ctx.createdAt)} ago
                    </Text>
                  </View>
                  <ArrowRight size={20} color="#F5B82A" />
                </Pressable>
              ))}
              
              <Pressable 
                onPress={() => router.push('/(tabs)/archive' as any)}
                className="items-center py-6 border-[1.5px] border-dashed border-fg/20 mt-4"
              >
                <Text className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                   Access Full Index {'>'}
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
