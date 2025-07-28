import { ComponentProps, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/utils";
import { Button, Input } from "@/components/ui";

type Props = ComponentProps<"input">;

export const InputPassword = ({ className, ...rest }: Props) => {
  const [isShowed, setIsShowed] = useState(false);

  const handleShow = () => setIsShowed((prev) => !prev);

  return (
    <div className="flex h-12 items-center">
      <Input
        type={isShowed ? "text" : "password"}
        placeholder="Enter password..."
        className={cn("flex-1 rounded-r-none", className)}
        {...rest}
      />
      <Button
        type="button"
        onClick={handleShow}
        variant="outline"
        size="icon"
        className="h-full rounded-l-none border-l-0"
      >
        {isShowed ? <Eye /> : <EyeOff />}
      </Button>
    </div>
  );
};
