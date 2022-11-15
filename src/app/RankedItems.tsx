import React, { useState, useEffect, useCallback } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import {
  Box,
  Flex,
  Tag,
  TagLabel,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

const TIER_COLORS = ["red", "orange", "yellow", "green", "blue", "purple"];

function getTierColor(ix: number, total: number): string {
  const multiple = Math.ceil(total / TIER_COLORS.length);
  const remainder = total % TIER_COLORS.length;

  let bucket = Math.floor(ix / multiple);
  if (multiple > 1 && remainder && bucket >= remainder)
    bucket = Math.ceil(ix / (multiple - 1)) - remainder;

  const modifier = 3 + (ix % multiple);

  return `${TIER_COLORS[bucket]}.${modifier}00`;
}

function DraggableItem({ item }: { item: string }) {
  const [, drag] = useDrag(() => ({ type: "tierItem", item: { item } }));

  return (
    <WrapItem>
      <Tag ref={drag} size="lg" draggable as="div" cursor="grab">
        <TagLabel>{item}</TagLabel>
      </Tag>
    </WrapItem>
  );
}

function Tier({
  title,
  color,
  items = [],
  onChange,
}: {
  title: string;
  color: string;
  items: string[];
  onChange: (item: string) => void;
}) {
  const [, drop] = useDrop(
    () => ({
      accept: "tierItem",
      drop: ({ item }: { item: string }) => onChange(item),
    }),
    [onChange]
  );
  return (
    <Flex ref={drop} direction="row">
      <Box bg={color} padding="6">
        {title}
      </Box>
      <Wrap flex="1" p="4" spacing="1" bg="blackAlpha.400">
        {items.map((item) => (
          <DraggableItem key={item} item={item} />
        ))}
      </Wrap>
    </Flex>
  );
}

type RankedItemsProps = { tiers: string[]; items: string[] };
function RankedItems({ tiers, items }: RankedItemsProps) {
  console.log("rerender");
  const [rankedItems, setRankedItems] = useState<Record<string, string>>({});

  useEffect(() => {
    const defaultRankedItems = { ...rankedItems };
    items.forEach((item) => {
      if (rankedItems[item]) return;
      defaultRankedItems[item] = "unranked";
    });

    setRankedItems(defaultRankedItems);
  }, [items]);

  const onSetTier = useCallback(
    (tier: string, item: string) => {
      console.log(rankedItems, item, tier);
      setRankedItems({ ...rankedItems, [item]: tier });
    },
    [rankedItems, setRankedItems]
  );

  const itemsByTier = items.reduce((v, item) => {
    const tier = rankedItems[item];
    if (!v[tier]) v[tier] = [];
    v[tier].push(item);
    return v;
  }, {} as Record<string, string[]>);
  const unranked = itemsByTier["unranked"];
  console.log(rankedItems);
  return (
    <VStack flex="3" align="stretch">
      {tiers.map((tier, ix) => (
        <Tier
          key={tier}
          title={tier}
          color={getTierColor(ix, tiers.length)}
          items={itemsByTier[tier]}
          onChange={(item) => onSetTier(tier, item)}
        />
      ))}
      {unranked && (
        <Flex direction="row" flex="1">
          <Box padding="6" bg="gray.500">
            Unranked
          </Box>
          <Wrap flex="1" p="4" spacing="1" bg="blackAlpha.400">
            {unranked.map((item) => (
              <DraggableItem key={item} item={item} />
            ))}
          </Wrap>
        </Flex>
      )}
    </VStack>
  );
}

function DraggableRankedItems(props: RankedItemsProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <RankedItems {...props} />
    </DndProvider>
  );
}

export default DraggableRankedItems;
