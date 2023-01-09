import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  Pressable,
  Animated,
} from "react-native";
import React, { useRef } from "react";

type Props = {
  selectedScreen: string;
  setSelectedScreen: (screen: string) => void;
  yOffset: React.MutableRefObject<Animated.Value>;
};

const ScrollableHeader = ({
  selectedScreen,
  setSelectedScreen,
  yOffset,
}: Props) => {
  const ref = useRef<FlatList<string>>(null!);
  const translateY = yOffset.current.interpolate({
    extrapolate: "clamp",
    // ik this 55 value is arbitary but we already know the height of search bar and padding so we can calculate it
    // Worst case we can use the measure API to measure the height of view and set the value
    inputRange: [0, 55],
    outputRange: [0, -55],
  });
  return (
    <Animated.View
      style={{
        padding: 12,
        paddingBottom: 2,
        transform: [{ translateY }],
        backgroundColor: "white", // Neeeded to hide content behind while scrolling,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          placeholder="Search"
          style={{
            borderWidth: 1,
            borderColor: "#AAA",
            height: 35,
            color: "black",
            padding: 5,
            paddingHorizontal: 15,
            borderRadius: 20,
            flex: 1,
          }}
        />
        <Image
          source={{
            uri: "https://images.pexels.com/photos/14711370/pexels-photo-14711370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
          }}
          style={{ width: 40, height: 40, marginLeft: 10, borderRadius: 20 }}
        />
      </View>
      {/**Can also replace here with scroll view to disable the warning, but flatlit is more prefereable */}
      <FlatList
        data={["Explore", "Holdings", "Orders", "SIPs", "Watchlist"]}
        horizontal
        ref={ref}
        renderItem={({ item, index }) => (
          <Pressable
            key={item}
            onPress={() => {
              setSelectedScreen(item);
              ref.current.scrollToIndex({ animated: true, index });
            }}
            style={[
              {
                margin: 5,
                padding: 5,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 20,
              },
              selectedScreen === item && {
                backgroundColor: "#A77DD0",
              },
            ]}
          >
            <Text>{item}</Text>
          </Pressable>
        )}
      />
    </Animated.View>
  );
};

export default ScrollableHeader;
