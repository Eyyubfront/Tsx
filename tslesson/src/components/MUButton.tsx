import { Button } from '@mui/material';

const MUButton = ({ variant, size, color, children, sx }) => {
  return (
    <Button
      variant={variant}
      size={size}
      color={color}
      sx={sx}
      fullWidth // `fullWidth` burada birbaşa tətbiq edilir.
    >
      {children}
    </Button>
  );
};

export default MUButton;
