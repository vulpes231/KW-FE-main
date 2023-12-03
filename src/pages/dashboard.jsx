import { Flex, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { getSettings, setUser } from "../features/user/userSlice";
import { userWallet } from "../features/wallet/walletSlice";
import { getCoinValues } from "../features/coin/coinSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("BsuserLiveTokens");
    if (!user) {
      navigate("/signin");
    } else {
      dispatch(setUser(user));
      dispatch(userWallet(user));
      dispatch(getCoinValues());
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.100", "gray.900")}
      direction={"column"}
      px={[0, 6]}
    >
      <Outlet />
    </Flex>
  );
}

export default Dashboard;
