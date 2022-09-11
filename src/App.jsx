import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import PageNotFound from './components/pages/PageNotFound';
import CookieConsent from 'react-cookie-consent';
import Navbar from './components/layout/navbar/Navbar';
import Home from './components/pages/Home';
import Works from './components/pages/Works';
import Contact from './components/pages/Contact';
import UsersDashboard from './components/layout/dashboard/UsersDashboard';
import Sandbox from './components/pages/Sandbox';
import AccountProfile from './components/pages/AccountProfile';
import ModalManager from './components/layout/modal/ModalManager';
import PrivateRoutes from './components/layout/PrivateRoutes';
import {history} from './store/store'
// import { useSelector } from 'react-redux';
// import { auth } from './apis/firestore/firebase-config';

function App() {
  // const initialized = useSelector((state)=> auth.currentUser);

  return (
    <ChakraProvider theme={theme}>
      <ModalManager />
      <CookieConsent
        style={{ background: '#429EBD', color: '#ffffff !important' }}
        buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
      >
        <p className="cookies-message">
          This website uses cookies to enhance the user experience.
        </p>
      </CookieConsent>
      <Box fontSize="xl">
        <Grid p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Navbar />
          <Routes history={history}>
            <Route path="/" exact element={<Home />} />
            <Route path="/work" exact element={<Works />} />
            <Route path="/contact" exact element={<Contact />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/doc" element={<UsersDashboard />} />
            <Route path="/sandbox" element={<Sandbox />} />
            {/* PRIVATE ROUTES */}
            <Route element={<PrivateRoutes />}>
              <Route path="/account" element={<AccountProfile />} />
            </Route>
          </Routes>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;