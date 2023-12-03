import React, { useState } from "react";
import { Flex, useColorModeValue, Image, Text } from "@chakra-ui/react";
function ActivatedCoins({ code, name, link, setArr, coin, Arr }) {
  const [selected, setSelected] = useState(code === "btc");

  const handleArr = () => {
    const token = Arr.find((arr) => arr.code === coin.code);
    if (token) {
      const newArr = Arr.filter((arr) => arr.code !== coin.code);
      setArr(newArr);
    } else {
      setArr([...Arr, coin]);
    }
  };

  return (
    <Flex
      align={"center"}
      justify={"center"}
      gap={5}
      bg={useColorModeValue("gray.50", "gray.800")}
      rounded={"xl"}
      py={2}
      px={4}
      borderWidth={2}
      borderStyle={"solid"}
      borderColor={useColorModeValue(
        `${selected ? "green.500" : "gray.500"}`,
        `${selected ? "green.800" : "gray.800"}`
      )}
      cursor={"pointer"}
      onClick={() => {
        setSelected(!selected);
        handleArr();
      }}
    >
      <Image w={4} src={link} alt={code} />
      <Text fontSize={16}>{name}</Text>
    </Flex>
  );
}

export default ActivatedCoins;
