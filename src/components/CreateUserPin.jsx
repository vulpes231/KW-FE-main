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
import { setUserPin, reset } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SetPinCard() {
  const [pin, setPin] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );
  const handleSetPin = () => {
    try {
      dispatch(setUserPin({ pin, user }));
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
      if (isSuccess) {
        localStorage.removeItem("BSinfo");
        localStorage.setItem("BsuserLiveTokens", user);
        dispatch(reset());
        navigate("/dashboard");
      }
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
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Pin Set
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
            isDisabled={pin.length !== 4}
            onClick={handleSetPin}
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
