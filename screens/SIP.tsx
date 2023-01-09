import { View, Text, ScrollView, Animated } from "react-native";
import React from "react";
import { useYOffset } from "../Context/OffsetContext";

const COLORS = ["#A77DD0", "#E793EB", "#E8CD09", "#63CB40"];

const SIP = () => {
  const yOffset = useYOffset();
  return (
    <Animated.ScrollView
      style={{ padding: 12, paddingTop: 55 }}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: yOffset.current } } }],
        { useNativeDriver: true }
      )}
    >
      <Text style={{ fontWeight: "700", fontSize: 18 }}>
        This is your regular SIP screen.
      </Text>
      <Text>This content is scrollable</Text>
      <Text>Just adding random text before for making it scrollable</Text>
      {COLORS.map((color) => (
        <View
          key={color}
          style={{
            borderColor: color,
            margin: 10,
            borderWidth: 2,
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ color }}>
            Nullam sagittis interdum justo sit amet consectetur. Etiam vitae
            eros dui. Quisque quis aliquam mauris, eget porttitor orci. Nullam
            blandit a metus quis condimentum. Duis egestas enim magna, faucibus
            blandit nisl suscipit id. Sed porta elit mi, et vulputate arcu
            sollicitudin nec. Suspendisse potenti. Nam volutpat nec purus in
            sodales. Phasellus in ultrices elit. In vel magna id massa vehicula
            vehicula. Nam at tellus sapien.
          </Text>
        </View>
      ))}
    </Animated.ScrollView>
  );
};

export default SIP;
