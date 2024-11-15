import { ListFilter, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ModalQuestion } from "@/components/questions/form/modal-question";

interface ActionButtonsProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ filter, setFilter }) => {
  return (
    <div className="flex items-center">
      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-7 gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Filtro
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {["TODOS", "ATIVO", "INATIVO"].map((option) => (
              <DropdownMenuCheckboxItem
                key={option}
                checked={filter === option}
                onSelect={() => setFilter(option)}
              >
                {option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="add" className="h-7 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Adicionar
              </span>
            </Button>
          </DialogTrigger>
          <ModalQuestion />
        </Dialog>
      </div>
    </div>
  );
};

export default ActionButtons;
