/* eslint-disable @typescript-eslint/no-explicit-any */
import FormTasks from "@/src/components/forms/FormTasks";
import { fetchWithToken } from "@/src/lib/fetchWithToken";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { handleCompleteTasks, handleCreateTasks } from "./actions";
import TaskCard from "@/src/components/TaskCard";

const PAGE_TITLE = "Tasks";

export const metadata: Metadata = {
  title: PAGE_TITLE,
};

type TaskType = {
  _id: string;
  userId: string;
  title: string;
  completed: boolean;
  deleted: boolean;
  createDate: string;
  modifyDate: string;
  _v: 0;
};

export default async function Tasks() {

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  const response = await fetchWithToken(
    `${process.env.BACKEND_URL}/tasks`,
    token,
  );

  return (
    <>
      <h1 className="text-4xl text-center font-bold">Tasks</h1>
      <FormTasks action={handleCreateTasks} />
      <ul className="flex flex-col gap-3">
        {response.tasks.reverse().sort((a: any, b: any) => (!a.completed && b.completed ? -1 : 1)).map((task: TaskType) => (
          <TaskCard 
          key={task._id}
          id={task._id}
          completed={task.completed}
          completeAction={handleCompleteTasks}>{task.title}</TaskCard>
        ))}
      </ul>
    </>
  );
}
