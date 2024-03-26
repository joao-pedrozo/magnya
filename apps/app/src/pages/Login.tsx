import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/supabase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { _, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: "Erro ao fazer login",
        description: error.message,
      });
    } else {
      toast({
        title: "Login realizado com sucesso!",
      });

      navigate("/dashboard");
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-center my-4">Login</h1>

      <form onSubmit={handleLogin} className="flex flex-col items-center">
        <label>
          Email:
          <input type="email" name="email" className="border ml-2" />
        </label>
        <label>
          Password:
          <input type="password" name="password" className="border ml-2" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
