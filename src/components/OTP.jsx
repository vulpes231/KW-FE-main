import { Center, Heading } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  Flex,
  Stack,
  useColorModeValue,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { reset } from "../features/user/userSlice";

export default function OTPForm({ setStep, setStatus }) {
  const email = JSON.parse(localStorage.getItem("BSinfo"));
  // const cacheUser = JSON.parse(localStorage.getItem("BSuser"));
  // const cacheSteps = localStorage.getItem("BSsteps");
  const [pin, setPin] = useState("");
  const [code, setCode] = useState("");
  const { user, info, isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(email);
    async function sendCode() {
      const message = await axios.post(
        "https://server.kryptwallet.com/users/send%20verification%20code/otp",
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
      return message.data;
    }
    sendCode();
  }, [email?.email]);

  // } else if (cacheUser && cacheSteps) {
  //   cacheUser?.email === info?.email && navigate("/");

  const handleVerify = async () => {
    if (parseInt(pin) === code) {
      try {
        if (!info?.isVerified) {
          // localStorage.setItem("BSsteps", 1);
          dispatch(reset());
          // setStep(1);
          navigate("/completesignup");
        } else {
          localStorage.setItem("BsuserLiveTokens", user);
          localStorage.removeItem("BSinfo");
          dispatch(reset());
          navigate("/dashboard");
        }
      } catch (e) {
        console.log(e.message);
      }
    } else {
      toast({
        position: "top-right",
        title: "Error",
        description: "Check your mail for the code sent.",
        status: "error",
        duration: 5000,
        isClosable: true,
        fontFamily: "Euclid Circular B",
      });
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
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
          {email.email}
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
            onClick={handleVerify}
            isDisabled={pin === "" || pin.length !== 6 || isLoading}
          >
            Verify
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
