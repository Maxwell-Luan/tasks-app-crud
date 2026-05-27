"use server";

import { fetchWithToken } from "@/src/lib/fetchWithToken";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function handleCreateTasks(_: string, formData: FormData) {
  const task = formData.get("task")?.toString();

  if (!task) {
    return "Você precisa informar o título da task";
  }

  try {
    const body = {
      title: task,
    };

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return "Token não encontrado";
    } else {
      const response = await fetchWithToken(
        `${process.env.BACKEND_URL}/tasks`,
        token,
        {
          method: "POST",
          body: JSON.stringify(body),
        },
      );

      if (response.message) {
        return response.message;
      } else {
        revalidatePath("/tasks");
      }
    }
  } catch {
    console.error("handleCreateTasks failed");
    return "Erro ao criar Task!";
  }
}

export async function handleCompleteTasks(formData: FormData) {
  const id = formData.get("id")?.toString();

  if (!id) {
    return "Você precisa informar o id da task";
  }

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      console.error("Token não encontrado");
      return;
    } else {
      const completed = formData.get("completed");
      const endpoint = completed !== null ? "complete" : "uncomplete"

      const response = await fetchWithToken(
        `${process.env.BACKEND_URL}/tasks/${id}/${endpoint}`,
        token,
        {
          method: "PUT",
        },
      );

      if (response.message) {
        console.error(response.message);
        return;
      } else {
        revalidatePath("/tasks");
      }
    }
  } catch {
    console.error("handleCompleteTasks failed");
    return "Erro ao atualizar Task!";
  }
}

export async function handleDeleteTasks(id: string) {

  if (!id) {
    return "Você precisa informar o id da task";
  }

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      console.error("Token não encontrado");
      return;
    } else {
      const response = await fetchWithToken(
        `${process.env.BACKEND_URL}/tasks/${id}`,
        token,
        {
          method: "DELETE",
        },
      );

      if (response.message) {
        console.error(response.message);
        return;
      } else {
        revalidatePath("/tasks");
      }
    }
  } catch {
    console.error("handleDeleteTasks failed");
    return "Erro ao deletar Task!";
  }
}