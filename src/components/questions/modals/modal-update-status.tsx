import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getStatusLabel } from "@/utils/enum/QuestionStatus.enum";
import { putWithAuth } from "@/utils/api/httpService";

interface ModalUpdateStatusProps {
  question: Question;
  status: string;
}

export const ModalUpdateStatus: React.FC<ModalUpdateStatusProps> = ({
  question,
  status,
}) => {
  const handleChangeStatus = async () => {
    const obj = {
      id: question.id,
      status: status,
    };

    await putWithAuth({
      url: "https://localhost:5001/questions/update-status",
      data: obj,
      successMessage: "Status atualizado com sucesso!",
      errorMessage: "Falha ao atualizar status usuário!",
    });
  };

  return (
    <DialogContent className="w-11/12 rounded-md sm:mx-auto">
      <DialogHeader>
        <DialogTitle>Atualizar Status da Questão {question.number}</DialogTitle>
        <DialogDescription />
      </DialogHeader>
      <p>{`Deseja realmente alterar o status da questão ${
        question.number
      } de ${getStatusLabel(question.status)} para o status ${getStatusLabel(
        status
      )} ?`}</p>
      <DialogFooter>
        <DialogClose>
          <Button variant="secondary" type="button">
            Cancelar
          </Button>
        </DialogClose>
        <Button variant="add" onClick={handleChangeStatus}>
          Confirmar
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
