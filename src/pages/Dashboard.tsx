import {
  ChevronLeft,
  LayoutDashboard,
  CalendarDays,
  Users,
  DollarSign,
  Clock,
} from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Default = () => (
  <div>
    <h1 className="text-4xl font-bold text-blue-600">Dashboard</h1>
    <p className="text-lg mt-2">
      Bem-vindo ao seu painel de controle. Aqui você pode acompanhar todas as
      suas atividades.
    </p>
  </div>
);

const Availability = () => {
  return (
    <div className="flex items-center flex-col">
      <div className="flex flex-col">
        <div className="flex gap-2">
          <h1 className="text-4xl font-bold block mb-2 mt-[-3px] text-blue-600">
            Configure sua disponibilidade
          </h1>
        </div>
        <span>
          Informe a nós quando você normalmente estará disponível para
        </span>
      </div>
    </div>
  );
};

function Dashboard() {
  const [isOpen, setIsOpen] = React.useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = React.useState("default");

  return (
    <div className="py-4 px-8 flex gap-8">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-[350px] space-y-2 border-r"
      >
        <div className="flex items-center justify-between space-x-4">
          <img src="../../logo.png" width={180} />

          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          <nav className="mt-5 ml-1">
            <ul className="flex flex-col gap-2">
              <li
                onClick={() => {
                  setSelectedMenuItem("default");
                }}
              >
                <a className="text-[18px] flex gap-2 p-2">
                  <LayoutDashboard />
                  <span className="font-semibold">Dashboard</span>
                </a>
              </li>
              <li className="hover:text-blue-600 p-2">
                <a className="text-[18px] flex gap-2">
                  <CalendarDays />
                  <span className="font-semibold">Agenda</span>
                </a>
              </li>
              <li className="hover:text-blue-600 p-2">
                <a href="#" className="text-[18px] flex gap-2">
                  <Users />
                  <span className="font-semibold">Clientes</span>
                </a>
              </li>
              <li className="hover:text-blue-600 p-2">
                <a href="#" className="text-[18px] flex gap-2">
                  <DollarSign className="ml-[-2px]" />
                  <span className="font-semibold">Pagamentos</span>
                </a>
              </li>
              <li
                className="hover:text-blue-600 p-2"
                onClick={() => {
                  setSelectedMenuItem("availability");
                }}
              >
                <a className="text-[18px] flex gap-2">
                  <Clock className="ml-[-2px]" />
                  <span className="font-semibold">Disponibilidade</span>
                </a>
              </li>
              <li className="hover:text-blue-600 p-2">
                <a href="#" className="text-[18px] flex gap-2">
                  <LayoutDashboard />
                  <span className="font-semibold">Configurações</span>
                </a>
              </li>
            </ul>
          </nav>
        </CollapsibleContent>
      </Collapsible>
      {selectedMenuItem === "default" && <Default />}
      {selectedMenuItem === "availability" && <Availability />}
    </div>
  );
}

export default Dashboard;
