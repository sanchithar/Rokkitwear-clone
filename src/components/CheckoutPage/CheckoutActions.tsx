import { Box, Button } from '@mui/material';

interface CheckoutActionsProps {
  activeStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  isNextDisabled: boolean;
}

export const CheckoutActions = ({ 
  activeStep, 
  totalSteps, 
  onBack, 
  onNext, 
  isNextDisabled 
}: CheckoutActionsProps) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
      <Button disabled={activeStep === 0} onClick={onBack}>
        Back
      </Button>
      {activeStep === totalSteps - 1 ? (
        <Button variant="contained" type="submit">
          Place Order
        </Button>
      ) : (
        <Button variant="contained" onClick={onNext} disabled={isNextDisabled}>
          Next
        </Button>
      )}
    </Box>
  );
};