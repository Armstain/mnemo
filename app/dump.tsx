import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, SafeAreaView, TextInput, ActivityIndicator } from 'react-native';
import { Mic, X, ArrowRight, ChevronLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { useContextStore } from '@/hooks/use-context-store';
import { processVoiceDump } from '@/lib/gemini';

export default function DumpScreen() {
  const { addContext } = useContextStore();
  const [notes, setNotes] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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
      // Fallback
      const newCtx = addContext({
        title: "Quick Dump",
        notes: notes,
        links: [],
      });
      router.replace(`/(tabs)/context?id=${newCtx.id}` as any);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-bg px-5">
      <View className="flex-1">
        <View className="flex-row justify-between items-center mb-10 pt-4">
          <Pressable 
            onPress={() => router.back()} 
            hitSlop={20}
            className="p-3 border-[1.5px] border-fg bg-surface active:translate-x-[1px] active:translate-y-[1px]"
          >
            <ChevronLeft size={24} color="#0A0A0A" />
          </Pressable>
          <Text className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
            {"// Preserve_Memory_Buffer"}
          </Text>
        </View>

        <View className="items-center mb-8">
          <Text className="text-5xl font-black uppercase tracking-tighter mb-4 text-fg text-center leading-tight">
            Mental{"\n"}Inventory
          </Text>
          <Text className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-50 px-2 bg-fg text-bg">{"STREAMS_IN_PROGRESS"}</Text>
        </View>
          
          <View className="mb-6">
            <Text className="font-mono text-[10px] font-bold uppercase tracking-widest bg-fg text-bg px-2 py-1 self-start mb-2">Primary_Buffer</Text>
            <View className="flex-1 border-[1.5px] border-fg bg-surface p-5 shadow-hard min-h-[300px]">
              <TextInput
                multiline
                placeholder="> INITIATE RECORDING..."
                placeholderTextColor="#999"
                className="flex-1 font-mono text-base text-fg"
                style={{ textAlignVertical: 'top' }}
                value={notes}
                onChangeText={setNotes}
              />
            </View>
          </View>

        <View className="gap-6 mt-4 mb-4">
           <Pressable 
            onPress={() => setIsRecording(!isRecording)}
            className={`h-24 border-[1.5px] border-fg items-center justify-center flex-row ${isRecording ? 'bg-accent shadow-none translate-x-[2px] translate-y-[2px]' : 'bg-surface shadow-hard'}`}
          >
            <Mic size={32} color="#0A0A0A" className={isRecording ? 'animate-pulse' : ''} />
            <Text className="ml-4 font-mono font-black uppercase tracking-widest text-fg text-xl">
              {isRecording ? 'STOP_INPUT' : 'START_MIC'}
            </Text>
          </Pressable>

          <Pressable 
            onPress={handleFinish}
            disabled={!notes.trim() || isProcessing}
            className={`h-20 border-[1.5px] border-fg items-center justify-center flex-row ${!notes.trim() || isProcessing ? 'bg-fg/10 opacity-50' : 'bg-fg shadow-hard'}`}
          >
            {isProcessing ? (
              <ActivityIndicator color="#F5B82A" />
            ) : (
              <>
                <Text className="font-mono font-black uppercase tracking-widest text-bg text-lg mr-3">Commit_Save</Text>
                <ArrowRight size={24} color="#F5B82A" />
              </>
            )}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
