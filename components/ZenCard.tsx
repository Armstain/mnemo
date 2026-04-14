import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MotiView } from 'moti';

interface ZenCardProps {
  children: React.ReactNode;
  title?: string;
  label?: string;
  onPress?: () => void;
  variant?: 'surface' | 'warm' | 'accent';
  className?: string;
  animated?: boolean;
  delay?: number;
}

export const ZenCard = ({
  children,
  title,
  label,
  onPress,
  variant = 'surface',
  className = '',
  animated = true,
  delay = 0,
}: ZenCardProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'warm':
        return 'bg-surface-warm';
      case 'accent':
        return 'bg-accent/10';
      case 'surface':
      default:
        return 'bg-surface';
    }
  };

  const CardContent = (
    <View
      className={`
        rounded-[16px] p-6 shadow-soft border border-border/50
        ${getVariantStyles()}
        ${className}
      `}
    >
      {label && (
        <Text className="font-sans-medium text-xs text-fg-muted mb-3 tracking-wide">
          {label}
        </Text>
      )}
      {title && (
        <Text className="text-xl font-serif text-fg mb-3 leading-tight">
          {title}
        </Text>
      )}
      {children}
    </View>
  );

  const wrappedContent = animated ? (
    <MotiView
      from={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500, delay }}
    >
      {CardContent}
    </MotiView>
  ) : (
    CardContent
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        className="active:opacity-80 active:scale-[0.99] mb-4"
      >
        {wrappedContent}
      </Pressable>
    );
  }

  return <View className="mb-4">{wrappedContent}</View>;
};
