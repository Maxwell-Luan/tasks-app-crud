type Props = {
    label: string,
    name: string,
    type?: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
}

export default function FormInput({label, name, type, value, onChange, children}: Props){

  return (
    <fieldset className="flex flex-col">
      <label className="text-text-form" htmlFor={name}>
        {label}
      </label>
      <div className="relative flex items-center w-full">
        <input
          className="w-full pl-2 pr-8 py-1 rounded-lg border border-border-form outline-none text-text-form shadow-md focus:border-border-highlight-form hover:border-border-highlight-form"
          name={name}
          value={value}
          type={type}
          onChange={onChange}
        />
        <div className="absolute right-3 cursor-pointer select-none">
          {children}
        </div>
      </div>
    </fieldset>
  );
}
