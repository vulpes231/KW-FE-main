import { Center, Heading, Text, useToast } from "@chakra-ui/react";
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
import { setUserPin, reset } from "../features/user/userSlice";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export default function ConfirmPinCard({ setStatus, setStep, pin }) {
  const [confirmPin, setConfirmPin] = useState("");
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    isLoading && setStatus("loading");
    isError && setStatus("error");
    if (isError) {
      toast({
        position: "top-right",
        title: "Error",
        description:
          message === "Network Error" ? message : "Unable to set Pin",
        status: "error",
        duration: 5000,
        isClosable: true,
        fontFamily: "Euclid Circular B",
      });
      dispatch(reset());
    }
    isSuccess && setStatus("");

    if (isSuccess) {
      localStorage.setItem("BsuserLiveTokens", user);
      localStorage.removeItem("BSsteps");
      localStorage.removeItem("BSuser");
      dispatch(reset());
      navigate("/dashboard");
    }
  }, [
    dispatch,
    isError,
    isLoading,
    isSuccess,
    message,
    setStep,
    setStatus,
    toast,
    user,
    navigate,
  ]);

  //checking if pin matches
  useEffect(() => {
    if (confirmPin.length === 4 && confirmPin !== pin) {
      toast({
        position: "top-right",
        title: "Error",
        description: "Pin does not match",
        status: "error",
        duration: 5000,
        isClosable: true,
        fontFamily: "Euclid Circular B",
      });
    }
  }, [confirmPin, pin, toast]);

  const handleSetPin = () => {
    try {
      dispatch(setUserPin({ pin, user }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      fontFamily={`"Euclid Circular B"`}
    >
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
        <Text onClick={() => setStep(3)} textAlign={"left"} cursor={"pointer"}>
          <ChevronLeftIcon boxSize={6} verticalAlign={"middle"} />
          Back
        </Text>
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Confirm Pin
          </Heading>
        </Center>
        <Center
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          Write your PIN down and keep it safe, Use it to acess your funds for
          transactions.
        </Center>

        <FormControl>
          <Center>
            <HStack>
              <PinInput
                defaultValue={confirmPin}
                onChange={(e) => {
                  setConfirmPin(e);
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
            isDisabled={confirmPin.length !== 4 || confirmPin !== pin}
            onClick={handleSetPin}
          >
            Set Pin
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
