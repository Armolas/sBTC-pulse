import DashboardLayout from '../../component/layout/DashboardLayout';

export const metadata = {
  title: {
    template: '%s | sBTC Pulse',
    default: 'Dashboard | sBTC Pulse',
  },
  description: 'sBTC Pulse Analytics Dashboard',
};

export default function Layout({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}