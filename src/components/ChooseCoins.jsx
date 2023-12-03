import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GiTwoCoins } from "react-icons/gi";
import ActivatedCoins from "./activatedCoins";
import axios from "axios";

function ChooseCoins({ buildWallet }) {
  const [coins, setCoins] = useState([]);
  const [selectedArr, setSelectedArr] = useState([
    {
      amount: 0,
      code: "BTC",
      address: "bc1qzq0a3z4293z40af6hea00vyall2a646z427jak",
      coinName: "Bitcoin",
      img: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      __v: 0,
      _id: "63e76100da1821d053c21432",
    },
  ]);

  const [clicked, setClicked] = useState(false); //checking if button is clicked

  //getting coins
  useEffect(() => {
    async function getTokens() {
      const coins = await axios.get("https://server.kryptwallet.com/coins");
      setCoins(coins.data);
      return coins.data;
    }
    getTokens();
  }, []);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      fontFamily={`"Euclid Circular B"`}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"xl"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        px={5}
        py={10}
      >
        <Stack align={"center"}>
          <GiTwoCoins size={100} color={"green"} />
          <Heading
            fontFamily={`"Euclid Circular B"`}
            fontSize={"4xl"}
            textAlign={"center"}
          >
            Activate Coins
          </Heading>
          <Text
            fontSize={"lg"}
            color={useColorModeValue("gray.800", "gray.400")}
          >
            Select cryptocurrencies to Show in Krypt Wallet.
          </Text>
        </Stack>
        <hr />
        <Stack>
          <Text fontSize={"sm"} fontWeight={"bold"} textAlign={"left"}>
            {coins?.length} Coins . {selectedArr.length} selected
          </Text>
          <Flex align={"center"} justify={"center"} gap={5} wrap={"wrap"}>
            {coins?.map((coin, index) => {
              return (
                <ActivatedCoins
                  key={index}
                  name={coin.coinName}
                  code={coin.code}
                  link={coin.img}
                  coin={coin}
                  Arr={selectedArr}
                  setArr={setSelectedArr}
                />
              );
            })}
          </Flex>
        </Stack>
        <Stack spacing={6}>
          <Button
            bg={"green.400"}
            color={"white"}
            _hover={{
              bg: "green.500",
            }}
            onClick={() => buildWallet(setClicked, selectedArr)}
            isDisabled={selectedArr.length === 0 || clicked}
          >
            Continue
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default ChooseCoins;
