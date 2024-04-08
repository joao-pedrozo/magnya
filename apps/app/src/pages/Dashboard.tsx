import { useEffect, useState } from "react";

import Availability from "@/components/organisms/dashboard/Availability";
import Default from "@/components/organisms/dashboard/Default";
import Clients from "@/components/organisms/dashboard/Clients";
import Billings from "@/components/organisms/dashboard/Billings";
import Template from "@/components/templates/Dashboard";
import Agenda from "@/components/organisms/dashboard/Agenda";
import Configuration from "@/components/organisms/dashboard/Configuration";
import { supabase } from "@/supabase";
import SubscriptionChargeDialog from "@/components/organisms/dashboard/Default/SubscriptionChargeDialog";
import { useSubscription } from "@/hooks/useSubscription";

function Dashboard() {
  const [selectedMenuItem, setSelectedMenuItem] = useState("default");
  const { status } = useSubscription();

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
      {selectedMenuItem === "configuration" && <Configuration />}
      {status && status !== "paid" && <SubscriptionChargeDialog />}
    </Template>
  );
}

export default Dashboard;
