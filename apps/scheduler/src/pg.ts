import { supabase } from "./supabase";

const test = async () => {
  const { data, error } = await supabase.from("billings").select(`
    *,
    appointments(
      appointment_id,
      clients(*)
    )
  `);

  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
};

test();
