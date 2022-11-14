import React, { useState, createRef } from "react";
import {
  Button,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Tag,
  TagLabel,
  VStack,
  StackProps,
  TagCloseButton,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

function TokenizedInput({
  title,
  tokens,
  onChange,
  ...rest
}: {
  title: string;
  tokens: string[];
  onChange: (tokens: string[]) => void;
} & Omit<StackProps, "onChange">) {
  const [pending, setPending] = useState<string>("");
  const inputRef = createRef<HTMLInputElement>();

  const addToken = (t: string) => {
    if (!t.trim()) return;
    onChange([...tokens, t.trim()]);
    setPending("");
    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <VStack {...rest}>
      <Text>{title}:</Text>
      <InputGroup>
        <Input
          ref={inputRef}
          size="sm"
          value={pending}
          onChange={(e) => {
            setPending(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") addToken(pending);
          }}
        />
        <InputRightElement height="8" mr="1" onClick={() => addToken(pending)}>
          <Button size="xs" disabled={!pending}>
            Add
          </Button>
        </InputRightElement>
      </InputGroup>
      <Wrap mt="2" spacing="1">
        {tokens.map((token) => (
          <WrapItem>
            <Tag as="div" key={token} size="sm" draggable>
              <TagLabel>{token}</TagLabel>
              <TagCloseButton
                onClick={() => {
                  onChange(tokens.filter((t) => t !== token));
                  setPending("");
                }}
              />
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
    </VStack>
  );
}
export default TokenizedInput;
