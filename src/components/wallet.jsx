import { CheckIcon } from "@chakra-ui/icons";
import { Box, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { setWallet } from "../features/wallet/walletSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NumberBeautify from "js-number-beautifier";

function Wallet({ wallet, id, aveWall, setAveWall }) {
  const checkColor = useColorModeValue("green.500", "green.400");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { coinValues } = useSelector((state) => state.coin);
  const [walletValue, setWalletValue] = useState(0);

  useEffect(() => {
    console.log(wallet?.activatedCoins);
    let de = 0;
    wallet?.activatedCoins?.forEach((wall) => {
      let Rtoken = wall?.coinName.replace(" ", "-").toLowerCase();
      Rtoken = Rtoken === "xrp" ? "ripple" : Rtoken;
      Rtoken = Rtoken === "tron(trc20)" ? "tron" : Rtoken;
      Rtoken = Rtoken === "tether-usdt" ? "tether" : Rtoken;

      let tok = coinValues?.find((coin) => coin?.id === Rtoken);

      let v = Number(tok?.current_price) * Number(wall?.amount);
      if (tok) {
        de += v;
      }
    });
    setWalletValue(de);
  }, [coinValues, wallet?.activatedCoins]);

  return (
    <Flex
      align={"top"}
      gap={2}
      px={4}
      my={1}
      cursor={"pointer"}
      onClick={() => {
        setAveWall(id);
        dispatch(setWallet({ ...wallet, index: id }));
        navigate("/dashboard");
      }}
    >
      <CheckIcon visibility={aveWall !== id && "hidden"} color={checkColor} />
      <Box rounded={"full"}>
        <svg style={{ borderRadius: "50%" }} x="0" y="0" width="24" height="24">
          <rect
            x="0"
            y="0"
            width="24"
            height="24"
            transform="translate(-0.2718058742913141 5.432025026924122) rotate(199.0 12 12)"
            fill="#FA7D00"
          ></rect>
          <rect
            x="0"
            y="0"
            width="24"
            height="24"
            transform="translate(-4.03459375339463 -12.227246394311111) rotate(379.4 12 12)"
            fill="#F94701"
          ></rect>
          <rect
            x="0"
            y="0"
            width="24"
            height="24"
            transform="translate(-16.326930906114146 -1.712536773390393) rotate(275.6 12 12)"
            fill="#FB1858"
          ></rect>
        </svg>
      </Box>

      <Stack>
        <Text
          marginTop={"0 !important"}
          fontFamily={`"Euclid Circular B"`}
          fontSize={16}
          fontWeight={500}
        >
          Wallet {id + 1}
        </Text>
        <Text
          marginTop={"0 !important"}
          fontWeight={400}
          fontFamily={`"Euclid Circular B"`}
          fontSize={14}
        >
          {/* {Number(wallet?.activatedCoins?.[0].amount).toFixed(1) || 0}{" "}
          {wallet.activatedCoins?.[0].code} */}
          ${NumberBeautify(walletValue.toFixed(2))}
        </Text>
      </Stack>
    </Flex>
  );
}

export default Wallet;
