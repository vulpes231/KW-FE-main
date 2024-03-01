import {
  Avatar,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
  Select,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
import VerifyPinCard from "./verifyPinCard";
import { reset as WalReset } from "../features/wallet/walletSlice";
import {
  newTransaction,
  reset as txReset,
} from "../features/transaction/transactionSlice";
import { reset } from "../features/user/userSlice";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import NumberBeautify from "js-number-beautifier";

function Send() {
  const { coin } = useParams();
  const [tx, setTx] = useState({
    to: "",
    type: "debit",
    amount: 0,
    code: coin,
    fee: 0.025,
  });
  const { wallet, wallets } = useSelector((state) => state.wallet);
  const { setting } = useSelector((state) => state.user);
  const token = wallet?.activatedCoins.find((act) => act.code === tx.code);
  const navigate = useNavigate();
  const [coinPrice, setCoinPrice] = useState(0);
  const { isOpen, onClose } = useDisclosure();
  const [pWallet, setPWallet] = useState(null);
  const toast = useToast();
  const dispatch = useDispatch();
  const [isUsd, setIsUsd] = useState(false);
  const [pk, setPk] = useState("");
  const { coinValues } = useSelector((state) => state.coin);
  const trx = useSelector((state) => state.transaction);
  const [isClicked, setIsClicked] = useState(false);

  const [touchedFields, setTouchedFields] = useState({
    to: false,
    amount: false,
    code: false,
    fund: false,
    pk: false,
  });

  //handling state reset events
  useEffect(() => {
    dispatch(WalReset());
    dispatch(txReset());
    dispatch(reset());
  }, [dispatch]);

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

  //handling getting pk wallet
  useEffect(() => {
    if (wallets) {
      setPWallet(wallets.find((wall) => wall.pk === true));
    }
  }, [wallets]);

  //handling tx value change
  const handleChange = (e) => {
    setTx({ ...tx, [e.target.name]: e.target.value });
    setTouchedFields({ ...touchedFields, [e.target.name]: true });
  };

  //handling currency change
  const handleSwitch = () => {
    setIsUsd(!isUsd);
  };

  const isError = {
    to: touchedFields.to && (tx.to.length < 10 || tx.to.trim() === ""),
    amount:
      touchedFields.amount &&
      (isUsd
        ? tx.amount <= 0 || tx.amount > token?.amount * coinPrice
        : tx.amount <= 0 || tx.amount > token?.amount),
    code: touchedFields.code && tx.code === "",
    fund:
      touchedFields.fund &&
      (isUsd
        ? tx.amount / coinPrice > token?.amount ||
          Number(tx.amount) / coinPrice + tx.fee > token?.amount
        : tx.amount > token?.amount ||
          Number(tx.amount) + tx.fee > token?.amount),
    pk: touchedFields.pk && pk.length < 3,
  };

  useEffect(() => {
    if (trx.isSuccess && isClicked) {
      toast({
        title: "Transaction Sent!",
        description: "Transaction Sent!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setIsClicked(false);
      navigate("/dashboard");
    }
  }, [isClicked, navigate, toast, trx.isSuccess]);

  //handling Sending
  const handleSend = () => {
    const transaction = {
      walletId: wallet?.address,
      to: tx.to,
      amount: !isUsd ? tx.amount : tx.amount / coinPrice,
      type: "debit",
      desc: `Sending ${tx.code}`,
      code: tx.code,
      fee: tx.fee,
    };
    if (pk !== pWallet?.privateKey) {
      toast({
        title: "Private Key Error",
        description: "Invalid/Wrong Private Key",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else if (tx.to.length < 10 || tx.to.trim() === "") {
      toast({
        title: "Address field is required!",
        description: "Invalid/Wrong wallet address",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      // onOpen();
      // toast({
      //   title: "Successful",
      //   description: "Transaction completed",
      //   status: "success",
      //   duration: 5000,
      //   isClosable: true,
      // });
      dispatch(newTransaction(transaction));
      setIsClicked(true);
      // navigate("/dashboard");
    }
  };

  return (
    <Container
      bg={useColorModeValue("white", "gray.700")}
      maxW={"100%"}
      fontFamily={`"Euclid Circular B"`}
      rounded={12}
    >
      <Stack direction={"row"} align={"center"} shadow={"sm"} py={3}>
        <Link to={-1}>
          <ChevronLeftIcon boxSize={8} />
        </Link>
        <Heading
          fontFamily={`"Euclid Circular B"`}
          fontSize={18}
          fontWeight={400}
        >
          Wallet {wallet?.index + 1} / <strong>Send {tx?.code}</strong>
        </Heading>
      </Stack>
      <Stack py={3}>
        <FormControl isInvalid={isError.to}>
          <FormLabel>Address</FormLabel>
          <Input
            type="text"
            name="to"
            borderColor={"teal"}
            _focusVisible={{ borderColor: "teal" }}
            value={tx.to}
            placeholder={`${token?.code} Address`}
            onChange={handleChange}
            required
          />
          {!isError.to ? (
            <FormHelperText>
              Enter the Wallet Address of receipient.
            </FormHelperText>
          ) : (
            <FormErrorMessage>
              {touchedFields.to && isError.to && "Address is required."}
            </FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={isError.code}>
          <FormLabel>Coin</FormLabel>
          <Select
            name="code"
            value={tx.code}
            onChange={handleChange}
            borderColor={"teal"}
          >
            {wallet?.activatedCoins?.map((coin, index) => (
              <option key={index} value={coin.code}>
                {coin.coinName}
              </option>
            ))}
          </Select>
          <HStack gap={3} my={2} p={2} border={"1px"} borderRadius={6}>
            <Avatar size={"sm"} src={token?.img} />
            <Stack align={"start"}>
              <Text marginTop={"0 !important"} fontSize={16}>
                {token?.code}
              </Text>
              <Text
                marginTop={"0 !important"}
                color={useColorModeValue("gray.500", "gray.300")}
                fontSize={14}
                fontWeight={300}
              >
                Balance: {token?.amount || 0} {token?.code}
              </Text>
            </Stack>
          </HStack>
          {isError.code && (
            <FormErrorMessage>Insufficient Funds</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={isError.amount || isError.fund}>
          <FormLabel>Amount</FormLabel>
          <Stack direction={"column"}>
            <Flex
              align={"center"}
              borderRadius={6}
              border={"1px"}
              borderColor={isError.amount || isError.fund ? "red" : "teal"}
              pr={3}
            >
              <Input
                type="number"
                min={0}
                name="amount"
                value={tx.amount}
                onChange={handleChange}
                _focusVisible={{ border: "none" }}
                _focusWithin={{ border: "none" }}
                border={"none"}
                maxW={["100%"]}
                flex={1}
              />{" "}
              <Text
                cursor={"pointer"}
                fontWeight={"bold"}
                onClick={handleSwitch}
              >
                {!isUsd ? tx.code : "USD"}
              </Text>
            </Flex>
            <Text textAlign={"left"} px={2}>
              {!isUsd
                ? "$" + NumberBeautify(`${(tx.amount * coinPrice).toFixed(2)}`)
                : (tx.amount / coinPrice).toFixed(6) > 1
                ? NumberBeautify(`${(tx.amount / coinPrice).toFixed(6)}`)
                : (tx.amount / coinPrice).toFixed(6)}
              <strong style={{ cursor: "pointer" }} onClick={handleSwitch}>
                {isUsd ? tx.code : "USD"}
              </strong>
            </Text>
          </Stack>

          {!isError.amount ? (
            <FormHelperText>Amount is required</FormHelperText>
          ) : (
            <FormErrorMessage>
              {touchedFields.amount && isError.amount && tx.amount <= 0
                ? "Amount must be greater than 0."
                : "Insufficient funds."}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={isError.pk}>
          <FormLabel>Private Key</FormLabel>
          <Input
            type="text"
            name="pk"
            borderColor={"teal"}
            _focusVisible={{ borderColor: "teal" }}
            value={pk}
            placeholder={`Private Key`}
            onChange={(e) => setPk(e.target.value)}
          />
          {!isError.pk ? (
            <FormHelperText>Enter the Private Key Value.</FormHelperText>
          ) : (
            <FormErrorMessage>
              {touchedFields.pk &&
                isError.pk &&
                "Private Key Value is required."}
            </FormErrorMessage>
          )}
        </FormControl>
      </Stack>
      {token?.coinName === "ethereum" && (
        <Stack p={2} border={"1px"} borderRadius={6}>
          <HStack justify={"space-between"}>
            <Stack>
              <Text fontSize={12} fontWeight={300}>
                <strong>Gas</strong> <i>(estimated)</i>
              </Text>
            </Stack>
            <Stack>
              <Text fontSize={14} fontWeight={300}>
                $
                {isUsd
                  ? Number(tx?.amount).toFixed(2)
                  : (tx.amount * coinPrice).toFixed(2)}{" "}
                <strong>
                  {!isUsd
                    ? Number(tx?.amount)
                    : (tx.amount / coinPrice).toFixed(6)}{" "}
                  {tx.code}
                </strong>
              </Text>
              <Text fontSize={12} fontWeight={300}>
                <strong>Max fee:</strong> {tx.amount > 0 ? setting?.gasfee : 0}{" "}
                {tx?.code}
              </Text>
            </Stack>
          </HStack>
          <Divider borderBottomWidth={"2px"} />
          <HStack justify={"space-between"}>
            <Stack align={"start"}>
              <Text fontSize={14} fontWeight={300}>
                <strong>Total</strong>
              </Text>
              <Text fontSize={12} fontWeight={300}>
                Amount + gas fee
              </Text>
            </Stack>
            <Stack>
              <Text fontSize={14} fontWeight={300}>
                $
                {isUsd
                  ? Number(tx?.amount).toFixed(2)
                  : (tx.amount * coinPrice).toFixed(2)}{" "}
                <strong>
                  {!isUsd
                    ? Number(tx?.amount)
                    : (tx.amount / coinPrice).toFixed(6)}{" "}
                  {tx.code}
                </strong>
              </Text>
              <Text fontSize={12} fontWeight={300}>
                <strong>Max fee:</strong>
                <br />
                {tx.amount > 0 ? setting?.gasfee : 0} {tx?.code}
              </Text>
            </Stack>
          </HStack>
        </Stack>
      )}

      <HStack fontFamily={`"Euclid Circular B"`} justify={"center"} my={4}>
        <Button
          fontFamily={`"Euclid Circular B"`}
          colorScheme="teal"
          variant={"outline"}
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </Button>
        <Button
          fontFamily={`"Euclid Circular B"`}
          isDisabled={
            isError.fund || isError.to || isError.amount || isError.pk
          }
          colorScheme="teal"
          variant="solid"
          onClick={handleSend}
        >
          Send
        </Button>
      </HStack>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent fontFamily={`"Euclid Circular B"`}>
          <ModalHeader>Complete Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VerifyPinCard
              sender={token?.address}
              type={"debit"}
              amount={!isUsd ? tx.amount : tx.amount / coinPrice}
              receiver={tx.to}
              coin={tx.code}
              fee={tx.fee}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
}

export default Send;
