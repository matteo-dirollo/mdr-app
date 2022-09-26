import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import PageNotFound from '../../pages/PageNotFound';
import AdminSidebar from '../sidebar/AdminSidebar';

export default function AdminRoutes() {
  const currentUser = useSelector(
    state => state.auth.currentUser.uid === '340y9BTKIAf4Wr2SxWPMCQo6fQR2'
  );

  useEffect(() => {
    if (!currentUser) {
      
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return currentUser ? (
    <AdminSidebar>
      <Outlet />
    </AdminSidebar>
  ) : (
    <PageNotFound />
  );
}
