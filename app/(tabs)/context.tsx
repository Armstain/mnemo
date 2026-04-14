import React from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useContextStore } from '@/hooks/use-context-store';
import { summarizeContext } from '@/lib/gemini';
import { ChevronLeft, Share, Trash2, Cpu, CheckCircle2 } from 'lucide-react-native';
import { formatDistanceToNow } from 'date-fns';

export default function ContextDetailScreen() {
  const { id } = useLocalSearchParams();
  const { contexts, updateContext, deleteContext } = useContextStore();
  
  const [isGenerating, setIsGenerating] = React.useState(false);

  const context = contexts.find(c => c.id === id);

  if (!context) {
    return (
      <View className="flex-1 bg-bg items-center justify-center">
        <Text className="font-mono text-fg opacity-50 uppercase tracking-widest">[ NOT_FOUND ]</Text>
        <Pressable onPress={() => router.back()} className="mt-4">
          <Text className="text-accent font-bold">RETURN_TO_BASE</Text>
        </Pressable>
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

  return (
    <SafeAreaView className="flex-1 bg-bg px-5">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-10 pt-4">
          <Pressable 
            onPress={() => router.back()} 
            hitSlop={20}
            className="p-3 border-[1.5px] border-fg bg-surface active:translate-x-[1px] active:translate-y-[1px]"
          >
            <ChevronLeft size={24} color="#0A0A0A" />
          </Pressable>
          <View className="flex-row gap-4">
             <Pressable className="p-3 border-[1.5px] border-fg bg-surface active:translate-x-[1px] active:translate-y-[1px] shadow-hard">
              <Share size={20} color="#0A0A0A" />
            </Pressable>
            <Pressable onPress={() => { deleteContext(context.id); router.back(); }} className="p-3 border-[1.5px] border-fg bg-accent active:translate-x-[1px] active:translate-y-[1px] shadow-hard">
              <Trash2 size={20} color="#0A0A0A" />
            </Pressable>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="mb-10 items-center border-b-[1.5px] border-fg pb-8">
            <Text className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent mb-4 px-2 bg-fg">
              ID: {context.id.slice(0, 12)}
            </Text>
            <Text className="text-5xl font-black uppercase tracking-tighter text-fg mb-4 text-center leading-tight">
              {context.title}
            </Text>
            <Text className="font-mono text-[10px] font-bold opacity-50 uppercase tracking-widest">
              SNAPSHOT_LOGGED: {formatDistanceToNow(context.createdAt)} AGO
            </Text>
          </View>

          {/* Intelligence Report Section */}
          <View className="bg-surface border-[1.5px] border-fg p-8 shadow-hard mb-12">
            <View className="flex-row justify-between items-center mb-8 border-b-[1.5px] border-fg pb-4">
              <View className="flex-row items-center">
                <Cpu size={20} color="#F5B82A" />
                <Text className="font-mono text-xs font-bold uppercase tracking-widest ml-3 text-fg">
                  Intelligence_Report
                </Text>
              </View>
              {!context.summary && (
                <Pressable 
                  onPress={handleGenerateReport}
                  disabled={isGenerating}
                  className="bg-accent px-4 py-2 border-[1.5px] border-fg shadow-hard active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                  <Text className="font-mono text-xs font-black uppercase">
                    {isGenerating ? 'ANALYZING...' : 'EXECUTE_GEN'}
                  </Text>
                </Pressable>
              )}
            </View>

            {isGenerating && (
              <View className="py-16 items-center">
                <ActivityIndicator color="#F5B82A" size="large" />
                <Text className="font-mono text-xs mt-6 uppercase font-bold tracking-widest opacity-50">Synthesizing Context Stream...</Text>
              </View>
            )}

            {!isGenerating && !context.summary && (
              <View className="py-16 items-center opacity-30 border-[1.5px] border-dashed border-fg/20">
                <Text className="font-mono text-xs uppercase font-bold tracking-widest text-center px-4">[ AWAITING_ANALYSIS_TRIGGER ]</Text>
              </View>
            )}

            {context.summary && (
              <View className="space-y-10">
                <View>
                  <Text className="font-mono text-[10px] font-black uppercase bg-fg text-bg px-2 py-1 self-start mb-4">Status_Overview</Text>
                  <Text className="text-2xl font-black uppercase leading-tight text-fg italic">
                    &quot;{context.summary.leftOff}&quot;
                  </Text>
                </View>
                
                <View>
                  <Text className="font-mono text-[10px] font-black uppercase bg-fg text-bg px-2 py-1 self-start mb-6">Action_Sequence</Text>
                  <View className="gap-4">
                    {context.summary.nextSteps.map((step, i) => (
                      <View key={i} className="flex-row items-start border-l-[3px] border-accent pl-5 py-2">
                         <Text className="text-accent font-black text-xl mr-4">0{i+1}</Text>
                         <Text className="flex-1 font-mono text-sm font-bold text-fg leading-5">{step}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                {context.summary.resources.length > 0 && (
                  <View>
                    <Text className="font-mono text-[10px] font-black uppercase bg-fg text-bg px-2 py-1 self-start mb-4">Extracted_Assets</Text>
                    <View className="gap-2">
                      {context.summary.resources.map((res, i) => (
                         <View key={i} className="flex-row items-center gap-2">
                           <Text className="text-accent font-bold">{">"}</Text>
                           <Text className="font-mono text-xs font-bold text-fg underline">{res}</Text>
                         </View>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            )}
          </View>

          {/* Raw Data */}
          <View className="mb-20">
            <Text className="font-mono text-[10px] font-black uppercase tracking-widest opacity-50 mb-4 ml-1">{"// Raw_Data_Buffer"}</Text>
            <View className="bg-bg border-[1.5px] border-fg p-8 shadow-hard">
              <Text className="font-mono text-xs leading-6 text-fg font-bold">
                {context.notes}
              </Text>
              
              {context.links.length > 0 && (
                <View className="mt-8 pt-8 border-t-[1.5px] border-fg/10">
                  <Text className="font-mono text-[10px] font-black uppercase opacity-60 mb-4">Linked_URIs</Text>
                  <View className="gap-3">
                    {context.links.map((link, i) => (
                       <Text key={i} className="font-mono text-[10px] font-black tracking-widest text-[#0A0A0A] bg-fg/5 border-[1.5px] border-fg px-3 py-2 self-start">
                         {link}
                       </Text>
                    ))}
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
