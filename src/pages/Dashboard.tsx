import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronLeft,
  LayoutDashboard,
  CalendarDays,
  Users,
  DollarSign,
} from "lucide-react";

import React from "react";

function Dashboard() {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="py-4 px-8">
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
              <li>
                <a
                  href="#"
                  className="text-[18px] flex gap-2 text-blue-600 p-2"
                >
                  <LayoutDashboard />
                  <span className="font-semibold">Dashboard</span>
                </a>
              </li>
              <li className="hover:text-blue-600 p-2">
                <a href="#" className="text-[18px] flex gap-2">
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
    </div>
  );
}

export default Dashboard;
