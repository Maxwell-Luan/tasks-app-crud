import FormLogin from "@/src/components/FormLogin";
import { Metadata } from "next";
import { redirect } from "next/navigation";

const PAGE_TITLE = "Login";

export const metadata: Metadata = {
  title: PAGE_TITLE
}

export default function Login() {
  async function handleRegister(_: string, formData: FormData) {
    "use server";

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if(!email || !password){
      return "Preencha todos os campos!";
    }

    if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
      return "Email inválido!"
    }

    if(password.length < 6){
      return "A senha deve ter no mínimo 6 caracteres!";
    }

    try {
      const body = {
        email,
        password,
      };

      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const register = await response.json();

      console.log(register);
      if(!register.token){
        return register.message;
      }
      else{
        // @todo: adicionar lógica de usuário autenticado
      }
      
    } catch {
      console.error("handleRegister failed");
      return "Erro no Cadastro!";
    }
    redirect("/tasks");
  }
  return (
    <div className="min-w-100 flex flex-col px-8 py-12 gap-y-4px bg-bg-form rounded-3xl shadow-xl">
      <h1 className="text-4xl mb-4 text-center font-bold">{PAGE_TITLE}</h1>

      <FormLogin action={handleRegister} />
    </div>
  );
}
