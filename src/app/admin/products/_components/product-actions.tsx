"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { useTransition } from "react";
import { deleteProduct, toggleProductAvailability } from "../../_actions/products";

export const ActiveToggleDropdownItem = ({
  id,
  isAvailable,
}: {
  id: string;
  isAvailable: boolean;
}) => {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailable);
        });
      }}
    >
      {isAvailable ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  );
};

export const DeleteDropdownItem = ({
  id,
  disabled,
}: {
  id: string;
  disabled: boolean;
}) => {
  const [isPending, startTransition] = useTransition();

  return (
    <DropdownMenuItem
      disabled={isPending || disabled}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id);
        });
      }}
      className="text-destructive"
    >
      Delete
    </DropdownMenuItem>
  );
};
