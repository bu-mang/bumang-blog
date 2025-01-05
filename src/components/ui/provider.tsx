"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

export function Provider(props: ColorModeProviderProps) {
  // TODO: forcedTheme="light" 없애기
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} forcedTheme="light" />
    </ChakraProvider>
  );
}
