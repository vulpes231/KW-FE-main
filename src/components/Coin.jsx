import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Flex,
  HStack,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import NumberBeautify from "js-number-beautifier";
import { addWalletBalance } from "../features/wallet/walletSlice";

function Coin({ coin, walletAmount, setWalletAmount }) {
  const navigate = useNavigate();
  const [coinPrice, setCoinPrice] = useState(null);
  const { isLoading, values } = useSelector((state) => state.wallet);
  const { coinValues } = useSelector((state) => state.coin);
  const dispatch = useDispatch();

  useEffect(() => {
    let Rtoken = coin?.coinName.replace(" ", "-").toLowerCase();
    Rtoken = Rtoken === "xrp" ? "ripple" : Rtoken;
    Rtoken = Rtoken === "tron(trc20)" ? "tron" : Rtoken;
    Rtoken = Rtoken === "tether-usdt" ? "tether" : Rtoken;
    //     (async function () {
    //       const Price = await axios.get(
    //         `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${Rtoken}&order=market_cap_desc&per_page=100&page=1&sparkline=false
    // `
    //       );
    //       if (Price.data[0]?.current_price) {
    //         setCoinPrice(Price.data[0]?.current_price);
    //         setWalletAmount((amount) => [
    //           ...amount,
    //           coin?.amount * Price.data[0]?.current_price,
    //         ]);
    //       }
    //     })();
    let tok = coinValues?.find((coin) => coin?.id === Rtoken);
    setCoinPrice(tok?.current_price);
    // console.log(coinValues);
  }, [coin.coinName, coinValues]);

  useEffect(() => {
    if (coinPrice) {
      let v = coin?.amount * coinPrice;
      // setWalletAmount((amount) => [...amount, v]);
      !values?.includes(v) && dispatch(addWalletBalance(v));
    }
  }, [coin?.amount, coinPrice, dispatch, setWalletAmount, values]);

  const handleClick = () => {
    navigate(`/dashboard/coin/${coin?.code}`);
  };

  return (
    <Skeleton isLoaded={!isLoading}>
      <Flex
        fontFamily={`"Euclid Circular B"`}
        align={"center"}
        justify={"space-between"}
        py={5}
        cursor={"pointer"}
        onClick={handleClick}
      >
        <HStack gap={3}>
          <Avatar size={"sm"} src={coin?.img} />
          <Stack align={"start"}>
            <Text marginTop={"0 !important"} fontSize={16}>
              {Number(coin?.amount).toFixed(1) || 0} {coin?.code} /{" "}
              <Text as={"i"} fontSize={12} fontWeight={100}>
                {NumberBeautify(`${coinPrice?.toFixed(2)}`)} USD
              </Text>
            </Text>
            <Text
              marginTop={"0 !important"}
              color={useColorModeValue("gray.500", "gray.300")}
              fontSize={14}
              fontWeight={300}
            >
              $
              {NumberBeautify(`${(coin?.amount * coinPrice).toFixed(2)}`) ||
                0.0}
              {coin?.amount === 0 && `.00`} USD
            </Text>
          </Stack>
        </HStack>

        <ChevronRightIcon boxSize={8} />
      </Flex>
    </Skeleton>
  );
}

export default Coin;
