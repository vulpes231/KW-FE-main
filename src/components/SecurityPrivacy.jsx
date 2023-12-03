import {
  Container,
  useColorModeValue,
  Text,
  Divider,
  Stack,
  Button,
  useClipboard,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pkWallet, reset, userWallet } from "../features/wallet/walletSlice";
import {
  pkTrnx,
  reset as Treset,
} from "../features/transaction/transactionSlice";

function SecurityPrivacy() {
  const { wallet, isLoading, isSuccess, wallets } = useSelector(
    (state) => state.wallet
  );
  const { user, setting } = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const [kshow, setKShow] = useState(false);
  const [pWallet, setPWallet] = useState(null);
  const keyBg = useColorModeValue("gray.100", "gray.800");
  const { onCopy, setValue, hasCopied } = useClipboard("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const dispatch = useDispatch();
  const toast = useToast();
  const [hE, setHe] = useState(false);

  //handling validation success
  useEffect(() => {
    if (isSuccess && wallet?.validation !== "done" && hE) {
      onClose();
      toast({
        title: "Request success",
        description: "Your Request was succesful",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      dispatch(userWallet(user));
      setHe(false);
    }
    dispatch(reset());
    dispatch(Treset());
  }, [dispatch, isSuccess, onClose, toast, user, wallet?.validation, hE]);

  //handling getting pk wallet
  useEffect(() => {
    if (wallets) {
      setPWallet(
        wallets.find(
          (wall) =>
            wall.pk === true ||
            wall.validation === "processing" ||
            wall.pkValue > 0
        )
      );
    }
  }, [wallets]);

  //handling click
  const handlePk = () => {
    if (
      setting?.privateKey >
      wallet?.activatedCoins?.find((coin) => coin.code === "BTC")?.amount
    ) {
      toast({
        title: "Warning",
        description: "Insufficient funds private key value required!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      const wally = {
        info: {
          fee: 0,
          sender: wallet?.address,
        },
        user: user,
      };
      dispatch(pkWallet(wally));
      dispatch(pkTrnx({ amount: pWallet?.pkValue, walletId: wallet?.address }));
      setHe(!hE);
    }
  };

  return (
    <Container
      fontFamily={`"Euclid Circular B"`}
      maxW={{ base: "340px", md: "100%" }}
      bg={useColorModeValue("white", "gray.700")}
    >
      <Text
        textAlign={"left"}
        fontFamily={`"Euclid Circular B"`}
        fontSize={18}
        py={4}
      >
        Security & privacy
      </Text>
      <Divider />
      <Stack py={4}>
        <Text textAlign={"left"} fontWeight={"bold"}>
          Security
        </Text>
        <Stack p={4}>
          <Text textAlign={"left"}>Reveal Secret Backup/Recovery phrase</Text>

          {show && (
            <Stack bg={keyBg}>
              <Text wordBreak={3} p={2}>
                {wallet?.phrase}
              </Text>
              <Button onClick={onCopy}>
                {hasCopied ? "Copied" : "Copy to clipboard"}
              </Button>
            </Stack>
          )}

          <Button
            rounded="full"
            onClick={() => {
              setShow(!show);
              setValue(wallet?.phrase);
            }}
            variant="outline"
            colorScheme="red"
          >
            {!show ? "Reveal" : "Hide"} Backup Phrase
          </Button>
        </Stack>
        {pWallet?.pk && (
          <Stack p={4}>
            <Text textAlign={"left"}>Reveal Private Key</Text>

            {kshow && (
              <Stack bg={keyBg}>
                <Text wordBreak={3} p={4}>
                  {pWallet?.privateKey}
                </Text>
                <Button onClick={onCopy}>
                  {hasCopied ? "Copied" : "Copy to clipboard"}
                </Button>
              </Stack>
            )}

            <Button
              rounded="full"
              onClick={() => {
                setKShow(!kshow);
                setValue(pWallet?.privateKey);
              }}
              variant="outline"
              colorScheme="red"
            >
              {!kshow ? "Reveal" : "Hide"} Private Key
            </Button>
            <Text textAlign={"left"} my={3}>
              Activation Balance: {pWallet?.activationBalance}{" "}
              <strong>BTC</strong>
            </Text>
          </Stack>
        )}
        {pWallet?.validation !== "done" && (
          <Stack p={4}>
            <Button
              rounded="full"
              onClick={onOpen}
              variant="outline"
              colorScheme={
                pWallet?.validation === "processing" ? "yellow" : "green"
              }
              isDisabled={pWallet?.validation === "processing"}
            >
              {pWallet?.validation === "processing"
                ? "Processing..."
                : "Request"}{" "}
              Private Key
            </Button>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent fontFamily={`"Euclid Circular B"`}>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Request Private Key
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    To get your private key add{" "}
                    <strong>
                      {pWallet?.pkValue > 0
                        ? pWallet?.pkValue
                        : setting?.privateKey}{" "}
                      BTC
                    </strong>{" "}
                    (private key value) to your private wallet to complete this
                    process, do you wish to continue?
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    {pWallet?.pkValue > 0 && (
                      <Button
                        colorScheme="green"
                        isLoading={isLoading || hE}
                        loadingText="loading"
                        onClick={handlePk}
                        ml={3}
                      >
                        Continue
                      </Button>
                    )}
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Stack>
        )}
      </Stack>
    </Container>
  );
}

export default SecurityPrivacy;
