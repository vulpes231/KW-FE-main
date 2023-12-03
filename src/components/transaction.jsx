import { ArrowUpIcon, DownloadIcon } from "@chakra-ui/icons";
import {
  HStack,
  Stack,
  Text,
  Circle,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

function Transaction({ tx }) {
  const credColor = useColorModeValue("green.500", "green.400");
  const debColor = useColorModeValue("red.500", "red.400");
  return (
    <Stack>
      <Text fontSize={[12, 14]} textAlign={"left"}>
        {Intl.DateTimeFormat("en", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }).format(new Date(tx.createdAt))}
      </Text>
      <HStack>
        <Circle
          maxW={[8, 12]}
          border={"1px"}
          borderColor={tx?.type === "credit" ? credColor : debColor}
        >
          {tx?.type === "credit" ? (
            <DownloadIcon color={"green.400"} boxSize={[7, 9]} p={2} />
          ) : (
            <ArrowUpIcon color={"red.500"} boxSize={[7, 9]} p={2} />
          )}
        </Circle>
        <Stack align="start" maxW={["75%", "100%"]}>
          <Text fontSize={[10, 14]} isTruncated maxW={["80%", "100%"]}>
            {tx?.type === "credit" ? "Received" : "Sent"} {tx?.code}{" "}
            {tx?.type === "credit" ? "from" : "to"} {tx?.to}
          </Text>
          <Text
            fontSize={[12, 14]}
            mt={"0 !important"}
            fontWeight={700}
            color={tx?.status === "pending" ? "yellow.500" : "green.500"}
          >
            {tx?.status === "pending" ? "pending..." : "Confirmed"}
          </Text>
        </Stack>
        <Text
          fontSize={[10, 14]}
          minW={"fit-content"}
          fontWeight={[700, 500]}
          flex={1}
          textAlign={"right"}
        >
          {tx?.amount} {tx?.code}
        </Text>
      </HStack>
    </Stack>
  );
}

export default Transaction;
