import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: true,
};
const styles = {
  global: {
    body: { bg: "whiteAlpha.300" },
  },
};

const theme = extendTheme({ config, styles });

export default theme;
