import { FC } from "react";
import { cn } from "@/lib";
import { Button, Input } from "@/components/ui";
import { Search, X } from "lucide-react";

interface Props {
  onButtonClearClick?: () => void;
  className?: string;
}

export const InputSearch: FC<Props> = ({ onButtonClearClick, className }) => {
  return (
    <div className={cn("relative h-fit", className)}>
      <Input
        className="bg-custom-gray px-8"
        placeholder="Search user, e.g John"
      />
      <Search
        size={16}
        className="pointer-events-none absolute inset-y-0 left-2 my-auto opacity-50"
      />
      {onButtonClearClick && (
        <Button
          className="absolute top-1/2 right-0 -translate-y-1/2 opacity-50"
          onClick={onButtonClearClick}
          variant="link"
          type="button"
        >
          <X size={16} className="text-gray-600" />
        </Button>
      )}
    </div>
  );
};
