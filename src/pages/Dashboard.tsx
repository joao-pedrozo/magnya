import SideMenu from "@/components/molecules/SideMenu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const availableHours = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];

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

const Availability = () => {
  const [availabilityData, setAvailabilityData] = useState<
    {
      start_time: string;
      end_time: string;
      weekdays: {
        id: number;
        day_name: string;
      };
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

  const onAddAvailability = (weekDayId: number) => {
    const latestAvailability = availabilityData.filter(
      (day) => day.weekdays.id === weekDayId
    )[0];

    const newStartTime = latestAvailability
      ? incrementTimeByOneHour(latestAvailability.end_time)
      : "00:00";
    const newEndTime = incrementTimeByOneHour(newStartTime);

    setAvailabilityData((prev) => [
      ...prev,
      {
        start_time: newStartTime,
        end_time: newEndTime,
        weekdays: {
          id: weekDayId,
          day_name:
            availabilityData.find((day) => day.weekdays.id === weekDayId)
              ?.weekdays.day_name || "",
        },
      },
    ]);
  };

  const incrementTimeByOneHour = (time: string) => {
    const [hours, minutes] = time.split(":");
    const incrementedHours = parseInt(hours) + 1;
    return `${incrementedHours.toString().padStart(2, "0")}:${minutes}`;
  };

  const handleSelectValueChange = (
    value: string,
    index: number,
    field: "start_time" | "end_time"
  ) => {
    setAvailabilityData((prev) => {
      const updatedData = [...prev];
      updatedData[index][field] = value;
      return updatedData;
    });
  };

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
          {availabilityData.map((day, index) => (
            <div className="flex gap-2" key={day.weekdays.id}>
              <div className="flex items-center gap-2">
                <Checkbox
                  defaultChecked={true}
                  className="data-[state=checked]:bg-blue-700"
                />
                <span className="text-md font-medium mt-2">
                  {day.weekdays.day_name}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  {availabilityData
                    .filter((temp) => temp.weekdays.id === day.weekdays.id)
                    .map((day2) => {
                      return (
                        <div key={day.weekdays.id}>
                          <div className="flex gap-2">
                            <Select
                              value={day2.start_time.slice(0, 5)}
                              onValueChange={(value) =>
                                handleSelectValueChange(
                                  value,
                                  index,
                                  "start_time"
                                )
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {availableHours.map((hour) => (
                                    <SelectItem key={hour} value={hour}>
                                      {hour}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <span className="self-center">-</span>
                            <Select
                              value={day2.end_time.slice(0, 5)}
                              onValueChange={(value) =>
                                handleSelectValueChange(
                                  value,
                                  index,
                                  "end_time"
                                )
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {availableHours.map((hour) => (
                                    <SelectItem key={hour} value={hour}>
                                      {hour}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="">
                <Button
                  variant="ghost"
                  className="p-2 py-1"
                  onClick={() => onAddAvailability(day.weekdays.id)}
                >
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
