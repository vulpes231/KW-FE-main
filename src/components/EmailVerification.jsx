import { Center, Heading } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  Flex,
  Stack,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { reset, verifyUser } from "../features/user/userSlice";
import axios from "axios";

export default function VerifyEmailForm({ onClick }) {
  const email = JSON.parse(localStorage.getItem("BSinfo"));
  console.log(email);
  const [pin, setPin] = useState("");
  const [code, setCode] = useState("");
  // const dispatch = useDispatch();
  // const toast = useToast();
  // const { user, isLoading, isError, isSuccess, message } = useSelector(
  //   (state) => state.user
  // );

  useEffect(() => {
    // Ensure email?.email is truthy before making the API call
    if (email?.email) {
      async function sendCode() {
        const message = await axios.post(
          "https://server.kryptwallet.com/users/send%20verification%20code/verify",
          {
            email: email.email,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setCode(message.data.code);
      }
      sendCode();
    }
  }, []);

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
        my={{ base: 0, md: 10 }}
      >
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Verify your Email
          </Heading>
        </Center>
        <Center
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          We have sent code to your email
        </Center>
        <Center
          fontSize={{ base: "sm", sm: "md" }}
          fontWeight="bold"
          color={useColorModeValue("gray.800", "gray.400")}
        >
          {email?.email}
        </Center>
        <FormControl>
          <Center>
            <HStack>
              <PinInput
                defaultValue={pin}
                onChange={(e) => {
                  setPin(e);
                }}
              >
                <PinInputField _focus={{ borderColor: "green.400" }} />
                <PinInputField _focus={{ borderColor: "green.400" }} />
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
            onClick={() => onClick(pin, code)}
            isDisabled={pin === "" || pin.length !== 6}
          >
            Verify
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
