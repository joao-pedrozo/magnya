import SideMenu from "@/components/molecules/SideMenu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";

const Default = () => (
  <div>
    <h1 className="text-4xl font-bold text-blue-600">Dashboard</h1>
    <p className="text-lg mt-2">
      Bem-vindo ao seu painel de controle. Aqui você pode acompanhar todas as
      suas atividades.
    </p>
  </div>
);

const weekDays = [
  {
    name: "Domingo",
    start: "09:00",
    end: "18:00",
    enabled: false,
  },
  {
    name: "Segunda",
    start: "09:00",
    end: "18:00",
    enabled: true,
  },
  {
    name: "Terça",
    start: "09:00",
    end: "18:00",
    enabled: true,
  },
  {
    name: "Quarta",
    start: "09:00",
    end: "18:00",
    enabled: true,
  },
  {
    name: "Quinta",
    start: "09:00",
    end: "18:00",
    enabled: true,
  },
  {
    name: "Sexta",
    start: "09:00",
    end: "18:00",
    enabled: true,
  },
  {
    name: "Sábado",
    start: "09:00",
    end: "18:00",
    enabled: false,
  },
];

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
          atendimentos.
        </span>
        <span className="text-lg font-semibold mt-2">Horários da semana</span>
        <div className="flex flex-col gap-2">
          {weekDays.map((day) => (
            <div className="flex gap-2">
              <div className="flex items-center gap-2 w-1/3">
                <Checkbox
                  defaultChecked={day.enabled}
                  className="data-[state=checked]:bg-blue-700"
                />
                <span className="text-md font-medium mt-2">{day.name}</span>
              </div>
              <div className="flex gap-2 w-1/3">
                <Input value={day.start} />
                <span className="self-center">-</span>
                <Input value={day.end} />
              </div>
              <div className="w-1/3">
                <Button variant="ghost" className="p-2 py-1">
                  <Plus className="text-zinc-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState("default");

  return (
    <div className="py-4 px-8 flex gap-8">
      <SideMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setSelectedMenuItem={setSelectedMenuItem}
      />
      {selectedMenuItem === "default" && <Default />}
      {selectedMenuItem === "availability" && <Availability />}
    </div>
  );
}

export default Dashboard;
