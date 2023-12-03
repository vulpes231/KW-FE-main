import React, { useState } from "react";
import EmailVerification from "../components/EmailVerification";
import CreateUserPin from "../components/CreateUserPin";
import { verifyUser, reset } from "../features/user/userSlice";
import { useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { newWallet } from "../features/wallet/walletSlice";
import ChooseCoins from "../components/ChooseCoins";

const CompleteSignup = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [step, setStep] = useState(1);

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );

  const { isSuccess: walletIsSuccess, isError: walletIsError } = useSelector(
    (state) => state.wallet
  );

  const handleEmailVerification = async (pin, code) => {
    console.log("clicked");
    if (parseInt(pin) === code) {
      try {
        dispatch(verifyUser(user));
        if (isSuccess) {
          setStep((prevStep) => prevStep + 1);
        }
        if (isError) {
          toast({
            position: "top-right",
            title: "Error",
            description:
              message === "Network Error"
                ? message
                : "Unable to verify you at this time",
            status: "error",
            duration: 5000,
            isClosable: true,
            fontFamily: "Euclid Circular B",
          });
          dispatch(reset());
        }
      } catch (e) {
        console.log(e.message);
      }
    } else {
      toast({
        position: "top-right",
        title: "Error",
        description:
          message === "Invalid Verification"
            ? message
            : "Check your mail for the code sent.",
        status: "error",
        duration: 5000,
        isClosable: true,
        fontFamily: "Euclid Circular B",
      });
    }
  };

  const handleWallet = async (setClicked, selectedArr) => {
    console.log("clciked");
    setClicked(true);
    const wallet = {
      type: "standard",
      coins: selectedArr,
      token: user,
    };
    try {
      dispatch(newWallet(wallet));
      // if (walletIsSuccess) {
      //   console.log("success");
      setStep((prevStep) => prevStep + 1);
      // }
      if (walletIsError) {
        toast({
          position: "top-right",
          title: "Error",
          description:
            message === "Network Error" ? message : "Unable to activate token",
          status: "error",
          duration: 5000,
          isClosable: true,
          fontFamily: "Euclid Circular B",
        });
        dispatch(reset());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {step === 1 && <EmailVerification onClick={handleEmailVerification} />}

      {step === 2 && <ChooseCoins buildWallet={handleWallet} />}

      {step === 3 && <CreateUserPin />}
    </div>
  );
};

export default CompleteSignup;
