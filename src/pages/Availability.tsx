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
  return (
    <div className="flex items-center mt-4 flex-col">
      <div className="flex flex-col">
        <Card className="p-10 gap-8">
          <div className="flex flex-col">
            <section>
              <span className="text-2xl font-bold text-[#1e1e1e] block mb-2">
                Configure sua disponibilidade
              </span>
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
            </section>
            <section>
              <span className="text-md font-bold block my-4">
                Dias disponíveis
              </span>
              <ul className="flex items-center justify-center">
                {weekDays.map((day) => (
                  <li
                    key={day.value}
                    className="border flex flex-col items-center px-12 py-4 h-full border-l-0 first:border-l"
                  >
                    <Checkbox checked={day.enabled} />
                    <span className="text-sm text-center">{day.value}</span>
                  </li>
                ))}
              </ul>
            </section>
            <Button className="bg-blue-700 hover:bg-blue-600 font-bold mt-4 disabled:opacity-50 transition-all w-fit px-6">
              Continuar
            </Button>
            {/* <section className="flex items-center justify-center gap-2 text-neutral-700 mt-6">
              <BadgeInfo />
              <span className="mt-[3px]">
                Não se preocupe, você poderá alterar essas informações a
                qualquer momento.
              </span>
            </section> */}
          </div>
          {/* <div>
            <img src="../../calendar-illustration.png" />
          </div> */}
        </Card>
      </div>
    </div>
  );
}

export default Availability;