import { Button } from "@/components/ui/button";
import { useState } from "react";

interface UploadButtonProps {
  onFileChange: (obj: any) => void; // Callback para passar o base64 para o componente pai
  imageName: string | null;
}

export default function UploadButton({
  onFileChange,
  imageName,
}: UploadButtonProps) {
  const [fileName, setFileName] = useState("Nenhum arquivo selecionado");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        setFileName(file.name);

        // Cria um FileReader para ler o conteúdo do arquivo
        const reader = new FileReader();

        // Define a função de callback para quando o arquivo for lido
        reader.onloadend = () => {
          if (reader.result) {
            const base64 = reader.result as string;
            onFileChange({ base64: base64, fileName: file.name }); // Passa o base64 para o componente pai
          }
        };

        // Lê o arquivo como uma URL base64
        reader.readAsDataURL(file);
      } else {
        setFileName("Nenhum arquivo selecionado");
      }
    
  };

  return (
    <div className="flex items-center space-x-2 mt-4">
      <label htmlFor="file-upload">
        <Button variant="outline" asChild>
          <span>Escolha um arquivo</span>
        </Button>
      </label>
      <input
        id="file-upload"
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
      <span className="text-gray-500 text-xs">{imageName ?? fileName}</span>
    </div>
  );
}
