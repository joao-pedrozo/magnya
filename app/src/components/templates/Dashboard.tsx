import SideMenu from "@/components/molecules/SideMenu";
import { useState } from "react";

function Dashboard({
  children,
  setSelectedMenuItem,
}: {
  children: React.ReactNode;
  selectedMenuItem: string;
  setSelectedMenuItem: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="py-4 px-8 flex gap-8">
      <SideMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setSelectedMenuItem={setSelectedMenuItem}
      />
      {children}
    </div>
  );
}

export default Dashboard;
