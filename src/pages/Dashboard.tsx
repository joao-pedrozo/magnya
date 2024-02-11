import SideMenu from "@/components/molecules/SideMenu";
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
