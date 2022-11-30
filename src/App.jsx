import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { matchPath, Route, Routes, useLocation } from 'react-router-dom';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import PageNotFound from './components/pages/PageNotFound';
import CookieConsent from 'react-cookie-consent';
import Navbar from './components/layout/navbar/Navbar';
import Home from './components/pages/Home';
import Works from './components/pages/Works';
import Contact from './components/pages/Contact';
import Blog from './components/layout/articles/Blog';
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
import PrivacyPolicy from './components/pages/footer/PrivacyPolicy';
import Terms from './components/pages/footer/Terms';
import DigitalSketches from './components/pages/DigitalSketches';
import Post from './components/layout/articles/posts/Post';
import Posts from './components/layout/admin/Posts';
import ScrollToTop from './components/utils/ScrollToTop';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

function App() {
  const initialized = useSelector(state => state.async);
  const { pathname } = useLocation();

  useEffect(() => {
    ReactGA.initialize([
      {
        trackingId: process.env.REACT_APP_GA_ID,
      },
      {
        trackingId: process.env.REACT_APP_GA_TEST_ID,
      },
    ]);
    ReactGA.send('pageview');
  }, []);

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
      <ScrollToTop />
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
              {/* PUBLIC ROUTES */}
              <Route path="/" exact element={<Home />} />
              <Route path="/work" exact element={<Works />} />
              <Route path="/contact" exact element={<Contact />} />
              <Route path="/privacy-policy" exact element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" exact element={<Terms />} />
              <Route path="/blog" exact element={<Blog />} />
              <Route path="blog/:articleId" element={<Post />} />
              <Route path="*" element={<PageNotFound />} />
              {/* PRIVATE ROUTES */}
              <Route element={<PrivateRoutes />}>
                <Route path="/account" element={<AccountProfile />} />
                <Route path="/nft" exact element={<DigitalSketches />} />
              </Route>
              {/* ADMIN ROUTES */}
              <Route element={<AdminRoutes />}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/messages" element={<Messages />} />
                <Route path="/admin/users" element={<UsersInfo />} />
                <Route path="/admin/analytics" element={<Analytics />} />
                <Route path="/admin/posts" element={<Posts />} />
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
