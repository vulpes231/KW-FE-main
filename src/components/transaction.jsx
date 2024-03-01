import { ArrowUpIcon, DownloadIcon } from "@chakra-ui/icons";
import {
  HStack,
  Stack,
  Text,
  Circle,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Transaction({ tx }) {
  const [currentValue, SetCurrentValue] = useState("BTC");
  const credColor = useColorModeValue("green.500", "green.400");
  const debColor = useColorModeValue("red.500", "red.400");
  const { wallet } = useSelector((state) => state.wallet);
  const { coinValues } = useSelector((state) => state.coin);
  const token = wallet?.activatedCoins.find((act) => act.code === tx.code);

  const [coinPrice, setCoinPrice] = useState(0);

  //Getting Crypto conversion
  useEffect(() => {
    let Rtoken = token?.coinName.replace(" ", "-").toLowerCase();
    Rtoken = Rtoken === "xrp" ? "ripple" : Rtoken;
    Rtoken = Rtoken === "tron(trc20)" ? "tron" : Rtoken;
    Rtoken = Rtoken === "tether-usdt" ? "tether" : Rtoken;
    // console.log(Rtoken);
    //     (async function () {
    //       const Price = await axios.get(
    //         `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${Rtoken}&order=market_cap_desc&per_page=100&page=1&sparkline=false
    // `
    //       );
    //       console.log(Price.data);
    //       setCoinPrice(Price.data[0]?.current_price);
    //     })();
    let tok = coinValues?.find((coin) => coin?.id === Rtoken);
    setCoinPrice(tok?.current_price);
  }, [coinValues, token?.coinName]);

  const handleSwitch = () => {
    SetCurrentValue((prev) => !prev);
  };

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
            color={tx?.status.includes("pending") ? "yellow.500" : "green.500"}
          >
            {tx?.status}
          </Text>
        </Stack>
        <Text
          fontSize={[10, 14]}
          minW={"fit-content"}
          fontWeight={[700, 500]}
          flex={1}
          textAlign={"right"}
          cursor={"pointer"}
          onClick={handleSwitch}
        >
          {currentValue ? tx?.amount : (tx?.amount * coinPrice).toFixed(2)}{" "}
          {currentValue ? tx?.code : "USD"}
        </Text>
      </HStack>
    </Stack>
  );
}

export default Transaction;
