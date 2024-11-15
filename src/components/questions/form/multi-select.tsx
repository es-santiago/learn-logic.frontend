"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Dispatch, SetStateAction, useState, useRef } from "react";

type Option = { label: string; value: string };

interface ISelectProps {
  placeholder: string;
  options: Option[];
  selectedOptions: string[];
  setSelectedOptions: Dispatch<SetStateAction<string[]>>;
}

const MultiSelect = ({
  placeholder,
  options: values,
  selectedOptions: selectedItems,
  setSelectedOptions: setSelectedItems,
}: ISelectProps) => {
  const [search, setSearch] = useState(""); // Estado para armazenar a pesquisa
  const [isSearching, setIsSearching] = useState(false); // Estado para controlar a pesquisa
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Referência para o timeout

  // Filtra as opções se o comprimento da pesquisa for maior ou igual a 3
  const filteredOptions = search.length >= 3
    ? values.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
      ).slice(0, 10) // Exibe as primeiras 10 opções
    : values.slice(0, 10); // Exibe as primeiras 10 opções quando a pesquisa for menor que 3

  // Função para manipular mudanças no campo de pesquisa
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Limpa o timeout anterior, se houver
    }

    if (newSearch.length >= 3) {
      setIsSearching(true); // Inicia a busca
      timeoutRef.current = setTimeout(() => {
        setIsSearching(false); // Finaliza a busca após 1 segundo
      }, 1000); // Delay de 1 segundo
    }
  };

  const handleSelectChange = (value: string) => {
    if (!selectedItems.includes(value)) {
      setSelectedItems((prev) => [...prev, value]);
    } else {
      const referencedArray = [...selectedItems];
      const indexOfItemToBeRemoved = referencedArray.indexOf(value);
      referencedArray.splice(indexOfItemToBeRemoved, 1);
      setSelectedItems(referencedArray);
    }
  };

  const isOptionSelected = (value: string): boolean => {
    return selectedItems.includes(value);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-full">
          <Button
            variant="outline"
            className="w-full flex items-center justify-between"
          >
            <div>{placeholder}</div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 mt-2"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          {/* Campo de pesquisa */}
          <input
            type="text"
            placeholder="Pesquisar..."
            value={search}
            onChange={handleSearchChange}
            className="w-full px-2 py-1 mb-2 border rounded"
          />
          {/* Exibe uma mensagem enquanto aguarda a pesquisa */}
          {isSearching && search.length >= 3 && (
            <div className="text-sm text-gray-500">Procurando...</div>
          )}
          {/* Renderiza as opções filtradas ou todas as opções */}
          {filteredOptions.map((value: Option, index: number) => (
            <DropdownMenuCheckboxItem
              onSelect={(e) => e.preventDefault()}
              key={index}
              checked={isOptionSelected(value.label)}
              onCheckedChange={() => handleSelectChange(value.label)}
            >
              {value.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default MultiSelect;
