"use client";

import { ListFilter, PlusCircle, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import Layout from "../layout";
import CardAnswer from "@/components/questions/answer/card-answer";
import { getWithAuth } from "@/utils/api/httpService";
import {
  getLevelLabel,
  getLevelLabelById,
  QuestionLevelEnum,
} from "@/utils/enum/QuestionLevel.enum.";
import { getUserExperience, getUserType } from "@/utils/tokenService";
import { UserTypeEnum } from "@/utils/enum/UserType.enum";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ModalQuestion } from "@/components/questions/form/modal-question";
import AnsweredQuestionCard from "@/components/questions/answer/answered-question-card";

export default function Questions() {
  const [questionList, setQuestionList] = useState<Question[]>([]);
  const [filter, setFilter] = useState("TODOS");
  const [filteredQuestions, setFilteredQuestions] =
    useState<Question[]>(questionList);
  useState<Question[]>(questionList);
  const [activeTab, setActiveTab] = useState(1);
  const [isAdm, setIsAdm] = useState(true);

  const [AnswerUser, setAnswerUser] = useState<QuestionAnswer[]>([]);

  useEffect(() => {
    const type = getUserType();
    if (type) {
      const adm = UserTypeEnum.ADM.id;
      setIsAdm(Number(type) === adm);
    }

    const experience = getUserExperience();
    const exp = Number(experience);
    const value = getLevelLabelById(exp);
    setFilter(value);
  }, []);

  const fetchData = async (tab: number) => {
    let url = "";
    if (tab === 1) {
      fetchQuestions();
    } else if (tab === 2) {
      fetchAnswer();
      fetchAnswerUser();
    }
  };

  const cleanFilter = () => {
    setFilter("TODOS");
  };

  // Efeito para fazer a requisição quando a aba ativa mudar
  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    const filtered =
      filter === "TODOS"
        ? questionList
        : questionList.filter(
            (question) => getLevelLabel(question.level) === filter
          );
    setFilteredQuestions(filtered);

    debugger;
  }, [filter, questionList]);

  const fetchQuestions = async () => {
    const res = await getWithAuth({
      url: "https://localhost:5001/questions/list?$select=id,number,title,tags,points,status,level,activated,imageName,creationDate&$orderby=number desc",
      errorMessage: "Falha ao listar questões!",
    });

    if (res.success) {
      setQuestionList(res.data);
    }
  };

  const fetchAnswer = async () => {
    const res = await getWithAuth({
      url: "https://localhost:5001/questionanswer/questions-resolved?$select=id,number,title,tags,points,status,level,activated,imageName,creationDate&$orderby=number desc",
      errorMessage: "Falha ao listar questões!",
    });
    if (res.success) {
      setQuestionList(res.data);
    }
  };

  const fetchAnswerUser = async () => {
    const res = await getWithAuth({
      url: "https://localhost:5001/questionanswer/list/by-user?$select=id,questionId,selectedItemId,comment,correct,creationDate&$orderby=creationDate desc",
      errorMessage: "Falha ao listar questões!",
    });
    if (res.success) {
      setAnswerUser(res.data);
    }
  };

  return (
    <Layout>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-1 xl:grid-cols-1">
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
                {[
                  getLevelLabel(QuestionLevelEnum.ADVANCED.value),
                  getLevelLabel(QuestionLevelEnum.INTERMEDIATE.value),
                  getLevelLabel(QuestionLevelEnum.BEGINNER.value),
                  getLevelLabel(QuestionLevelEnum.EXPERT.value),
                ].map((option) => (
                  <DropdownMenuCheckboxItem
                    key={option}
                    checked={filter === option}
                    onSelect={() => setFilter(option)}
                  >
                    {option}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {!isAdm && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="add" className="h-7 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Sugerir Questão
                    </span>
                  </Button>
                </DialogTrigger>
                <ModalQuestion />
              </Dialog>
            )}

            <Button
              size="sm"
              variant="destructiveOutline"
              className="h-7 gap-1"
              onClick={cleanFilter}
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Limpar Filtro
              </span>
            </Button>
          </div>
        </div>

        {!isAdm && (
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
              Questões Pendentes
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
              Questões Respondidas
            </button>
          </div>
        )}
        {!isAdm && (
          <>
            {activeTab === 1 && <CardAnswer questions={filteredQuestions} />}
            {activeTab === 2 && (
              <AnsweredQuestionCard
                questions={filteredQuestions}
                answers={AnswerUser}
              />
            )}
          </>
        )}

        {isAdm && <CardAnswer questions={filteredQuestions} />}
      </main>
    </Layout>
  );
}
