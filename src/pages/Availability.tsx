import Card from "@/components/atoms/Card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useRegisterSpecialist } from "@/hooks/useRegisterSpecialist";
import { Clock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabase";

const availableHours = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

const weekDays = [
  { value: "Domingo", enabled: false },
  { value: "Segunda-feira", enabled: true },
  { value: "Terça-feira", enabled: true },
  { value: "Quarta-feira", enabled: true },
  { value: "Quinta-feira", enabled: true },
  { value: "Sexta-feira", enabled: true },
  { value: "Sábado", enabled: false },
];

function Availability() {
  const navigate = useNavigate();
  const { url } = useRegisterSpecialist();
  const [entryTime, setEntryTime] = useState("09:00");
  const [exitTime, setExitTime] = useState("18:00");
  const [selectedDays, setSelectedDays] = useState(
    weekDays.filter((day) => day.enabled).map((day) => day.value)
  );

  const handleContinue = async () => {
    const selectedWeekdays = weekDays.filter((day) =>
      selectedDays.includes(day.value)
    );

    const workingHours = selectedWeekdays.map((day) => ({
      day: day.value,
      start_time: entryTime,
      end_time: exitTime,
    }));

    const specialist = await supabase
      .from("specialists")
      .select()
      .eq("username", url);

    const weekDaysFromDatabase = await supabase
      .from("weekdays")
      .select("id, day_name");

    const weekdayIds = weekDaysFromDatabase.data?.reduce((acc, day) => {
      acc[day.day_name.toLowerCase()] = day.id;
      return acc;
    }, {});

    const specialistWorkingHoursData = workingHours.map((hours) => ({
      specialist_id: specialist.data![0].id,
      weekday_id: weekdayIds[hours.day.toLowerCase()],
      start_time: entryTime,
      end_time: exitTime,
    }));

    await supabase
      .from("specialist_working_hours")
      .insert(specialistWorkingHoursData);

    navigate(`/dashboard`);
  };

  return (
    <div className="flex items-center mt-4 flex-col">
      <div className="flex flex-col">
        <Card className="p-10 gap-16">
          <div className="flex flex-col">
            <section>
              <div className="flex gap-2">
                <Clock />
                <span className="text-2xl font-bold text-[#1e1e1e] block mb-2 mt-[-3px]">
                  Configure sua disponibilidade
                </span>
              </div>
              <span>
                Informe a nós quando você normalmente estará disponível para
                aceitar consultas.
              </span>
            </section>

            <Separator className="my-3" />

            <section>
              <span className="text-md font-bold block">
                Horários disponíveis
              </span>
              <div className="flex gap-4 mt-2">
                <Select
                  value="09:00"
                  onValueChange={(value) => setEntryTime(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Entrada" />
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
                <Select
                  value="18:00"
                  onValueChange={(value) => setExitTime(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Saída" />
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
            </section>
            <section>
              <span className="text-md font-bold block my-4">
                Dias disponíveis
              </span>
              <ul className="flex items-center flex-wrap">
                {weekDays.map((day) => (
                  <li
                    key={day.value}
                    className="border flex flex-col items-center p-4 h-full ml-[-1px] mb-[-1px] min-w-[126px]"
                  >
                    <Checkbox
                      defaultChecked={day.enabled}
                      className="data-[state=checked]:bg-blue-700"
                      onCheckedChange={(checked) => {
                        const updatedDays = checked
                          ? [...selectedDays, day.value]
                          : selectedDays.filter(
                              (selectedDay) => selectedDay !== day.value
                            );
                        setSelectedDays(updatedDays);
                      }}
                    />
                    <span className="text-sm text-center">{day.value}</span>
                  </li>
                ))}
              </ul>
            </section>
            <Button
              className="bg-blue-700 hover:bg-blue-600 font-bold mt-4 disabled:opacity-50 transition-all w-fit px-6"
              onClick={handleContinue}
            >
              Continuar
            </Button>
          </div>
          {/* For responsive design we can just remove this on mobile */}
          <div className="flex flex-shrink-0">
            <img
              src="../../calendar-illustration-2.png"
              className="max-w-[380px] w-full h-auto"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Availability;
