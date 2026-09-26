import MyAppointments from "@/components/dashboard/MyAppointments";
import MyProfile from "@/components/dashboard/MyProfile";
import { Tabs } from "@heroui/react";

const Dashboard = async () => {
  return (
    <div className="max-w-7xl mx-auto py-10">
      <h1 className="text-4xl font-bold text-center">Dashboard</h1>

      <Tabs className="w-full  pt-5">
        <Tabs.ListContainer className="max-w-md">
          <Tabs.List aria-label="Options">
            <Tabs.Tab id="myAppointments">
              My Appointments
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="myProfile">
              My Profile
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel className="pt-4" id="myAppointments">
          <MyAppointments />
        </Tabs.Panel>
        <Tabs.Panel className="pt-4" id="myProfile">
          <MyProfile />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
export default Dashboard;
