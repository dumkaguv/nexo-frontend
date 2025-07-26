import { ComponentPropsWithoutRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/utils";
import { Button, Input } from "@/components/ui";

type Props = ComponentPropsWithoutRef<"input">;

export const InputPassword = ({ className, ...rest }: Props) => {
  const [isShowed, setIsShowed] = useState(false);

  return (
    <div className="flex items-center">
      <Input
        type={isShowed ? "text" : "password"}
        placeholder="Enter password..."
        className={cn("flex-1 rounded-r-none", className)}
        {...rest}
      />
      <Button
        type="button"
        onClick={() => setIsShowed((prev) => !prev)}
        variant="outline"
        size="icon"
        className="rounded-l-none border-l-0 h-full"
      >
        {isShowed ? (
          <Eye className="h-5 w-5" />
        ) : (
          <EyeOff className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
};
