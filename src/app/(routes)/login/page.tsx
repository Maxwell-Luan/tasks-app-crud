import FormLogin from "@/src/components/FormLogin";
import { COOKIE } from "@/src/constants/constants";
import { checkInvalidEmail, checkInvalidPassword } from "@/src/lib/utils";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const PAGE_TITLE = "Login";

export const metadata: Metadata = {
  title: PAGE_TITLE,
};

export default function Login() {
  async function handleLogin(_: string, formData: FormData) {
    "use server";

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
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
        email,
        password,
      };

      const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
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

        cookieStore.set("token", register.token, COOKIE);
      }
    } catch {
      console.error("handleLogin failed");
      return "Erro no Login!";
    }
    redirect("/tasks");
  }
  return (
    <>
      <h1 className="text-4xl mb-4 text-center font-bold">{PAGE_TITLE}</h1>

      <FormLogin action={handleLogin} />
      <Link className="text-center underline" href="/register">
        Não tenho cadastro
      </Link>
    </>
  );
}
