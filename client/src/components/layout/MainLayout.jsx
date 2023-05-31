import { Box } from "@mui/material";
import {Outlet} from "react-router-dom";

import GlobalLoading from "../common/GlobalLoading.jsx";
import Footer from "../common/Footer.jsx";
import Topbar from "../common/Topbar.jsx";
import AuthModal from "../common/AuthModal.jsx";

const MainLayout = () => {
  return (
    <>
      {/* globalLoading  */}
      <GlobalLoading />
      {/* globalLoading */}

      {/* login modal */}
      <AuthModal />
      {/* login modal */}

      <Box display="flex" minHeight="100vh">
        {/*  header */}
        <Topbar />
        {/*  header */}

        {/* main */}
        <Box
          component = "main"
          flexGrow = {1}
          overflow="hidden"
          minHeight="100vh"
        >
          <Outlet />
        </Box>
        {/* main */}
      </Box>

      {/*  footer  */}
      <Footer />
      {/*  footer  */}
    </>
  );
};

export default MainLayout;