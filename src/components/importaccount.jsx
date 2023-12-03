import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Stack,
  Heading,
  Textarea,
  useColorModeValue,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { impWallet, reset } from "../features/wallet/walletSlice";

function ImportAccount() {
  const navigate = useNavigate();
  const [phrase, setPhrase] = useState("");
  const desPhrase = phrase.split(" ");
  const dispatch = useDispatch();
  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.wallet
  );
  const toast = useToast();
  const [imClicked, setImClicked] = useState(false);

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      // console.log(message);
      toast({
        title: "Wallet Error.",
        description: `An error occurred while processing your request`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      dispatch(reset());
      setImClicked(false);
    }

    if (isSuccess && imClicked) {
      toast({
        title: "Wallet Imported.",
        description: "We've imported your wallet for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      dispatch(reset());
      setImClicked(false);
      navigate("/dashboard");
    }
  }, [dispatch, imClicked, isError, isSuccess, message, navigate, toast]);

  const handleCancel = () => {
    navigate("/dashboard");
  };

  const handleImport = () => {
    const wallet = {
      type: "standard",
      phrase: desPhrase,
      token: localStorage.getItem("BsuserLiveTokens"),
    };
    try {
      dispatch(impWallet(wallet));
      setImClicked(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Flex
      minW={["100%", "800px"]}
      fontFamily={`"Euclid Circular B"`}
      justify={["start", "center"]}
      direction="column"
      bg={useColorModeValue("white", "gray.700")}
      rounded={["none", "xl"]}
      h={["100vh", "100%"]}
    >
      <Heading fontSize={[24, 32]} fontWeight={500} textAlign={"left"} m={5}>
        Import Account
      </Heading>
      <Divider />
      <Stack align={"center"} p={5}>
        <FormControl>
          <FormLabel fontSize={[12, 16]}>Backup Phrase</FormLabel>
          <Textarea
            value={phrase}
            onChange={(e) => setPhrase(e.target.value)}
          />
          <FormHelperText fontSize={[10, 16]}>
            Please paste the 12 seed backup phrase of the account you want
            import
          </FormHelperText>
        </FormControl>
        <HStack>
          <Button colorScheme="teal" variant={"outline"} onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            isDisabled={desPhrase.length !== 12}
            isLoading={isLoading}
            loadingText="Importing"
            colorScheme="teal"
            variant="solid"
            onClick={handleImport}
          >
            Import
          </Button>
        </HStack>
      </Stack>
    </Flex>
  );
}

export default ImportAccount;
