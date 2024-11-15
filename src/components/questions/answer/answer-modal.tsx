"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getWithAuth, postWithAuth } from "@/utils/api/httpService";
import { UserTypeEnum } from "@/utils/enum/UserType.enum";
import { errorToast } from "@/utils/toast";
import { getUserType } from "@/utils/tokenService";
import { CheckCheck, EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";

// Definindo os tipos de props
type AnswerModalProps = {
  isResponding: boolean;
  questionId: string;
};

export function AnswerModal({ isResponding, questionId }: AnswerModalProps) {
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [items, setItems] = useState<QuestionItems[]>([]);
  const [isAdm, setIsAdm] = useState(true);

  useEffect(() => {
    const type = getUserType();
    if (type) {
      const adm = UserTypeEnum.ADM.id;
      setIsAdm(Number(type) === adm);
    }
  }, []);

  const [selectedItemId, setSelectedItemId] = useState("");

  const handleCheckboxChange = (id: string) => {
    console.log("entrou");
    setSelectedItemId(id); // Armazena o ID do item marcado
  };

  const handleAnswer = async () => {
    if (!selectedItemId) {
      errorToast("Nenhum item foi selecionado.");
      return;
    }
    const obj = {
      questionId: questionId,
      selectedItemId: selectedItemId,
    };
    const res = await postWithAuth({
      url: `https://localhost:5001/questionanswer`,
      data: obj,
      successMessage: "Resposta registrada com sucesso!",
      errorMessage: "Falha ao registrar resposta!",
    });
  };

  useEffect(() => {
    if (questionId) {
      getQuestion();
    }
  }, [questionId]);

  const getQuestion = async () => {
    const res = await getWithAuth({
      url: `https://localhost:5001/questions/get/${questionId}`,
      errorMessage: "Falha ao buscar questão!",
    });

    if (res.success) {
      const data = res.data as Question;
      setTitle(data.title);
      setNumber(data.number);
      setDescription(data.description);
      setCodeSnippet(data.codeSnippet);
      setImageBase64(data.imageBase64);
      setItems(data.items);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
        className="mt-2"
          variant={isResponding && !isAdm ? "add" : "outline"}
          type="submit"
        >
          {isResponding && !isAdm ? "Responder" : "Visualizar"}
          {isResponding && !isAdm ? (
            <CheckCheck className="ml-2 h-5 w-5" />
          ) : (
            <EyeIcon className="ml-2 h-5 w-5" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12 max-w-[800px] max-h-[600px] overflow-y-auto p-6 rounded-md sm:mx-auto dialog-content">
        <div className="mb-4">
          <h3 className="mt-2 mb-5 text-sm text-muted-foreground  font-bold text-gray-800">
            {number}. {title}
          </h3>

          {description && (
            <p className="mt-2 mb-5 text-sm text-muted-foreground text-emerald-500">
              {description}
            </p>
          )}

          {imageBase64 && imageBase64.length > 10 && <img src={imageBase64} alt="ilustração" />}

          {codeSnippet && (
            <pre className="mt-2 mb-5 text-sm text-muted-foreground text-emerald-500 bg-gray-100 p-4 rounded-lg">
              <code>{codeSnippet}</code>
            </pre>
          )}

          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              {isResponding && (
                <Checkbox
                  id={`item-${index}`}
                  name={`item-${index}`}
                  className="mb-4 h-5 w-5 border-gray-300 rounded"
                  onClick={() => setSelectedItemId(item.id)}
                />
              )}
              <span className="mb-4 text-sm text-muted-foreground text-emerald-500">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <DialogFooter>
          {isResponding && !isAdm && (
            <Button
              variant="add"
              type="submit"
              onClick={(e) => {
                e.preventDefault(); // Evita que o formulário seja enviado
                handleAnswer(); // Chama o método handleClick ao clicar
              }}
            >
              Responder
            </Button>
          )}
          <DialogClose>
            <Button variant="destructiveOutline" type="button">
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
