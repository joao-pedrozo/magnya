import Availability from "@/components/organisms/dashboard/Availability";
import Default from "@/components/organisms/dashboard/Default";
import Clients from "@/components/organisms/dashboard/Clients";
import Billings from "@/components/organisms/dashboard/Billings";
import Template from "@/components/templates/Dashboard";
import { useState } from "react";
import Agenda from "@/components/organisms/dashboard/Agenda";

function Dashboard() {
  const [selectedMenuItem, setSelectedMenuItem] = useState("default");

  return (
    <Template
      selectedMenuItem={selectedMenuItem}
      setSelectedMenuItem={setSelectedMenuItem}
    >
      {selectedMenuItem === "default" && <Default />}
      {selectedMenuItem === "availability" && <Availability />}
      {selectedMenuItem === "clients" && <Clients />}
      {selectedMenuItem === "billings" && <Billings />}
      {selectedMenuItem === "agenda" && <Agenda />}
    </Template>
  );
}

export default Dashboard;
