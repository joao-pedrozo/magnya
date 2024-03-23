import { supabase } from "@/supabase";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Database } from "../../database.types";
import { Calendar } from "@/components/ui/calendar";

type Specialist = Database["public"]["Tables"]["specialists"]["Row"];

const Schedule = () => {
  const [loading, setLoading] = useState(true);
  const [specialist, setSpecialist] = useState<Specialist | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const location = useLocation();
  const navigate = useNavigate();
  const username = location.pathname.slice(1);

  useEffect(() => {
    const fetchSpecialist = async () => {
      const { data, error } = await supabase
        .from("specialists")
        .select("*")
        .eq("username", username);

      const specialist = data as Specialist[];

      if (error || !specialist.length) {
        navigate("/404");
      }

      setLoading(false);
      setSpecialist(specialist[0]);
    };

    fetchSpecialist();
  }, [username]);

  if (loading || !specialist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mt-4">Schedule Page</h1>
      <p className="mt-2 text-center text-xl">
        Welcome to the schedule page for <b>{specialist.username}</b>
      </p>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border mt-4"
      />
    </div>
  );
};

export default Schedule;
