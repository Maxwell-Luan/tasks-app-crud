import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import FormRegister from "@/src/components/FormRegister";

const PAGE_TITLE = "Cadastro";

export const metadata: Metadata = {
  title: PAGE_TITLE
}

export default function Cadastro() {
  async function handleRegister(_: string, formData: FormData) {
    "use server";

    const username = formData.get("username")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if(!username || !email || !password){
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
        username,
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
        const cookieStore = await cookies();
        cookieStore.set("token", register.token, {
          httpOnly: true,
          secure: true,
          path: "/",
          maxAge: 60 * 60 * 24
        });
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

      <FormRegister action={handleRegister} />

      <Link className="text-center underline" href="/login">
        Já tenho cadastro
      </Link>
    </div>
  );
}
