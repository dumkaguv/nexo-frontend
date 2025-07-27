export type InputField<T> = {
  name: keyof T;
  label: string;
  type: "text" | "password";
  placeholder: string;
  id: string;
};
