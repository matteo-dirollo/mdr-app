import React from 'react';
import { matchPath, Route, Routes, useLocation } from 'react-router-dom';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import PageNotFound from './components/pages/PageNotFound';
import CookieConsent from 'react-cookie-consent';
import Navbar from './components/layout/navbar/Navbar';
import Home from './components/pages/Home';
import Works from './components/pages/Works';
import Contact from './components/pages/Contact';
import Sandbox from './components/pages/Sandbox';
import AccountProfile from './components/pages/AccountProfile';
import ModalManager from './components/layout/modal/ModalManager';
import PrivateRoutes from './components/layout/routing/PrivateRoutes';
import { useSelector } from 'react-redux';
import LoadingSpinner from './components/layout/loader/LoadingSpinner';
import FooterNewsletter from './components/layout/footer/FooterNewsletter';
import AdminRoutes from './components/layout/routing/AdminRoutes';
import Admin from './components/pages/Admin';
import Messages from './components/layout/admin/Messages';
import UsersInfo from './components/layout/admin/UsersInfo';
import Analytics from './components/layout/admin/Analytics';

function App() {
  const initialized = useSelector(state => state.async);
  const { pathname } = useLocation();

  const isAdminPath = matchPath('/admin/*', pathname);

  if (!initialized)
    return (
      <ChakraProvider theme={theme}>
        <LoadingSpinner />
      </ChakraProvider>
    );

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
        <Grid>
          {isAdminPath ? null : <Navbar />}
          <Box minH="100vh">
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/work" exact element={<Works />} />
              <Route path="/contact" exact element={<Contact />} />
              <Route path="*" element={<PageNotFound />} />
              {/* PRIVATE ROUTES */}
              <Route element={<PrivateRoutes />}>
                <Route path="/account" element={<AccountProfile />} />
              </Route>
              {/* ADMIN ROUTES */}
              <Route element={<AdminRoutes />}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/messages" element={<Messages />} />
                <Route path="/admin/users" element={<UsersInfo />} />
                <Route path="/admin/analytics" element={<Analytics />} />
                <Route path="/sandbox" element={<Sandbox />} />
              </Route>
            </Routes>
          </Box>
          {isAdminPath ? null : <FooterNewsletter />}
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
