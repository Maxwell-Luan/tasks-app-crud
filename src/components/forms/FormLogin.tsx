"use client";

import { useActionState, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import FormInput from "../FormInput";
import FormButton from "@/src/components/FormButton";

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
      <form className="flex flex-col gap-y-6 mb-4" action={formAction}>

        <FormInput
          label="E-mail"
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormInput
          label="Senha"
          name="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        >
          <div onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
        </FormInput>
        {!isPending && errorMessage && <p className="text-center text-red-600 font-bold">{errorMessage}</p>}
        <FormButton type="submit" text="Login" />
      </form>
    </>
  );
}
