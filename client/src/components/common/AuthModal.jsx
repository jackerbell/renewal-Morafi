import { Box,Modal} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthModalOpen } from "../../redux/features/authModalSlice";
import Logo from "./Logo.jsx";
import SigninForm from "./SigninForm.jsx";
import SignupForm from "./SignupForm.jsx";

const actionState = {
  signin: "signin",
  signup: "signup"
}

const AuthModal = () => {
  const { isAuthModalOpen } = useSelector((state) => state.authModal);
  
  const dispatch = useDispatch();

  const [action, setAction] = useState(actionState.signin);

  useEffect(() => {
    if(isAuthModalOpen){
      setAction(actionState.signin)
    }
  }, [isAuthModalOpen])

  const handleClose = () => dispatch(setIsAuthModalOpen(false))

  const switchAuthState = (state) => setAction(state)
  
  return (
    <Modal open={isAuthModalOpen} onClose={handleClose}>
      <Box sx={{
        position: "absolute",
        top: "25%",
        left: "30%",
        transfrom: "translate(-50%, -50%)",
        width: "100%",
        maxWidth: "37.5rem",
        padding: 4,
        outline: "none"
      }}>
        <Box sx={{ padding: 4, boxShadow: 24, backgroundColor: "background.paper"}}>
          <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
            <Logo />
          </Box>

          {action === actionState.signin && <SigninForm switchAuthState={()=>{
            switchAuthState(actionState.signup);
          }}/>}

          {action === actionState.signup && <SignupForm switchAuthState={()=>{
            switchAuthState(actionState.signin)
          }}/>}
        </Box>
      </Box>

    </Modal>
  );
};

export default AuthModal;