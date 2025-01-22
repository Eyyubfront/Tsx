import { Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingProps {
    open?: boolean
}

const Loading: React.FC<LoadingProps> = ({ open }) => {
  if (!open) return null; 

  return (
    <Box
      height="100vh"
      width="100vw" 
      position="absolute"
      bgcolor="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex={9999} 
    >
      <CircularProgress />
    </Box>
  );
}

export default Loading;