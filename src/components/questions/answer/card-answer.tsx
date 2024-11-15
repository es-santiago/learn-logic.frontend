import { Badge } from "@/components/ui/badge";
import { DialogFooter } from "@/components/ui/dialog";
import { getLevelLabel } from "@/utils/enum/QuestionLevel.enum.";
import React, { useEffect, useState } from "react";
import { AnswerModal } from "./answer-modal";
import { getUserType } from "@/utils/tokenService";
import { UserTypeEnum } from "@/utils/enum/UserType.enum";

type CardProps = {
  title: string;
  points: number;
  level: string;
  id: string;
};

type CardCardAnswerProps = {
  questions: Question[];
};

const Card: React.FC<CardProps> = ({ title, points, level, id }) => {
  const [isAdm, setIsAdm] = useState(true);

  useEffect(() => {
    const type = getUserType();
    if (type) {
      const adm = UserTypeEnum.ADM.id;
      setIsAdm(Number(type) === adm);
    }
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between h-full">
      <div className="mb-4">
        <h3 className="mt-2 mb-5 text-sm text-muted-foreground  font-bold text-gray-800">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mt-4">
          <Badge variant="ATIVO">Pontos: {points}</Badge>
        </p>
        <p className="text-sm text-gray-500 mt-4">
          <Badge variant="TESTE_COLOR_2">Nível: {getLevelLabel(level)}</Badge>
        </p>
      </div>
      <DialogFooter>
        <AnswerModal isResponding={false} questionId={id}></AnswerModal>
        {!isAdm && (
          <AnswerModal isResponding={true} questionId={id}></AnswerModal>
        )}
      </DialogFooter>
    </div>
  );
};

const CardAnswer: React.FC<CardCardAnswerProps> = ({ questions }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {questions.map((question: Question, index: number) => (
        <Card
          key={index}
          title={question.title}
          points={question.points}
          level={question.level}
          id={question.id}
        />
      ))}
    </div>
  );
};

export default CardAnswer;
