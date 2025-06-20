import React, { JSX, useEffect, useRef, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
} from 'react-native';
import useIsMobile from '../hooks/useIsMobile';

type WheelPickerProps = {
  dataset: string[];
  initialValue?: string;
  onConfirm?: (value: string) => void; // ← 値確定用の新しいコールバック
};

const ITEM_HEIGHT = 48;

const WheelPicker = ({ dataset, initialValue, onConfirm }: WheelPickerProps): JSX.Element => {
  const isMobile = useIsMobile();
  const scrollRef = useRef<ScrollView>(null);

  const initialIndex = initialValue
    ? dataset.findIndex((item) => item === initialValue)
    : 0;

  const [selectedIndex, setSelectedIndex] = useState(initialIndex >= 0 ? initialIndex : 0);

  useEffect(() => {
    if (dataset.length > 0) {
      scrollRef.current?.scrollTo({
        y: selectedIndex * ITEM_HEIGHT,
        animated: false,
      });
    }
  }, [dataset]);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    if (index !== selectedIndex && dataset[index]) {
      setSelectedIndex(index);
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(dataset[selectedIndex]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        style={styles.wheel}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        onMomentumScrollEnd={handleScrollEnd}
        onScrollEndDrag={handleScrollEnd}
      >
        {dataset.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text
              style={[
                styles.text,
                index === selectedIndex && { fontWeight: 'bold', color: '#000' },
              ]}
            >
              {item}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.highlightOverlay} />

      {/* ✅ 完了ボタン */}
      <TouchableOpacity onPress={handleConfirm} style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>完了</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 220,
    width: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  wheel: {
    height: 150,
    width: '80%',
  },
  contentContainer: {
    paddingVertical: 50,
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: '#666',
  },
  highlightOverlay: {
    position: 'absolute',
    top: '50%',
    height: ITEM_HEIGHT,
    marginTop: -ITEM_HEIGHT / 2,
    width: '80%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#aaa',
  },
  confirmButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default WheelPicker;
