import SectionTitle from "@/components/atoms/SectionTitle";
import AppointmentsListing from "./components/AppointmentsListing";

export default function Agenda() {
  return (
    <div>
      <SectionTitle
        title="Agendamentos"
        subtitle="Aqui você pode visualizar e gerenciar os seus agendamentos."
        className="mb-4"
      />
      {/* <div className="flex justify-between mb-4 items-center">
        <div>Filtros</div>
        <NewAppointmentForm />
      </div> */}
      <AppointmentsListing />
    </div>
  );
}
