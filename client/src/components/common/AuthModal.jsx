import { Box,Modal} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthModalOpen } from '../../redux/features/authModalSlice';
import Logo from './Logo.jsx';

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
        top: "50%",
        left: "50%",
        transfrom: "translate(-50%, -50%)",
        width: "100%",
        maxWidth: "600px",
        padding: "4px",
        outline: "none"
      }}>
        <Box sx={{ padding: 4, boxShadow: 24, backgroundColor: "background.paper"}}>
          <Box sx={{ textAlign: "center", marginBottom: '2rem' }}>
            <Logo />
          </Box>
        </Box>
      </Box>

    </Modal>
  );
};

export default AuthModal;