import { Stepper, Step, StepLabel } from '@mui/material';

interface CheckoutStepperProps {
  activeStep: number;
  steps: string[];
}

export const CheckoutStepper = ({ activeStep, steps }: CheckoutStepperProps) => {
  return (
    <Stepper activeStep={activeStep} sx={{ my: 4 }}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};