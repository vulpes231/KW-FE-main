import { Step, Steps, useSteps } from "chakra-ui-steps";
import { Flex } from "@chakra-ui/react";
import { FiUser } from "react-icons/fi";
import { VscUnverified } from "react-icons/vsc";
import SignInCard from "../components/signinCard";
import { useState } from "react";
import OTPForm from "../components/OTP";

const steps = [
  { label: "Sign In", icon: FiUser, Content: SignInCard },
  { label: "Verify", icon: VscUnverified, Content: OTPForm },
];

const SignIn = () => {
  const { nextStep, activeStep } = useSteps({
    initialStep: 0,
  });
  const [status, setStatus] = useState("");

  return (
    <Flex flexDir="column" width="100%" px={{ base: 3, md: 5, lg: 10 }}>
      <Steps my={7} state={status} activeStep={activeStep} responsive={true}>
        {steps.map(({ label, icon, Content }, index) => (
          <Step label={label} key={label} icon={icon}>
            <Content nextStep={nextStep} setStatus={setStatus} />
          </Step>
        ))}
      </Steps>
    </Flex>
  );
};

export default SignIn;
