import Card from "@/components/atoms/Card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

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

function Availability() {
  return (
    <div className="flex items-center mt-4 flex-col">
      <div className="flex flex-col">
        <Card className="p-10 max-w-4xl gap-8">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-[#1e1e1e] block mb-2">
              Configure sua disponibilidade
            </span>
            <span>
              Informe a nós quando você normalmente estará disponível para
              aceitar consultas.
            </span>
            <Separator className="my-3" />
            <span className="text-md font-bold block">
              Horários disponíveis
            </span>
            <div className="flex gap-4 mt-2">
              <Select value="09:00">
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
              <Select value="18:00">
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
          </div>
          <div>
            <img src="../../calendar-illustration.png" />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Availability;
