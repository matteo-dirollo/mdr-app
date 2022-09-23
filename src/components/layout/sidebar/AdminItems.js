import { FiLayout, FiMail, FiUsers } from 'react-icons/fi';
import { IoIosAnalytics } from 'react-icons/io';
export const AdminItems = [
  {
    label: 'Dashboard',
    to: '/admin',
    icon: FiLayout,
  },
  {
    label: 'Messages',
    to: '/admin/messages',
    icon: FiMail,
  },
  {
    label: 'Users',
    to: '/admin/users',
    icon: FiUsers,
  },
  {
    label: 'Analytics',
    to: '/admin/analytics',
    icon: IoIosAnalytics,
  },
];
