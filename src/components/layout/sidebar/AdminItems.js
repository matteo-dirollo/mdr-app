import { FiLayout, FiMail, FiUsers } from 'react-icons/fi';
import { IoIosAnalytics } from 'react-icons/io';
import { MdPostAdd } from 'react-icons/md';
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
    label: 'Posts',
    to: '/admin/posts',
    icon: MdPostAdd,
  },
  {
    label: 'Analytics',
    to: '/admin/analytics',
    icon: IoIosAnalytics,
  },
];
