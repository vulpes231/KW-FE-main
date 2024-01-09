import { ArrowUpIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Container,
  Heading,
  Stack,
  Text,
  HStack,
  Circle,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Transaction from "./transaction";
import NumberBeautify from "js-number-beautifier";
import ReceiveComp from "./ReceiveComp";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function CoinPage() {
  const { coin } = useParams();
  const { wallet } = useSelector((state) => state.wallet);
  const token = wallet?.activatedCoins.find((act) => act.code === coin);
  const navigate = useNavigate();
  const txColor = useColorModeValue("gray.300", "gray.500");
  const [coinPrice, setCoinPrice] = useState(0);
  const { tx } = useSelector((state) => state.transaction);
  const trnxs = tx
    ?.filter((trn) => trn.code === coin)
    .sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt));
  const dividerColor = useColorModeValue("gray.500", "gray.600");
  const sendColor = useColorModeValue("green.500", "green.400");
  const { coinValues } = useSelector((state) => state.coin);

  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    let Rtoken = token?.coinName.replace(" ", "-").toLowerCase();
    Rtoken = Rtoken === "xrp" ? "ripple" : Rtoken;
    Rtoken = Rtoken === "tron(trc20)" ? "tron" : Rtoken;
    Rtoken = Rtoken === "tether-usdt" ? "tether" : Rtoken;

    let tok = coinValues?.find((coin) => coin?.id === Rtoken);
    setCoinPrice(tok?.current_price);
  }, [coinValues, token?.coinName]);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await axios.get(
          `YOUR_API_ENDPOINT/${coin}/historical_data`
        );
        // Assuming the API response contains an array of historical data objects
        const data = response.data;
        setHistoricalData(data);
      } catch (error) {
        console.error("Error fetching historical data:", error);
        // Handle error state or show a message to the user
      }
    };

    // fetchHistoricalData();
  }, [coin]);

  return (
    <Container
      maxW={"100%"}
      bg={useColorModeValue("white", "gray.700")}
      px={0}
      minH={["100vh", "fit-content"]}
    >
      <Stack
        fontFamily={`"Euclid Circular B"`}
        direction={"row"}
        align={"center"}
        p={2}
        shadow={"sm"}
        display={["none", "flex"]}
      >
        <Link to={-1}>
          <ChevronLeftIcon boxSize={8} />
        </Link>
        <Text>
          Wallet {wallet?.index + 1} / <strong>{coin}</strong>
        </Text>
      </Stack>

      <Stack gap={2} align={"center"} p={5}>
        <Text
          textAlign={"right"}
          marginTop={"0 !important"}
          fontSize={16}
          fontFamily={`"Euclid Circular B"`}
          color={useColorModeValue("gray.500", "gray.300")}
          w={"100%"}
        >
          1 {token?.code} = ${NumberBeautify(`${coinPrice?.toFixed(2)}`)} USD
        </Text>
        <Avatar size={"sm"} src={token?.img} />
        <Heading
          fontWeight={500}
          fontFamily={`"Euclid Circular B"`}
          fontSize={32}
        >
          {token?.amount || 0} {token?.code}
        </Heading>
        <Text
          marginTop={"0 !important"}
          fontSize={16}
          fontFamily={`"Euclid Circular B"`}
          color={useColorModeValue("gray.500", "gray.300")}
        >
          ${NumberBeautify(`${(token?.amount * coinPrice)?.toFixed(2)}`) || 0.0}
          {token?.amount === 0 && `.00`} USD
        </Text>
      </Stack>
      <HStack shadow={"md"} gap={5} pb={5} justify={"center"}>
        <ReceiveComp tok={token} />

        <Stack
          onClick={() => {
            navigate(`/dashboard/send/${token?.code}`);
          }}
          cursor={"pointer"}
        >
          <Circle bg={sendColor}>
            <ArrowUpIcon color={"white"} boxSize={9} p={2} />
          </Circle>
          <Text fontSize={13} fontFamily={`"Euclid Circular B"`}>
            Send
          </Text>
        </Stack>
      </HStack>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={historicalData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <Stack
        fontFamily={`"Euclid Circular B"`}
        p={5}
        maxH={"50vh"}
        overflowY={"auto"}
      >
        {!tx || tx?.length === 0 || trnxs?.length === 0 ? (
          <Text color={txColor} fontSize={16} fontWeight={500}>
            You have no transactions
          </Text>
        ) : (
          trnxs?.map((trnx, index) => (
            <>
              <Transaction key={index} tx={trnx} />
              <Divider borderColor={dividerColor} />
            </>
          ))
        )}
      </Stack>
    </Container>
  );
}

export default CoinPage;
