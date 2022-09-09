import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import UnauthModal from './modal/UnauthModal';

export default function PrivateRoutes() {
  const { authenticated } = useSelector(state => state.auth);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!authenticated) {
      setOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  return authenticated ? (
    <Outlet />
  ) : (
    <UnauthModal
      isOpen={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    />
  );
}
