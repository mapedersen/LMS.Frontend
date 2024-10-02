import { Button } from "@chakra-ui/react";

interface ToggleButtonProps {
  isToggled: boolean;
  onToggle: () => void;
  activeLabel: string;
  inactiveLabel: string;
}

export const ToggleButton = ({
  isToggled,
  onToggle,
  activeLabel,
  inactiveLabel,
}: ToggleButtonProps) => {
  return (
    <Button mt={4} minW="220px" onClick={onToggle} colorScheme="blue">
      {isToggled ? activeLabel : inactiveLabel}
    </Button>
  );
};
