
import Routing from "./Routing/Routing";
import { useAppDispatch } from "./store/index";
import { refreshToken } from "./store/actions/authActions";
import { useEffect } from "react";
function App() {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
   dispatch(refreshToken())
    
  }, []);



  return (


<Routing/>
  );
}

export default App;
