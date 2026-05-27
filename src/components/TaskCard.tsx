/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import classNames from "classnames";
import { handleDeleteTasks } from "../app/(routes)/tasks/actions";

type Props = {
  id: string;
  completed: boolean;
  completeAction: (formData: FormData) => Promise<any>;
  children: React.ReactNode;
};

export default function TaskCard({id, completed, completeAction, children }: Props) {
  
  return (
    <li
      className={classNames(
        "flex justify-between p-4 text-text-form border border-border-form rounded-lg",
        { "opacity-50": completed, "hover:border-border-highlight-form": !completed },
      )}
    >
      <div className="flex gap-1.5">
        <form className="flex flex-col justify-center" action={completeAction}>
          <input name="id" type="hidden" value={id} />
          <input
            className="appearance-none w-4 h-4 border border-border-highlight-form rounded bg-bg-form checked:bg-bg-button flex items-center justify-center after:content-['✓'] after:text-white after:text-xs after:hidden checked:after:block cursor-pointer"
            name="completed"
            type="checkbox"
            defaultChecked={completed}
            onChange={(e) => e.target.form?.requestSubmit()}
            />
        </form>
          <p className={classNames("cursor-default", {"line-through": completed})}>
            {children}
          </p>
      </div>
      <div>
        {!completed && (
          <button 
            className="font-bold text-red-600 cursor-pointer px-2"
            onClick={() => handleDeleteTasks(id)}>X
          </button>
        )}
      </div>
    </li>
  );
}
