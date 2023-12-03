import {
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuItem,
  Avatar,
  HStack,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Circle,
  Heading,
} from "@chakra-ui/react";
import {
  AddIcon,
  DownloadIcon,
  LockIcon,
  MoonIcon,
  SunIcon,
  ChevronDownIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import logoBlack from "../assets/Krypt_logo/Krypt_logo.PNG";
import LogoWhite from "../assets/Krypt_logo/Krypt_logo.PNG";
import Wallet from "./wallet";
import { useDispatch, useSelector } from "react-redux";
import { authOut } from "../features/user/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { reset } from "../features/wallet/walletSlice";

export default function Header({ dash }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const color = useColorModeValue("gray.600", "gray.400");
  const { wallets } = useSelector((state) => state.wallet);
  const [activeWallet, setActiveWallet] = useState(0);

  const handleLogout = async () => {
    await dispatch(authOut());
    await dispatch(reset());
    navigate("/signin");
  };
  return (
    <>
      {dash && <MobHeader />}
      <Flex
        justifyContent="center"
        bg={[
          useColorModeValue("gray.100", "gray.800"),
          useColorModeValue("gray.100", "gray.900"),
        ]}
        px={[3, 6]}
        display={["none", "flex"]}
      >
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          flex={1}
        >
          <Link to={"/dashboard"}>
            {colorMode !== "light" ? (
              <Image w={[170, 200]} h={170} src={LogoWhite} alt="logo" />
            ) : (
              <Image w={[170, 200]} h={170} src={logoBlack} alt="logo" />
            )}
          </Link>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button size={["sm", "md"]} onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              {dash && (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} src={"#"} />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <HStack>
                      <Text
                        fontFamily={`"Euclid Circular B"`}
                        fontSize={16}
                        px={2}
                        fontWeight={500}
                      >
                        My accounts
                      </Text>
                    </HStack>
                    <MenuDivider />
                    <Stack maxH={120} overflowY={"auto"}>
                      {wallets?.map((wallet, index) => (
                        <Wallet
                          key={index}
                          wallet={wallet}
                          id={index}
                          aveWall={activeWallet}
                          setAveWall={setActiveWallet}
                        />
                      ))}
                    </Stack>
                    <MenuDivider />
                    <MenuItem
                      gap={2}
                      fontFamily={`"Euclid Circular B"`}
                      p={4}
                      fontSize={16}
                      alignItems={"center"}
                      as={Link}
                      to="/dashboard/newwallet"
                    >
                      <AddIcon color={color} /> Create Account
                    </MenuItem>
                    <MenuItem
                      gap={2}
                      fontFamily={`"Euclid Circular B"`}
                      p={4}
                      fontSize={16}
                      alignItems={"center"}
                      as={Link}
                      to="/dashboard/importwallet"
                    >
                      <DownloadIcon color={color} /> Import Wallet
                    </MenuItem>
                    <MenuItem
                      gap={2}
                      fontFamily={`"Euclid Circular B"`}
                      p={4}
                      fontSize={16}
                      alignItems={"center"}
                      as={Link}
                      to="/dashboard/security&privacy"
                    >
                      <LockIcon color={color} /> Security & Privacy
                    </MenuItem>
                    <MenuItem
                      fontFamily={`"Euclid Circular B"`}
                      p={4}
                      fontSize={16}
                      onClick={handleLogout}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
const MobHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const color = useColorModeValue("gray.600", "gray.400");
  const { colorMode, toggleColorMode } = useColorMode();
  const { wallets, wallet } = useSelector((state) => state.wallet);
  const [activeWallet, setActiveWallet] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handle Logout
  const handleLogout = async () => {
    await dispatch(authOut());
    await dispatch(reset());
    navigate("/signin");
  };
  return (
    <Flex
      bg={[
        useColorModeValue("gray.100", "gray.700"),
        useColorModeValue("gray.100", "gray.900"),
      ]}
      fontFamily={`"Euclid Circular B"`}
      display={["flex", "none"]}
      p={4}
      align={"center"}
      justify={"space-between"}
    >
      {/* Mobile Menu */}
      <HamburgerIcon size={"sm"} onClick={onOpen} />
      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size={"xs"}>
        <DrawerOverlay />
        <DrawerContent
          fontFamily={`"Euclid Circular B"`}
          bg={useColorModeValue("gray.200", "gray.900")}
        >
          <DrawerHeader>
            <Link to={"/dashboard"}>
              {colorMode !== "light" ? (
                <Image w={[170, 200]} src={LogoWhite} alt="logo" />
              ) : (
                <Image w={[170, 200]} src={logoBlack} alt="logo" />
              )}
            </Link>
          </DrawerHeader>
          <DrawerBody p={0}>
            <Stack py={4} px={7} align={"start"} spacing={4}>
              <Circle border={"1px solid"} p={"2px"} borderColor={"green.400"}>
                <svg
                  style={{ borderRadius: "50%" }}
                  x="0"
                  y="0"
                  width="50"
                  height="50"
                >
                  <rect
                    x="0"
                    y="0"
                    width="80px"
                    height="70px"
                    transform="translate(-0.2718058742913141 5.432025026924122) rotate(199.0 12 12)"
                    fill="#FA7D00"
                  ></rect>
                  <rect
                    x="0"
                    y="0"
                    width="70px"
                    height="70px"
                    transform="translate(-4.03459375339463 -12.227246394311111) rotate(379.4 12 12)"
                    fill="#F94701"
                  ></rect>
                  <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="60px"
                    transform="translate(-16.326930906114146 -1.712536773390393) rotate(275.6 12 12)"
                    fill="#FB1858"
                  ></rect>
                </svg>
              </Circle>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Text fontSize={20} textAlign="left">
                    Wallet {wallet?.index + 1} <ChevronDownIcon ml={2} />
                  </Text>
                  <Text my={2} fontWeight={300} textAlign="left">
                    {wallet?.activatedCoins?.[0]?.amount?.toFixed(2)}{" "}
                    {wallet?.activatedCoins?.[0]?.code}
                  </Text>
                  <Text
                    w={24}
                    fontSize={14}
                    fontWeight={300}
                    isTruncated
                    textAlign="left"
                  >
                    {wallet?.address}
                  </Text>
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <HStack>
                    <Text
                      fontFamily={`"Euclid Circular B"`}
                      fontSize={16}
                      px={2}
                      fontWeight={500}
                    >
                      My accounts
                    </Text>
                  </HStack>
                  <MenuDivider />
                  <Stack maxH={120} overflowY={"auto"}>
                    {wallets?.map((wallet, index) => (
                      <Wallet
                        key={index}
                        wallet={wallet}
                        id={index}
                        aveWall={activeWallet}
                        setAveWall={setActiveWallet}
                      />
                    ))}
                  </Stack>
                </MenuList>
              </Menu>
            </Stack>
            <Stack
              h={"100%"}
              shadow="lg"
              bg={useColorModeValue("gray.100", "gray.700")}
              px={7}
              py={2}
              rounded={"lg"}
            >
              <Flex
                gap={2}
                fontFamily={`"Euclid Circular B"`}
                py={4}
                fontSize={16}
                alignItems={"center"}
                as={Link}
                to="/dashboard/newwallet"
                onClick={onClose}
              >
                <AddIcon color={color} /> Create Account
              </Flex>
              <Flex
                gap={2}
                fontFamily={`"Euclid Circular B"`}
                fontSize={16}
                alignItems={"center"}
                as={Link}
                to="/dashboard/importwallet"
                py={4}
                onClick={onClose}
              >
                <DownloadIcon color={color} /> Import Wallet
              </Flex>
              <Flex
                gap={2}
                fontFamily={`"Euclid Circular B"`}
                fontSize={16}
                alignItems={"center"}
                as={Link}
                to="/dashboard/security&privacy"
                py={4}
                onClick={onClose}
              >
                <LockIcon color={color} /> Security & Privacy
              </Flex>
              <Flex
                fontFamily={`"Euclid Circular B"`}
                fontSize={16}
                onClick={handleLogout}
                py={4}
              >
                Logout
              </Flex>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Wallet index */}
      <Heading
        onClick={() => navigate("/dashboard")}
        fontSize={24}
        fontFamily={`"Euclid Circular B"`}
      >
        Wallet {wallet?.index + 1}
      </Heading>

      {/* Ligth theme */}
      <Button size={["sm", "md"]} onClick={toggleColorMode}>
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
    </Flex>
  );
};
