import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  FormControl,
  FormLabel,
  Select,
  useColorModeValue,
  Divider,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { GiTwoCoins } from "react-icons/gi";
import ActivatedCoins from "./activatedCoins";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { newWallet, reset, userWallet } from "../features/wallet/walletSlice";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "@chakra-ui/icons";

function CreateWallet() {
  const dispatch = useDispatch();
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
  const { user } = useSelector((state) => state.user);
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.wallet
  );
  const [type, setType] = useState("standard");
  const toast = useToast();
  const navigate = useNavigate();
  const [cwClicked, setCwClicked] = useState(false);

  useEffect(() => {
    async function getTokens() {
      const coins = await axios.get("https://server.kryptwallet.com/coins");
      setCoins(coins.data);
      console.log(coins.data);
      return coins.data;
    }
    getTokens();
  }, []);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Wallet Error.",
        description: `An error occurred while processing your request`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.log(message);
      dispatch(reset());
      setCwClicked(false);
    }
    if (isSuccess && cwClicked) {
      toast({
        title: "Wallet created.",
        description: "We've created your wallet for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      dispatch(reset());
      dispatch(userWallet(user));
      setCwClicked(false);
      navigate("/dashboard");
    }
  }, [
    cwClicked,
    dispatch,
    isError,
    isLoading,
    isSuccess,
    message,
    navigate,
    toast,
    user,
  ]);

  const handleWallet = () => {
    const wallet = {
      type: type,
      coins: selectedArr,
      token: user,
    };
    try {
      dispatch(newWallet(wallet));
      setCwClicked(true);
    } catch (error) {
      console.log(error);
    }
  };

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
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        px={5}
        py={10}
      >
        <Flex
          alignItems={"center"}
          display={["none", "flex"]}
          justify={"start"}
        >
          <Link to={-1}>
            <ChevronLeftIcon boxSize={8} />
          </Link>
          <Text>Back</Text>
        </Flex>
        <Stack align={"center"}>
          <GiTwoCoins size={100} color={"green"} />
          <Heading
            fontFamily={`"Euclid Circular B"`}
            fontSize={["3xl", "4xl"]}
            textAlign={"center"}
          >
            Create New Wallet
          </Heading>
          <Text
            fontSize={["md", "lg"]}
            color={useColorModeValue("gray.800", "gray.400")}
          >
            Select Type of wallet and cryptocurrencies to Show in Krypt Wallet.
          </Text>
        </Stack>
        <Divider />
        <FormControl>
          <FormLabel>Wallet Type</FormLabel>
          <Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="hidden">Hidden Wallet</option>
            <option value="standard">Standard Wallet</option>
          </Select>
        </FormControl>
        <Divider />
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
            isLoading={isLoading}
            loadingText="Creating"
            onClick={handleWallet}
            isDisabled={selectedArr.length === 0}
          >
            Continue
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default CreateWallet;
