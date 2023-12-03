import { ArrowUpIcon, CloseIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Circle,
  Flex,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

function NoPKAlert() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Stack onClick={onOpen} cursor={"pointer"}>
        <Circle bg={useColorModeValue("green.500", "green.400")}>
          <ArrowUpIcon color={"white"} boxSize={9} p={2} />
        </Circle>
        <Text fontSize={13} fontFamily={`"Euclid Circular B"`}>
          Send
        </Text>
      </Stack>

      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent fontFamily={`"Euclid Circular B"`}>
            <AlertDialogHeader
              textAlign={"center"}
              fontSize="lg"
              fontWeight="bold"
            >
              Private Key Value Required!
            </AlertDialogHeader>

            <AlertDialogBody>
              <Stack align={"center"} mb={5}>
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  bg={"red.500"}
                  rounded={"50px"}
                  w={"55px"}
                  h={"55px"}
                  textAlign="center"
                >
                  <CloseIcon boxSize={"20px"} color={"white"} />
                </Flex>
              </Stack>
              Private Key value required to perform this process, heard to{" "}
              <strong>
                <em>Security & Privacy</em>
              </strong>{" "}
              page to request Private Key.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default NoPKAlert;
