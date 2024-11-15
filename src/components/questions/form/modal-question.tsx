"use client";

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import fetchWithAuth from "@/utils/api/fetchWithAuth";
import { EyeIcon, EyeOffIcon, Trash, CircleCheck, CircleX } from "lucide-react";
import { customErrors } from "@/utils/customErrors";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { errorToast, successToast } from "@/utils/toast";
import { QuestionLevelEnum } from "@/utils/enum/QuestionLevel.enum.";
import { QuestionStatusEnum } from "@/utils/enum/QuestionStatus.enum";
import { Textarea } from "../../ui/text-area";
import { Toggle } from "../../ui/toggle";
import UploadButton from "./upload-button";
import MultiSelect from "./multi-select";
import { tags } from "@/utils/tags";
import {
  getWithAuth,
  postWithAuth,
  putWithAuth,
} from "@/utils/api/httpService";
import { guidEmpty } from "@/utils/guis";
import { UserTypeEnum } from "@/utils/enum/UserType.enum";
import { getUserType } from "@/utils/tokenService";

interface ModalUserProps {
  question?: Question;
}

interface Itens {
  id: string;
  label: string;
  isCorrect: boolean;
}

export const ModalQuestion: React.FC<ModalUserProps> = ({ question }) => {
  const router = useRouter();

  useEffect(() => {
    if (question?.id) {
      getQuestion();
    }
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState(QuestionLevelEnum.ADVANCED.value);
  const [codeSnippet, setCodeSnippet] = useState("");
  const [points, setPoints] = useState(0);
  const [status, setStatus] = useState(QuestionStatusEnum.PENDING.value);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const [items, setItems] = useState<Itens[]>([]);
  const [activeTab, setActiveTab] = useState(1); // Controla a navegação pelas etapas
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // Controla a navegação pelas etapas
  const tabs = [
    { label: "Questão", content: <div>Conteúdo da Questão</div> },
    { label: "Itens", content: <div>Conteúdo dos Itens</div> },
  ];

  const [isAdm, setIsAdm] = useState(true);

  useEffect(() => {
    const type = getUserType();
    if (type) {
      const adm = UserTypeEnum.ADM.id;
      setIsAdm(Number(type) === adm);
    }
  }, []);

  const handleFileChange = (obj: any) => {
    setImageBase64(obj.base64); // Atualiza o estado com o base64 da imagem
    setFileName(obj.fileName); // Atualiza o estado com o base64 da imagem
  };

  const getQuestion = async () => {
    const res = await getWithAuth({
      url: `https://localhost:5001/questions/get/${question?.id}`,
      errorMessage: "Falha ao listar questões!",
    });

    if (res.success) {
      const data = res.data as Question;
      setTitle(data.title);
      setDescription(data.description);
      setLevel(data.level);
      setCodeSnippet(data.codeSnippet);
      setPoints(data.points);
      setStatus(data.status);
      setImageBase64(data.imageBase64);
      setFileName(data.imageName);

      setItems((prevItems) => [
        ...prevItems,
        ...data.items.map((item) => ({
          id: item.id,
          label: item.label,
          isCorrect: item.isCorrect,
        })),
      ]);
      console.log(items);
    }
  };

  // Funções de manipulação de itens
  const addItem = () => {
    setItems([...items, { id: guidEmpty, label: "", isCorrect: false }]);
  };

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleItemTextChange = (index: number, newText: string) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, label: newText } : item
    );
    setItems(updatedItems);
  };

  const toggleCorrect = (index: number) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, isCorrect: !item.isCorrect } : item
    );
    setItems(updatedItems);
  };

  const handleQuestion = async (event: React.FormEvent) => {
    event.preventDefault();

    const obj = {
      title: title,
      description: description,
      level: level,
      codeSnippet: codeSnippet,
      points: points,
      status: status,
      items: items,
      tags: selectedItems,
      imageBase64: imageBase64,
      imageName: fileName,
      id: question?.id,
    };

    const wasSuccessful = obj.id
      ? await putWithAuth({
          url: "https://localhost:5001/questions",
          data: obj,
          successMessage: "Questão cadastrada com sucesso!",
          errorMessage: "Falha ao registrar usuário!",
        })
      : await postWithAuth({
          url: "https://localhost:5001/questions",
          data: obj,
          successMessage: "Questão cadastrada com sucesso!",
          errorMessage: "Falha ao registrar usuário!",
        });

    if (wasSuccessful) {
      setTitle("");
      setDescription("");
      setLevel(QuestionLevelEnum.ADVANCED.value);
      setCodeSnippet("");
      setPoints(0);
      setStatus(QuestionStatusEnum.PENDING.value);
      setImageBase64(null);
      setItems([]);
      setActiveTab(1);
      setSelectedItems([]);
    }
  };

  return (
    <DialogContent className="w-11/12 max-w-[800px] max-h-[600px] overflow-y-auto p-6 rounded-md sm:mx-auto dialog-content">
      <div className="tabs flex space-x-4 border-b border-gray-300">
        <button
          className={`tab cursor-pointer py-2 px-4 text-lg font-semibold ${
            activeTab === 1
              ? "border-b-2" + " border-[#0A2647] text-[#0A2647]" // Usando a cor diretamente aqui
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab(1)}
          type="button"
        >
          Questão
        </button>
        <button
          className={`tab cursor-pointer py-2 px-4 text-lg font-semibold ${
            activeTab === 2
              ? "border-b-2" + " border-[#0A2647] text-[#0A2647]" // Usando a cor diretamente aqui
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab(2)}
          type="button"
        >
          Items
        </button>
      </div>

      <div className="tab-content">
        <form className="space-y-4" onSubmit={handleQuestion}>
          {activeTab === 1 && (
            <div>
              <DialogHeader className="mb-4">
                <DialogTitle>
                  {question?.id ? "Atualizar Questão" : "Adicionar Questão"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="text-sm mb-2 font-medium leading-none"
                  >
                    Título
                  </label>
                  <Textarea
                    id="title"
                    placeholder="O que é uma variável em programação?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                {!isAdm && (
                  <div>
                    <label
                      htmlFor="level"
                      className="text-sm mb-2 font-medium leading-none"
                    >
                      Nível
                    </label>
                    <Select value={level} onValueChange={setLevel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Nível</SelectLabel>
                          <SelectItem value={QuestionLevelEnum.ADVANCED.value}>
                            {QuestionLevelEnum.ADVANCED.label}
                          </SelectItem>
                          <SelectItem value={QuestionLevelEnum.BEGINNER.value}>
                            {QuestionLevelEnum.BEGINNER.label}
                          </SelectItem>
                          <SelectItem value={QuestionLevelEnum.EXPERT.value}>
                            {QuestionLevelEnum.EXPERT.label}
                          </SelectItem>
                          <SelectItem
                            value={QuestionLevelEnum.INTERMEDIATE.value}
                          >
                            {QuestionLevelEnum.INTERMEDIATE.label}
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {isAdm && (
                  <div className="flex mb-4">
                    <div className="mr-4 w-1/2">
                      <label
                        htmlFor="level"
                        className="text-sm mb-2 font-medium leading-none"
                      >
                        Nível
                      </label>
                      <Select value={level} onValueChange={setLevel}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Nível</SelectLabel>
                            <SelectItem
                              value={QuestionLevelEnum.ADVANCED.value}
                            >
                              {QuestionLevelEnum.ADVANCED.label}
                            </SelectItem>
                            <SelectItem
                              value={QuestionLevelEnum.BEGINNER.value}
                            >
                              {QuestionLevelEnum.BEGINNER.label}
                            </SelectItem>
                            <SelectItem value={QuestionLevelEnum.EXPERT.value}>
                              {QuestionLevelEnum.EXPERT.label}
                            </SelectItem>
                            <SelectItem
                              value={QuestionLevelEnum.INTERMEDIATE.value}
                            >
                              {QuestionLevelEnum.INTERMEDIATE.label}
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="w-1/2">
                      <label
                        htmlFor="status"
                        className="text-sm mb-2 font-medium leading-none"
                      >
                        Status
                      </label>
                      <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem
                              value={QuestionStatusEnum.PENDING.value}
                            >
                              {QuestionStatusEnum.PENDING.label}
                            </SelectItem>
                            <SelectItem
                              value={QuestionStatusEnum.APPROVED.value}
                            >
                              {QuestionStatusEnum.APPROVED.label}
                            </SelectItem>
                            <SelectItem
                              value={QuestionStatusEnum.REFUSED.value}
                            >
                              {QuestionStatusEnum.REFUSED.label}
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <MultiSelect
                  placeholder="Tags"
                  options={tags}
                  selectedOptions={selectedItems}
                  setSelectedOptions={setSelectedItems}
                />

                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="text-sm mb-2 font-medium leading-none"
                  >
                    Descrição
                  </label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="codeSnippet"
                    className="text-sm mb-2 font-medium leading-none"
                  >
                    Código
                  </label>
                  <Textarea
                    id="codeSnippet"
                    value={codeSnippet}
                    onChange={(e) => setCodeSnippet(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="points"
                    className="text-sm mb-2 font-medium leading-none"
                  >
                    Pontos
                  </label>
                  <Input
                    id="points"
                    type="number"
                    value={points}
                    onChange={(e) => setPoints(Number(e.target.value))}
                    required
                  />
                </div>

                <div className="mb-4">
                  <span className="text-sm text-muted-foreground">
                    Adicione uma imagem se necessário
                  </span>
                  <div className="grid grid-cols-1 items-center gap-4 justify-end">
                    <UploadButton
                      onFileChange={handleFileChange}
                      imageName={fileName}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div>
              <DialogHeader className="mb-4">
                <DialogTitle>
                  {question?.id ? "Atualizar Iens" : "Adicionar Itens"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                {/* <div className="space-y-2">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Textarea
                        value={item.text}
                        onChange={(e) =>
                          handleItemTextChange(index, e.target.value)
                        }
                        placeholder="Digite o item"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => toggleCorrect(index)}
                      >
                        {item.isCorrect ? (<CircleCheck /> <Toggle/>) : <Toggle/>}
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="text-red-600"
                      >
                        Remover <Trash className="h-5 w-5"/>
                      </button>
                    </div>
                  ))}
                </div> */}
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <Textarea
                        value={item.label}
                        onChange={(e) =>
                          handleItemTextChange(index, e.target.value)
                        }
                        placeholder="Digite o item"
                        required
                        className="border border-gray-300 p-2 rounded-md w-full"
                      />
                      <button
                        type="button"
                        onClick={() => toggleCorrect(index)}
                        className="flex items-center space-x-1 p-2 rounded-full border border-gray-300"
                      >
                        {item.isCorrect ? (
                          <>
                            <CircleCheck className="h-5 w-5 text-green-500" />
                            <Toggle className="h-5 w-5 text-blue-500" />
                          </>
                        ) : (
                          <>
                            <Toggle className="h-5 w-5 text-green-500" />
                            <CircleX className="h-5 w-5 text-red-600" />
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="text-red-600 flex items-center space-x-1 p-2 rounded-full text-sm text-muted-foreground"
                      >
                        Remover <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  onClick={addItem}
                  variant="addOutline"
                  className="mt-4 mb-4"
                >
                  Adicionar
                </Button>
              </div>
              <DialogFooter>
                <DialogClose>
                  <Button variant="secondary" type="button">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button variant="add" type="submit">
                  Salvar
                </Button>
              </DialogFooter>
            </div>
          )}
        </form>
      </div>
    </DialogContent>
  );
};
