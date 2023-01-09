import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { Animated, ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ScrollableHeader from "./components/ScrollableHeader";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import MutualFunds from "./screens/MutualFunds";
import SIP from "./screens/SIP";

export default function App() {
  // this state maybe inside react-navigation
  // or maybe just a context
  const [screenSelected, setScreenSelected] = useState("Explore");
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const yOffset = useRef(new Animated.Value(0));

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <StatusBar />
        <Animated.ScrollView
          style={{ flex: 1, marginTop: 14 }}
          stickyHeaderIndices={[0]}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: yOffset.current } } }],
            { useNativeDriver: true }
          )}
        >
          <ScrollableHeader
            yOffset={yOffset}
            selectedScreen={screenSelected}
            setSelectedScreen={setScreenSelected}
          />
          {screenSelected === "SIPs" ? <SIP /> : <MutualFunds />}
        </Animated.ScrollView>
      </SafeAreaProvider>
    );
  }
}
