import { Step, Steps, useSteps } from "chakra-ui-steps";
import { Flex } from "@chakra-ui/react";
import { FiUser } from "react-icons/fi";
import { FaUnlockAlt } from "react-icons/fa";
import { VscUnverified } from "react-icons/vsc";
import { GiWallet } from "react-icons/gi";
import SignupCard from "../components/signupCard";
import VerifyEmailForm from "../components/VerifyEmailForm";
import SetPinCard from "../components/setPinCard";
import WalletTypeCard from "../components/walletTypeCard";
import { useState } from "react";
import { setUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ConfirmPinCard from "../components/confirmPinCard";

const steps = [
  { label: "Sign Up", icon: FiUser, Content: SignupCard },
  { label: "Verify", icon: VscUnverified, Content: VerifyEmailForm },
  { label: "Wallet", icon: GiWallet, Content: WalletTypeCard },
  { label: "Pin", icon: FaUnlockAlt, Content: SetPinCard },
  { label: "Confirm Pin", icon: FaUnlockAlt, Content: ConfirmPinCard },
];

const SignUp = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const cacheSteps = localStorage.getItem("BSsteps");
  const curStep = user && cacheSteps ? parseInt(cacheSteps) : 0;
  const [pin, setPin] = useState("");
  const { activeStep, setStep } = useSteps({
    initialStep: curStep,
  });
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("BsuserLiveTokens");
    if (user) {
      dispatch(setUser(user));
      navigate("/dashboard");
    }
  }, [dispatch, navigate]);

  return (
    <Flex flexDir="column" width="100%" px={{ base: "3", md: "5", lg: "10" }}>
      <Steps my={7} state={status} activeStep={activeStep} responsive="true">
        {steps.map(({ label, icon, Content }, index) => (
          <Step label={label} key={label} icon={icon}>
            <Content
              setStep={setStep}
              setStatus={setStatus}
              pin={pin}
              setPin={setPin}
            />
          </Step>
        ))}
      </Steps>
    </Flex>
  );
};

export default SignUp;
