import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ScrollableHeader from "./components/ScrollableHeader";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import MutualFunds from "./screens/MutualFunds";
import SIP from "./screens/SIP";
import { SceneMap, TabView } from "react-native-tab-view";
import { OffsetProvider } from "./Context/OffsetContext";

const renderScene = SceneMap({
  Explore: MutualFunds,
  Holdings: MutualFunds,
  Orders: MutualFunds,
  SIPs: SIP,
  Watchlist: MutualFunds,
});

const routes = [
  { key: "Explore", title: "Explore" },
  { key: "Holdings", title: "Holdings" },
  { key: "Orders", title: "Orders" },
  { key: "SIPs", title: "SIPs" },
  { key: "Watchlist", title: "Watchlist" },
];

const TabNames = ["Explore", "Holdings", "Orders", "SIPs", "Watchlist"];

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [index, setIndex] = useState(0);
  const { width } = useWindowDimensions();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <OffsetProvider>
        <SafeAreaProvider>
          <StatusBar />
          {/* <Animated.ScrollView
          style={{ flex: 1, marginTop: 14 }}
          stickyHeaderIndices={[0]}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: yOffset.current } } }],
            { useNativeDriver: true }
          )}
          contentContainerStyle={{ flexGrow: 1, flex: 1 }}
        > */}
          <TabView
            renderScene={renderScene}
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderTabBar={(props) => (
              <ScrollableHeader
                selectedScreen={TabNames[props.navigationState.index]}
                setSelectedScreen={props.jumpTo}
              />
            )}
            initialLayout={{ width }}
          />
          {/* </Animated.ScrollView> */}
        </SafeAreaProvider>
      </OffsetProvider>
    );
  }
}
