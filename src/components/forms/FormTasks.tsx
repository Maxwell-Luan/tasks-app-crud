"use client";

import { useActionState, useEffect, useState } from "react";

type Props = {
  action: (_: string, formData: FormData) => Promise<string>;
};

export default function FormTasks({ action }: Props) {
  const [task, setTask] = useState("");
  const [errorMessage, formAction, isPending] = useActionState(action, "");

  const handleAction = async (formData: FormData) => {
    await formAction(formData);
    setTask(""); 
  };

  return (
    <>
      <form className="flex mb-4" action={handleAction}>
        <input
          className="w-full pl-2 pr-2 py-1 border border-border-form rounded-l-lg outline-none text-text-form shadow-lg focus:border-border-highlight-form hover:border-border-highlight-form"
          name="task"
          value={task}
          placeholder="Informe o título da task"
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="px-3 py-1 bg-bg-button text-white text-center rounded-r-lg cursor-pointer">
          +
        </button>
      </form>
      {!isPending && errorMessage && (
        <p className="text-center text-red-600 font-bold">{errorMessage}</p>
      )}
    </>
  );
}
