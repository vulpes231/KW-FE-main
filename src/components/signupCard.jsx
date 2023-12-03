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
import { registerNewUsers, reset } from "../features/user/userSlice";

export default function SignupCard({ setStep, setStatus }) {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
  });
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );
  const toast = useToast();

  useEffect(() => {
    isLoading && setStatus("loading");
    isError && setStatus("error");
    if (isError) {
      toast({
        position: "top-right",
        title: "Error",
        description:
          message === "Network Error"
            ? message
            : "User Already Exist, Please SignIn.",
        status: "error",
        duration: 5000,
        isClosable: true,
        fontFamily: "Euclid Circular B",
      });
      dispatch(reset());
    }
    isSuccess && setStatus("");

    if (isSuccess) {
      localStorage.setItem("BSsteps", 1);
      dispatch(reset());
      setStep(1);
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
  ]);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
    const userData = {
      username: formValues.username,
      email: formValues.email.toLowerCase(),
    };

    localStorage.setItem("BSuser", JSON.stringify(userData));
    dispatch(registerNewUsers(userData));
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
      fontFamily={`"Euclid Circular B"`}
    >
      <Stack spacing={8} mx={"auto"} my={10} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={["3xl", "4xl"]} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={["md", "lg"]} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="userName" isRequired>
              <FormLabel>UserName</FormLabel>
              <Input
                type="text"
                onChange={handleChange}
                value={formValues.username}
                name="username"
                _focus={{ borderColor: "green.400" }}
              />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={handleChange}
                value={formValues.email}
                name="email"
                _focus={{ borderColor: "green.400" }}
              />
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"green.400"}
                color={"white"}
                _hover={{
                  bg: "green.500",
                }}
                isDisabled={
                  formValues.email === "" ||
                  formValues.username === "" ||
                  !formValues.email.match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  )
                }
                onClick={handleSubmit}
                isLoading={isLoading}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link as={ReactLink} color={"green.400"} to={"/signin"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
