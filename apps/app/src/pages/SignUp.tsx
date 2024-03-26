import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/supabase";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "https://example.com/welcome",
      },
    });
    if (error) {
      console.error("Error signing up:", error.message);
    } else {
      console.log("Sign up successful:", data);
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Acesse o dashboard para configurar seu perfil.",
      });
      navigate("/dashboard");
    }
  };

  return (
    <div>
      <h1 className="text-3xl text-center my-4">SignUp</h1>

      <form onSubmit={handleSignUp} className="flex flex-col items-center">
        <label>
          Email:
          <input type="email" name="email" className="border ml-2" />
        </label>
        <label>
          Password:
          <input type="password" name="password" className="border ml-2" />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
