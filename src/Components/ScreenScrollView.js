import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

const ScreenScrollView = ({
  children,
  style,
  contentContainerStyle,
  backgroundColor,
  keyboardAvoiding = true,
  showsVerticalScrollIndicator = false,
}) => {
  const scrollView = (
    <ScrollView
      style={[styles.scroll, style]}
      contentContainerStyle={[styles.content, contentContainerStyle]}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      keyboardShouldPersistTaps="handled"
      nestedScrollEnabled>
      {children}
    </ScrollView>
  );

  if (!keyboardAvoiding) {
    return (
      <View style={[styles.flex, backgroundColor && { backgroundColor }]}>
        {scrollView}
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.flex, backgroundColor && { backgroundColor }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {scrollView}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
});

export default ScreenScrollView;
