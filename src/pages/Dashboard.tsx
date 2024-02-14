import SideMenu from "@/components/molecules/SideMenu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

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
    timeIntervals: [
      {
        start: "09:00",
        end: "18:00",
      },
    ],
    enabled: false,
  },
  {
    name: "Segunda",
    timeIntervals: [
      {
        start: "09:00",
        end: "12:00",
      },
      {
        start: "14:00",
        end: "18:00",
      },
    ],
    enabled: true,
  },
  {
    name: "Terça",
    timeIntervals: [
      {
        start: "09:00",
        end: "18:00",
      },
    ],
    enabled: true,
  },
  {
    name: "Quarta",
    timeIntervals: [
      {
        start: "09:00",
        end: "18:00",
      },
    ],
    enabled: true,
  },
  {
    name: "Quinta",
    timeIntervals: [
      {
        start: "09:00",
        end: "18:00",
      },
    ],
    enabled: true,
  },
  {
    name: "Sexta",
    timeIntervals: [
      {
        start: "09:00",
        end: "18:00",
      },
    ],
    enabled: true,
  },
  {
    name: "Sábado",
    timeIntervals: [
      {
        start: "09:00",
        end: "18:00",
      },
    ],
    enabled: false,
  },
];

const Availability = () => {
  const [availabilityData, setAvailabilityData] = useState<
    {
      start_time: string;
      end_time: string;
      weekdays: {
        id: number;
        day_name: string;
      }[];
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailabilityData = async () => {
      try {
        const { data, error } = await supabase
          .from("specialist_working_hours")
          .select("start_time, end_time, weekdays(*)")
          .eq("specialist_id", 9);

        if (error) {
          console.error("Error fetching availability data:", error);
        } else {
          setAvailabilityData(data);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAvailabilityData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
            <div className="flex gap-2" key={day.name}>
              <div className="flex items-center gap-2 w-1/3">
                <Checkbox
                  defaultChecked={day.enabled}
                  className="data-[state=checked]:bg-blue-700"
                />
                <span className="text-md font-medium mt-2">{day.name}</span>
              </div>
              <div className="w-1/3 flex flex-col gap-2">
                {day.timeIntervals.map((interval) => (
                  <div
                    className="flex gap-2"
                    key={`${interval.start}${interval.end}`}
                  >
                    <Input value={interval.start} />
                    <span className="self-center">-</span>
                    <Input value={interval.end} />
                  </div>
                ))}
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
