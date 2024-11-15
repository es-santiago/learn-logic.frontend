"use client";

import { questionnaire } from "@/utils/interfaces/QuestionnaireItems";
import Layout from "../layout";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { putWithAuth } from "@/utils/api/httpService";
import { CardTitle } from "@/components/ui/card";
import { customErrors } from "@/utils/customErrors";
import { useRouter } from "next/router";

export default function Questionnaire() {
  const [points, setPoints] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const router = useRouter();

  const handleOptionChange = (
    questionIndex: number,
    option: string,
    isChecked: boolean
  ) => {
    const isCorrectAnswer = option === questionnaire[questionIndex].answer;
    const currentSelected = selectedAnswers[questionIndex];

    if (isChecked) {
      // If a correct answer is selected, award points if it wasn't already selected
      if (isCorrectAnswer && currentSelected !== option) {
        setPoints(
          (prevPoints) => prevPoints + questionnaire[questionIndex].points
        );
      }
      // If an incorrect answer is selected after a correct one, reset points for this question
      else if (
        !isCorrectAnswer &&
        currentSelected === questionnaire[questionIndex].answer
      ) {
        setPoints(
          (prevPoints) => prevPoints - questionnaire[questionIndex].points
        );
      }

      // Update selected answer for this question
      setSelectedAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionIndex]: option,
      }));
    } else {
      // Deselecting the correct answer should subtract points
      if (isCorrectAnswer && currentSelected === option) {
        setPoints(
          (prevPoints) => prevPoints - questionnaire[questionIndex].points
        );
      }
      // Clear the selected answer if the checkbox is unchecked
      setSelectedAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionIndex]: "",
      }));
    }
  };

  const handlePoints = async () => {
    const obj = {
      punctuation: points,
    };

    const res = await putWithAuth({
      url: "https://localhost:5001/users/register-initial-point",
      data: obj,
      successMessage: "Questionário realizado com sucesso!",
      errorMessage: "Falha ao realizado Questionário!",
    });

    if (!res) {
      const message = await customErrors(
        "Falha ao finalizar Questionário!",
        "Falha ao finalizar Questionário!"
      );
      throw new Error(message);
    }

    router.push("/home");
  };

  return (
    <Layout>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-1 xl:grid-cols-1">
        <CardTitle className="mt-2 mb-5 text-muted-foreground font-bold text-gray-800">
          Reponsa o questionario inicial para que possamos saber como esta seu
          conhecimento em programação.
        </CardTitle>
        {questionnaire.map((item, index) => (
          <div key={`question-${index}`}>
            <h3 className="mt-2 mb-5 text-sm text-muted-foreground font-bold text-gray-800">
              {item.question}
            </h3>
            {item.options.map((option, optionIndex) => (
              <label
                key={`option-${index}-${optionIndex}`}
                className="flex items-center mb-4"
              >
                <Checkbox
                  id={`option-${index}-${optionIndex}`}
                  name={`option-${index}`}
                  className="h-5 w-5 border-gray-300 rounded mr-2"
                  checked={selectedAnswers[index] === option}
                  onCheckedChange={(isChecked) =>
                    handleOptionChange(index, option, Boolean(isChecked))
                  }
                />
                <span className="text-sm text-muted-foreground text-emerald-500">
                  {option}
                </span>
              </label>
            ))}
          </div>
        ))}

        <DialogFooter>
          <Button className="mb-4" variant="add" onClick={handlePoints}>
            Salvar
          </Button>
        </DialogFooter>
      </main>
    </Layout>
  );
}
