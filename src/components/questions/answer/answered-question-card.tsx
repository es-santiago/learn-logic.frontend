import { Badge } from "@/components/ui/badge";
import { DialogFooter } from "@/components/ui/dialog";
import { getLevelLabel } from "@/utils/enum/QuestionLevel.enum.";
import React, { useEffect, useState } from "react";
import { AnswerModal } from "./answer-modal";
import { getUserType } from "@/utils/tokenService";
import { UserTypeEnum } from "@/utils/enum/UserType.enum";
import { getWithAuth } from "@/utils/api/httpService";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import { Comment } from "../modals/comment";

type CardProps = {
  question: Question;
  answer: QuestionAnswer | undefined;
};

type CardCardAnswerProps = {
  questions: Question[];
  answers: QuestionAnswer[];
};

const Card: React.FC<CardProps> = ({ question, answer }) => {
  const [questionI, setQuestionI] = useState<Question>({
    number: "",
    title: "",
    description: "",
    level: "",
    status: "",
    tags: [],
    codeSnippet: "",
    solutionIdentifier: "",
    points: 0,
    userId: "",
    imageBase64: "",
    items: [],
    imageName: "",
    id: "",
    creationDate: "",
    changeDate: "",
    activated: false,
  });
  useEffect(() => {
    if (question.id) {
      getQuestion();
    }
  }, [question.id]);

  const getQuestion = async () => {
    const res = await getWithAuth({
      url: `https://localhost:5001/questions/search-with-answer/${question.id}`,
      errorMessage: "Falha ao buscar questão!",
    });

    if (res.success) {
      const data = res.data as Question;
      setQuestionI(data);
    }
  };
  return (
    <div
      className={`bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between h-full border-2 ${
        answer?.correct ? "border-green-500" : "border-red-500"
      }`}
    >
      <div className="mb-4">
        <h3 className="mt-2 mb-5 text-sm text-muted-foreground  font-bold text-gray-800">
          {questionI.title}
        </h3>
        <p className="text-sm text-gray-500 mt-4">
          <Badge variant="ATIVO">Pontos: {questionI.points}</Badge>
        </p>
        <p className="text-sm text-gray-500 mt-4">
          <Badge variant="TESTE_COLOR_2">
            Nível: {getLevelLabel(questionI.level)}
          </Badge>
        </p>
        <p className="text-sm text-gray-500 mt-4">Item marcado:</p>
        <span className="text-sm text-gray-500 mt-4">
          {questionI.items.find((x) => x.id === answer?.selectedItemId)?.label}
        </span>

        {!answer?.correct && (
          <>
            <p className="text-sm text-gray-500 mt-4">Item correto:</p>
            <span className="text-sm text-gray-500 mt-4">
              {
                questionI.items.find(
                  (x) => x.id === questionI.solutionIdentifier
                )?.label
              }
            </span>
          </>
        )}
      </div>
      <DialogFooter>
        <Comment questionId={questionI.id} commentProp={answer?.comment} />
        <AnswerModal
          isResponding={false}
          questionId={question.id}
        ></AnswerModal>
      </DialogFooter>
    </div>
  );
};

const AnsweredQuestionCard: React.FC<CardCardAnswerProps> = ({
  questions,
  answers,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {questions.map((question: Question, index: number) => (
        <Card
          key={index}
          question={question}
          answer={answers.find(
            (x: QuestionAnswer) => x.questionId === question.id
          )}
        />
      ))}
    </div>
  );
};

export default AnsweredQuestionCard;
