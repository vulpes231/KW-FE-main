import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActivatedCoins from "./activatedCoins";
import { addToken, reset } from "../features/wallet/walletSlice";

function ImportCoin() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { wallet, isSuccess } = useSelector((state) => state.wallet);
  const [coins, setCoins] = useState([]);
  const [selectedArr, setSelectedArr] = useState([]);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getTokens() {
      const coin = await axios.get("https://server.kryptwallet.com/coins");

      let cois = [];
      wallet?.activatedCoins?.forEach((e) => cois.push(e.code));
      let selcoin = coin.data.filter((coi) => cois.indexOf(coi.code) === -1);
      setCoins(selcoin);
    }
    getTokens();
    dispatch(reset());
  }, [dispatch, wallet?.activatedCoins]);

  useEffect(() => {
    isSuccess && onClose();
  }, [isSuccess, onClose]);
  const handleCoin = () => {
    const coin = {
      info: {
        walletId: wallet?._id,
        coins: selectedArr,
      },
      user: user,
    };
    try {
      dispatch(addToken(coin));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      fontFamily={`"Euclid Circular B"`}
      p={2}
      m={3}
      align={"center"}
      justify={"center"}
    >
      <Text
        cursor={"pointer"}
        onClick={onOpen}
        color={useColorModeValue("green.500", "green.400")}
      >
        Import Coin
      </Text>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent fontFamily={`"Euclid Circular B"`}>
          <ModalHeader>Add Coins To Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Choose which coins you want added to your wallet.
            <Flex
              align={"center"}
              justify={"center"}
              gap={3}
              my={3}
              wrap={"wrap"}
            >
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
          </ModalBody>
          <ModalFooter>
            <Button
              bg={useColorModeValue("green.500", "green.400")}
              isDisabled={selectedArr.length === 0}
              onClick={handleCoin}
            >
              Import
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default ImportCoin;
