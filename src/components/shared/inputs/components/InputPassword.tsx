import { ComponentPropsWithoutRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/utils";
import { Button, Input } from "@/components/ui";

type Props = ComponentPropsWithoutRef<"input">;

export const InputPassword = ({ className, ...rest }: Props) => {
  const [isShowed, setIsShowed] = useState(false);

  return (
    <div className="relative">
      <Input
        className={cn("", className)}
        placeholder="Enter password..."
        type={`${isShowed ? "text" : "password"}`}
        {...rest}
      />
      <Button
        className="bg-custom-gray hover:bg-primary/25 absolute top-0 right-0 h-full"
        onClick={() => setIsShowed((prev) => !prev)}
        variant="link"
      >
        {isShowed ? (
          <Eye className="!h-5 !w-5" />
        ) : (
          <EyeOff className="!h-5 !w-5" />
        )}
      </Button>
    </div>
  );
};
