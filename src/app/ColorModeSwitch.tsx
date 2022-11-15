import React from "react";
import { Switch, FormControl, FormLabel, useColorMode } from "@chakra-ui/react";

function ColorModeSwitch() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <FormControl display="flex">
      <FormLabel htmlFor="email-alerts" mb="0">
        Dark Mode
      </FormLabel>
      <Switch
        size="md"
        id="color-mode"
        onChange={toggleColorMode}
        isChecked={colorMode === "dark"}
      />
    </FormControl>
  );
}
export default ColorModeSwitch;
