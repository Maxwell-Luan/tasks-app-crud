"use client";

import { useActionState, useState } from "react";
import Button from "@/src/components/Button";
import InputForm from "./InputForm";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

type Props = {
  action: (_: string, formData: FormData) => Promise<string>
}

export default function FormLogin({action} : Props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, formAction, isPending] = useActionState(action, "");
  const [showPassword, setShowPassword] = useState(false);
 
  return (
    <>
      <form className="flex flex-col gap-y-6" action={formAction}>

        <InputForm
          label="E-mail"
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputForm
          label="Senha"
          name="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        >
          <div onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        </InputForm>
        {!isPending && errorMessage && <p className="text-center text-red-600 font-bold">{errorMessage}</p>}
        <Button type="submit" text="Login" />
      </form>
    </>
  );
}
