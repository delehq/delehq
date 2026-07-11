type FieldProps = {
  name: string;
  label: string;
  defaultValue?: string | number | null;
  required?: boolean;
  type?: string;
  placeholder?: string;
};

export function TextField({
  name,
  label,
  defaultValue,
  required,
  type = "text",
  placeholder,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-[14px] text-black/60">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue ?? undefined}
        className="rounded-lg border border-black/15 bg-white px-4 py-2.5 text-[15px] outline-none focus:border-black/40"
      />
    </div>
  );
}

export function TextAreaField({
  name,
  label,
  defaultValue,
  required,
  rows = 4,
  placeholder,
}: FieldProps & { rows?: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-[14px] text-black/60">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={rows}
        placeholder={placeholder}
        defaultValue={defaultValue ?? undefined}
        className="rounded-lg border border-black/15 bg-white px-4 py-2.5 text-[15px] outline-none focus:border-black/40"
      />
    </div>
  );
}

export function CheckboxField({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-[14px] text-black/80">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 accent-black"
      />
      {label}
    </label>
  );
}
