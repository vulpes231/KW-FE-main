import { DownloadIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Circle,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useClipboard,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";

function ReceiveComp({ tok, tokList }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onCopy, setValue } = useClipboard("");
  const [token, setToken] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (tok) {
      setToken(tok);
      setValue(tok?.address);
    }
  }, [setValue, tok]);

  function handleSelect() {
    setShow(!show);
  }

  const handleClick = (lis) => {
    setToken(lis);
    setValue(lis?.address);
    onOpen();
  };

  return (
    <>
      <Stack
        align="center"
        onClick={!tokList ? onOpen : handleSelect}
        cursor={"pointer"}
        position={"relative"}
      >
        <Circle maxW={12} bg={useColorModeValue("green.500", "green.400")}>
          <DownloadIcon color={"white"} boxSize={9} p={2} />
        </Circle>
        <Text fontSize={13} fontFamily={`"Euclid Circular B"`}>
          Receive
        </Text>

        {show && (
          <Box
            position={"absolute"}
            bg={"white"}
            bottom={"-100px"}
            zIndex={10}
            width={100}
            shadow={"lg"}
            borderRadius={6}
          >
            {tokList?.map((lis, index) => (
              <Text
                cursor={"pointer"}
                _hover={{ bg: "green.400" }}
                key={index}
                value={lis?.code}
                onClick={() => {
                  handleClick(lis);
                  handleSelect();
                }}
              >
                {lis?.code}
              </Text>
            ))}
          </Box>
        )}
      </Stack>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent fontFamily={`"Euclid Circular B"`}>
          <ModalHeader>Deposit {token?.code}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            To interact with decentralized applications using Krypt Wallet,
            you’ll need {token?.code} in your wallet.
            <Stack align={"center"} mt={4}>
              <Text>Receive</Text>
              <QRCode value={token?.address} />
              <Text>Scan address to recieve payment</Text>
            </Stack>
            <HStack
              my={3}
              p={2}
              bg={useColorModeValue("gray.800", "gray.800")}
              rounded={"3xl"}
            >
              <Text
                isTruncated
                color={useColorModeValue("gray.400", "green.500")}
              >
                {token?.address}
              </Text>
              <Button
                rounded="full"
                variant={"outline"}
                colorScheme="green"
                onClick={() => {
                  setValue(token?.address);
                  onCopy();
                }}
              >
                Copy
              </Button>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ReceiveComp;
