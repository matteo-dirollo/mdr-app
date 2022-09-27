import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import PageNotFound from '../../pages/PageNotFound';
import AdminSidebar from '../sidebar/AdminSidebar';

export default function AdminRoutes() {
  const admin = useSelector(
    state => state.auth.currentUser && state.auth.currentUser.uid === '340y9BTKIAf4Wr2SxWPMCQo6fQR2'
  );

  // useEffect(() => {
  //   if (!admin) {
      
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [admin]);

  return admin ? (
    <AdminSidebar>
      <Outlet />
    </AdminSidebar>
  ) : (
    <PageNotFound />
  );
}
