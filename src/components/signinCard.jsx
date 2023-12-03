import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactLink } from "react-router-dom";
import { loginUser, reset } from "../features/user/userSlice";

export default function SignInCard({ nextStep, setStatus }) {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    isLoading && setStatus("loading");
    isError && setStatus("error");
    if (isError) {
      toast({
        position: "top-right",
        title: "Error",
        description:
          message === "Network Error" ? message : "Wrong/Invalid Email.",
        status: "error",
        duration: 5000,
        isClosable: true,
        fontFamily: "Euclid Circular B",
      });
      dispatch(reset());
    }
    isSuccess && setStatus("");
    if (isSuccess) {
      dispatch(reset());
      nextStep();
    }
  }, [
    dispatch,
    isError,
    isLoading,
    isSuccess,
    message,
    nextStep,
    setStatus,
    toast,
  ]);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formValues);
    const userData = {
      email: formValues.email,
    };
    localStorage.setItem("BSinfo", JSON.stringify(userData));
    await dispatch(loginUser(userData));
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      fontFamily={`"Euclid Circular B"`}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={{ base: "2xl", md: "4xl" }}>
            Sign in to your account
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color={"gray.600"}>
            Don't have an account,{" "}
            <Link as={ReactLink} color={"green.400"} to={"/signup"}>
              Sign Up
            </Link>{" "}
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                onChange={handleChange}
                value={formValues.email}
                _focus={{ borderColor: "green.400" }}
              />
            </FormControl>

            <Stack spacing={10}>
              <Button
                bg={"green.400"}
                color={"white"}
                _hover={{
                  bg: "green.500",
                }}
                isDisabled={
                  formValues.email === "" ||
                  !formValues.email.match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  )
                }
                onClick={handleSubmit}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
