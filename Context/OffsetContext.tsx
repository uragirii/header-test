import React, { createContext, FC, useContext, useRef } from "react";
import { Animated } from "react-native";
const OffsetContext = createContext<React.MutableRefObject<Animated.Value>>(
  null!
);

export const useYOffset = () => {
  const context = useContext(OffsetContext);
  if (!context) {
    throw new Error("useYOffset inside Provider");
  }
  return context;
};

export const OffsetProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const yOffset = useRef(new Animated.Value(0));
  return (
    <OffsetContext.Provider value={yOffset}>{children}</OffsetContext.Provider>
  );
};
