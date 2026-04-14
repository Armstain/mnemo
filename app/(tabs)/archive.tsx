import React, { useState } from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { Search, History, ArrowRight, Trash2 } from 'lucide-react-native';
import { useContextStore } from '@/hooks/use-context-store';
import { formatDistanceToNow } from 'date-fns';
import { router } from 'expo-router';

export default function ArchiveScreen() {
  const { contexts, deleteContext, isLoaded } = useContextStore();
  const [searchQuery, setSearchQuery] = useState('');

  if (!isLoaded) return null;

  const filteredContexts = contexts.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.notes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-bg px-5">
      <View className="flex-1">
        <View className="items-center mb-10 mt-4">
          <Text className="text-5xl font-black uppercase tracking-tighter text-fg text-center leading-tight">
            Data{"\n"}Archive
          </Text>
          <Text className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-50 px-2 bg-fg text-bg mt-2">{"RECORDS_INDEX_INIT"}</Text>
        </View>
        <View className="mb-8">
          <View className="flex-row items-center border-[1.5px] border-fg bg-surface px-4 py-4 shadow-hard">
            <Search size={24} color="#0A0A0A" />
            <TextInput
              placeholder="SEARCH_INDEX..."
              placeholderTextColor="#999"
              className="flex-1 ml-3 font-mono text-sm uppercase text-fg"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <ScrollView className="flex-1">
          {filteredContexts.length === 0 ? (
            <View className="py-20 items-center border-[1.5px] border-dashed border-fg/30">
              <Text className="font-mono text-xs opacity-50 uppercase tracking-widest">[ NO_RECORDS_MATCH ]</Text>
            </View>
          ) : (
            <View className="gap-6 pb-20">
              {filteredContexts.map((ctx) => (
                <Pressable 
                  key={ctx.id}
                  onPress={() => router.push(`/(tabs)/context?id=${ctx.id}` as any)}
                  className="bg-surface border-[1.5px] border-fg p-6 shadow-hard active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                  <View className="flex-row justify-between items-start mb-4">
                    <Text className="font-mono text-[10px] uppercase font-black bg-fg text-bg px-2 py-1">
                      {formatDistanceToNow(ctx.createdAt)} ago
                    </Text>
                    <Pressable onPress={() => deleteContext(ctx.id)} className="p-1">
                      <Trash2 size={18} color="#0A0A0A" />
                    </Pressable>
                  </View>
                  <Text className="text-2xl font-black uppercase text-fg mb-3 leading-none">{ctx.title}</Text>
                  <Text className="font-mono text-sm text-fg opacity-60 leading-5" numberOfLines={3}>
                    {ctx.notes}
                  </Text>
                  <View className="mt-6 pt-4 border-t-[1.5px] border-fg/10 flex-row justify-between items-center">
                     <Text className="font-mono text-[10px] font-black uppercase opacity-50">
                       Status: {ctx.summary ? 'ANALYZED' : 'RAW_BUFFER'}
                     </Text>
                     <ArrowRight size={16} color="#F5B82A" />
                  </View>
                </Pressable>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
