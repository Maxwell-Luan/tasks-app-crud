import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import FormRegister from "@/src/components/FormRegister";
import { checkInvalidEmail, checkInvalidPassword } from "@/src/lib/utils";
import { COOKIE } from "@/src/constants/constants";

const PAGE_TITLE = "Cadastro";

export const metadata: Metadata = {
  title: PAGE_TITLE,
};

export default function Cadastro() {
  async function handleRegister(_: string, formData: FormData) {
    "use server";

    const username = formData.get("username")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!username || !email || !password) {
      return "Preencha todos os campos!";
    }

    if (checkInvalidEmail(email)) {
      return "Email inválido!";
    }

    if (checkInvalidPassword(password)) {
      return "A senha deve ter no mínimo 6 caracteres!";
    }

    try {
      const body = {
        username,
        email,
        password,
      };

      const response = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const register = await response.json();

      console.log(register);
      if (!register.token) {
        return register.message;
      } else {
        const cookieStore = await cookies();
        cookieStore.set("token", register.token,  COOKIE);
      }
    } catch {
      console.error("handleRegister failed");
      return "Erro no Cadastro!";
    }
    redirect("/tasks");
  }
  return (
    <>
      <h1 className="text-4xl mb-4 text-center font-bold">{PAGE_TITLE}</h1>
      <FormRegister action={handleRegister} />
      <Link className="text-center underline" href="/login">
        Já tenho cadastro
      </Link>
    </>
  );
}
