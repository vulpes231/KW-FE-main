import { Center, Heading, useToast } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  Flex,
  Stack,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyTransactionPin } from "../features/user/userSlice";
import { txWallet } from "../features/wallet/walletSlice";
import { newTransaction } from "../features/transaction/transactionSlice";
import { useNavigate } from "react-router-dom";

export default function VerifyPinCard({
  sender,
  type,
  receiver,
  amount,
  coin,
  fee,
}) {
  const [pin, setPin] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const wallet = useSelector((state) => state.wallet);
  const tx = useSelector((state) => state.transaction);
  const toast = useToast();
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isSuccess && isClicked) {
      dispatch(
        txWallet({
          info: { sender, type, amount, receiver, coin, fee },
          user: user.user,
        })
      );
    }
    if (user.isError) {
      toast({
        title: "Error",
        description:
          user.message === "Network Error" ? user.message : "Incorrect Pin",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [
    amount,
    coin,
    dispatch,
    receiver,
    sender,
    type,
    fee,
    user.isSuccess,
    user.user,
    user.isError,
    user.message,
    toast,
    isClicked,
  ]);

  useEffect(() => {
    const transaction = {
      walletId: sender,
      to: receiver,
      amount,
      type,
      desc: `Sending ${coin}`,
      code: coin,
      fee: fee,
    };
    if (wallet.isSuccess && isClicked) {
      dispatch(newTransaction(transaction));
    }
    wallet.isError && console.log(wallet.message);
  }, [
    amount,
    coin,
    dispatch,
    receiver,
    sender,
    type,
    wallet.isError,
    wallet.isSuccess,
    wallet.message,
    fee,
    isClicked,
  ]);

  useEffect(() => {
    if (tx.isSuccess && isClicked) {
      toast({
        title: "Transaction Successful",
        description: `${amount} ${coin} sent to ${receiver}`,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setIsClicked(false);
      navigate("/dashboard");
    }
  }, [amount, coin, isClicked, navigate, receiver, toast, tx.isSuccess]);

  const handleVerifyPin = () => {
    setIsClicked(true);
    try {
      dispatch(verifyTransactionPin({ pin, user: user.user }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Flex align={"center"} justify={"center"}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"sm"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={10}
      >
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Enter Pin
          </Heading>
        </Center>
        <Center
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          Enter pin to complete transaction.
        </Center>

        <FormControl>
          <Center>
            <HStack>
              <PinInput
                defaultValue={pin}
                onChange={(e) => {
                  setPin(e);
                }}
                mask
              >
                <PinInputField _focus={{ borderColor: "green.400" }} />
                <PinInputField _focus={{ borderColor: "green.400" }} />
                <PinInputField _focus={{ borderColor: "green.400" }} />
                <PinInputField _focus={{ borderColor: "green.400" }} />
              </PinInput>
            </HStack>
          </Center>
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={"green.400"}
            color={"white"}
            _hover={{
              bg: "green.500",
            }}
            isLoading={wallet.isLoading || tx.isLoading}
            isDisabled={pin.length !== 4 || isClicked}
            onClick={handleVerifyPin}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
