import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { supabase } from "@/supabase";

const RegisterSpecialistContext = createContext<{
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
  create: () => Promise<void>;
}>({
  url: "",
  setUrl: () => {},
  create: async () => {},
});

const RegisterSpecialistProvider = ({ children }: { children: ReactNode }) => {
  const [url, setUrl] = useState("");

  const create = async () => {
    const alreadyRegisteredUrl = await supabase
      .from("specialists")
      .select()
      .eq("username", url);

    if (alreadyRegisteredUrl.data?.length) {
      alert("URL already registered");
      throw new Error("URL already registered");
    }

    await supabase.from("specialists").insert([
      {
        username: url,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  };

  return (
    <RegisterSpecialistContext.Provider value={{ url, setUrl, create }}>
      {children}
    </RegisterSpecialistContext.Provider>
  );
};

const useRegisterSpecialist = () => {
  const context = useContext(RegisterSpecialistContext);

  if (!context) {
    throw new Error(
      "useRegisterSpecialist must be used within an RegisterSpecialistProvider"
    );
  }
  return context;
};

export { RegisterSpecialistProvider, useRegisterSpecialist };
