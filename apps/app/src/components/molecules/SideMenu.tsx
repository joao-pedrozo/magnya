import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import {
  ChevronLeft,
  LayoutDashboard,
  CalendarDays,
  Users,
  DollarSign,
} from "lucide-react";
import { Button } from "../ui/button";

interface SideMenuProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  setSelectedMenuItem: (value: string) => void;
}

function SideMenu({ isOpen, setIsOpen, setSelectedMenuItem }: SideMenuProps) {
  return (
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
              <a className="text-[18px] flex gap-4 p-2">
                <LayoutDashboard />
                <span className="font-semibold ml-[-4px]">Dashboard</span>
              </a>
            </li>
            <li
              className="hover:text-blue-600 p-2"
              onClick={() => {
                setSelectedMenuItem("agenda");
              }}
            >
              <a className="text-[18px] flex gap-3">
                <CalendarDays />
                <span className="font-semibold">Agendamentos</span>
              </a>
            </li>
            <li
              className="hover:text-blue-600 p-2"
              onClick={() => {
                setSelectedMenuItem("clients");
              }}
            >
              <a href="#" className="text-[18px] flex gap-3">
                <Users />
                <span className="font-semibold">Clientes</span>
              </a>
            </li>
            <li
              className="hover:text-blue-600 p-2"
              onClick={() => {
                setSelectedMenuItem("billings");
              }}
            >
              <a href="#" className="text-[18px] flex gap-3">
                <DollarSign className="ml-[-2px]" />
                <span className="font-semibold">Cobranças</span>
              </a>
            </li>
            {/* <li
              className="hover:text-blue-600 p-2"
              onClick={() => {
                setSelectedMenuItem("availability");
              }}
            >
              <a className="text-[18px] flex gap-3">
                <Clock className="ml-[-2px]" />
                <span className="font-semibold">Disponibilidade</span>
              </a>
            </li> */}
            <li
              className="hover:text-blue-600 p-2"
              onClick={() => {
                setSelectedMenuItem("configuration");
              }}
            >
              <a href="#" className="text-[18px] flex gap-3">
                <LayoutDashboard />
                <span className="font-semibold">Configurações</span>
              </a>
            </li>
          </ul>
        </nav>
      </CollapsibleContent>
    </Collapsible>
  );
}

export default SideMenu;
