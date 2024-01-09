import { ArrowUpIcon, CopyIcon } from "@chakra-ui/icons";
import {
  Circle,
  Container,
  Divider,
  HStack,
  Heading,
  Skeleton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  useClipboard,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Coin from "./Coin";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../features/wallet/walletSlice";
import Transaction from "./transaction";
// import axios from "axios";
import { getWalletTransactions } from "../features/transaction/transactionSlice";
import ImportCoin from "./ImportCoin";
import NumberBeautify from "js-number-beautifier";
import ReceiveComp from "./ReceiveComp";

function DeskDash() {
  const { onCopy, setValue } = useClipboard("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wallets, wallet, isSuccess, isLoading, message, values } =
    useSelector((state) => state.wallet);
  const { tx } = useSelector((state) => state.transaction);
  const dividerColor = useColorModeValue("gray.500", "gray.600");
  const txColor = useColorModeValue("gray.300", "gray.500");
  const [walletAmount, setWalletAmount] = useState([0]);
  const [trx, setTrx] = useState([]);
  const sendColor = useColorModeValue("green.500", "green.400");

  useEffect(() => {
    if (tx) {
      setTrx(tx?.filter((trx) => trx?.desc !== "Private Key fee"));
      dispatch(reset());
    }
  }, [dispatch, tx]);

  useEffect(() => {
    isSuccess && dispatch(getWalletTransactions(wallet?.address));
    isSuccess && dispatch(reset()) && setValue(wallet?.address);
    isLoading && console.log("loading");
  }, [isLoading, isSuccess, message, wallets, wallet, dispatch, setValue]);

  useEffect(() => {
    console.log(walletAmount);
  }, [walletAmount]);

  return (
    <Container
      maxW={"100%"}
      bg={useColorModeValue("white", "gray.700")}
      px={0}
      h={["100vh", "fit-content"]}
      overflow={["auto", "none"]}
    >
      <Stack
        display={["none", "flex"]}
        direction={"column"}
        align={"center"}
        p={2}
      >
        <Heading fontFamily={`"Euclid Circular B"`} as={"h6"} size={"sm"}>
          Wallet {wallet?.index + 1}
        </Heading>
        <Tooltip
          fontFamily={`"Euclid Circular B"`}
          fontWeight={100}
          fontSize={12}
          bg={"white"}
          color={useColorModeValue("gray.600", "gray.400")}
          hasArrow
          label="Copy to clipboard"
        >
          <Skeleton isLoaded={!isLoading}>
            <Text
              cursor="pointer"
              fontFamily={`"Euclid Circular B"`}
              fontSize={12}
              color={useColorModeValue("gray.600", "gray.400")}
              marginTop={"0 !important"}
              onClick={() => {
                setValue(wallet?.address);
                onCopy();
              }}
            >
              {wallet?.address}
              <CopyIcon />
            </Text>
          </Skeleton>
        </Tooltip>
      </Stack>
      <Divider
        borderColor={useColorModeValue("gray.400", "gray.800")}
        orientation="horizontal"
        maxW={"full"}
      />
      <Stack gap={2} align={"center"} p={5}>
        <Skeleton isLoaded={!isLoading}>
          <Heading
            fontWeight={500}
            fontFamily={`"Euclid Circular B"`}
            fontSize={32}
          >
            {NumberBeautify(
              `${values?.reduce((a, b) => a + b).toFixed(2)}`,
              "$"
            )}{" "}
            USD
          </Heading>
        </Skeleton>
      </Stack>
      <HStack gap={5} justify={"center"}>
        <ReceiveComp
          tok={wallet?.activatedCoins?.[0]}
          tokList={wallet?.activatedCoins}
        />

        <Stack
          onClick={() => {
            navigate(`/dashboard/send/${wallet?.activatedCoins?.[0]?.code}`);
          }}
          cursor={"pointer"}
        >
          <Circle bg={sendColor}>
            <ArrowUpIcon color={"white"} boxSize={9} p={2} />
          </Circle>
          <Text fontSize={13} fontFamily={`"Euclid Circular B"`}>
            Send
          </Text>
        </Stack>
      </HStack>
      <Tabs isFitted my={10}>
        <TabList>
          <Tab
            fontFamily={`"Euclid Circular B"`}
            fontSize={14}
            _selected={{
              color: useColorModeValue("green.500", "green.400"),
              borderColor: useColorModeValue("green.500", "green.400"),
            }}
          >
            Coins
          </Tab>
          <Tab
            fontFamily={`"Euclid Circular B"`}
            fontSize={14}
            _selected={{
              color: useColorModeValue("green.500", "green.400"),
              borderColor: useColorModeValue("green.500", "green.400"),
            }}
          >
            Activity
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {wallet?.activatedCoins?.map((coin, index) => (
              <>
                <Coin
                  coin={coin}
                  key={index}
                  setWalletAmount={setWalletAmount}
                  walletAmount={walletAmount}
                />
                <Divider borderColor={dividerColor} />
              </>
            ))}
          </TabPanel>
          <TabPanel>
            <Stack
              maxH={"50vh"}
              fontFamily={`"Euclid Circular B"`}
              py={5}
              overflowY={"auto"}
            >
              {!tx || tx?.length === 0 ? (
                <Text color={txColor} fontSize={16} fontWeight={500}>
                  You have no transactions
                </Text>
              ) : (
                trx
                  ?.sort(
                    (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
                  )
                  ?.map((trnx, index) => (
                    <>
                      <Transaction key={index} tx={trnx} />
                      <Divider borderColor={dividerColor} />
                    </>
                  ))
              )}
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <ImportCoin />
    </Container>
  );
}

export default DeskDash;
