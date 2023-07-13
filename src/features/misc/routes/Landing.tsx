import Tabs from '@/components/Elements/Tabs/Tabs';
import MainLayout from '@/components/Layouts/MainLayout';
import { serviceConfigs } from '@/config/services';

const Landing = () => {
  const services = [...serviceConfigs];

  return (
    <MainLayout>
      <Tabs data={services} />
    </MainLayout>
  );
};

export default Landing;
