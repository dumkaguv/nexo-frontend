import { InputFieldErrors, InputPassword } from "@/components/shared";
import { Button, Input, Label } from "@/components/ui";
import { useRegisterForm } from "@/features/auth/hooks";

export const RegisterForm = () => {
  const { handleSubmit, inputFields, register, errors, onSubmit, isPending } =
    useRegisterForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-3 flex flex-col gap-5 text-start"
    >
      {inputFields.map(({ name, id, label, placeholder, type }) => {
        const inputProps = {
          ...register(name),
          id,
          placeholder,
        };

        return (
          <div
            key={name}
            className="flex flex-col gap-1"
          >
            <Label htmlFor={id}>{label}</Label>
            {type === "password" ? (
              <InputPassword {...inputProps} />
            ) : (
              <Input {...inputProps} />
            )}
            <InputFieldErrors message={errors[name]?.message} />
          </div>
        );
      })}

      <Button
        type="submit"
        loading={isPending}
        className="mt-2 h-12 w-full text-lg"
      >
        Sign me up
      </Button>
    </form>
  );
};
