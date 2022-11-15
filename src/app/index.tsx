import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ChakraProvider,
  ColorModeScript,
  Flex,
  VStack,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import theme from "./theme";
import TokenizedInput from "./TokenizedInput";
import RankedItems from "./RankedItems";

function App() {
  const [tiers, setTiers] = useState<string[]>(["S", "A", "B", "C", "D", "E"]);
  const [items, setItems] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("My Tier List");

  return (
    <Flex direction="column" padding="4">
      <Flex mb="2" justify="space-between" flex="1">
        <Editable fontSize="4xl" value={title} onChange={setTitle}>
          <EditablePreview />
          <EditableInput />
        </Editable>
        <Flex alignItems="center">
          <ColorModeSwitch />
        </Flex>
      </Flex>
      <Flex direction="row">
        <RankedItems tiers={tiers} items={items} />
        <VStack ml="2" flex="1" align="stretch" spacing="4">
          <TokenizedInput
            align="stretch"
            title="Tier List"
            tokens={tiers}
            onChange={setTiers}
          />
          <TokenizedInput
            align="stretch"
            title="Items"
            tokens={items}
            onChange={setItems}
          />
        </VStack>
      </Flex>
    </Flex>
  );
}

const root = createRoot(document.querySelector("#root"));
root.render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode="system" />
    <App />
  </ChakraProvider>
);
