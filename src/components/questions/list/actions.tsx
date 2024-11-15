import { CheckCircle, MoreHorizontal, Pen, Trash, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ModalChangeStatus } from "@/components/defaults/modal-change-status";
import { ModalQuestion } from "@/components/questions/form/modal-question";
import { QuestionStatusEnum } from "@/utils/enum/QuestionStatus.enum";
import { ModalUpdateStatus } from "../modals/modal-update-status";

interface DropdownMenuActionsProps {
  question: Question;
}

const QuestionActions: React.FC<DropdownMenuActionsProps> = ({ question }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>

        {/* Ação de editar */}
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem
              className="cursor-pointer gap-1"
              onSelect={(e) => e.preventDefault()}
            >
              <Pen className="h-3.5 w-3.5" />
              Editar
            </DropdownMenuItem>
          </DialogTrigger>
          <ModalQuestion question={question} />
        </Dialog>

        {/* Ações de Aprovar ou Cancelar questão*/}
        {question.status === QuestionStatusEnum.PENDING.value && (
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem
                className="cursor-pointer gap-1"
                onSelect={(e) => e.preventDefault()}
              >
                <CheckCircle className="h-3.5 w-3.5" />
                Aprovar
              </DropdownMenuItem>
            </DialogTrigger>
            <ModalUpdateStatus
              question={question}
              status={QuestionStatusEnum.APPROVED.value}
            />
          </Dialog>
        )}

        {question.status === QuestionStatusEnum.PENDING.value && (
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem
                className="cursor-pointer gap-1"
                onSelect={(e) => e.preventDefault()}
              >
                <XCircle className="h-3.5 w-3.5" />
                Recusar
              </DropdownMenuItem>
            </DialogTrigger>
            <ModalUpdateStatus
              question={question}
              status={QuestionStatusEnum.REFUSED.value}
            />
          </Dialog>
        )}

        {question.status === QuestionStatusEnum.APPROVED.value && (
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem
                className="cursor-pointer gap-1"
                onSelect={(e) => e.preventDefault()}
              >
                <XCircle className="h-3.5 w-3.5" />
                Cancelar
              </DropdownMenuItem>
            </DialogTrigger>
            <ModalUpdateStatus
              question={question}
              status={QuestionStatusEnum.CANCELLED.value}
            />
          </Dialog>
        )}

        {question.status !== QuestionStatusEnum.APPROVED.value && question.status !== QuestionStatusEnum.PENDING.value && (
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem
                className="cursor-pointer gap-1"
                onSelect={(e) => e.preventDefault()}
              >
                <XCircle className="h-3.5 w-3.5" />
                Reaprovar
              </DropdownMenuItem>
            </DialogTrigger>
            <ModalUpdateStatus
              question={question}
              status={QuestionStatusEnum.APPROVED.value}
            />
          </Dialog>
        )}

        {/* Ação de desativar/ativar */}
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem
              className="cursor-pointer gap-1"
              onSelect={(e) => e.preventDefault()}
            >
              <Trash className="h-3.5 w-3.5" />
              {question.activated ? "Desativar" : "Ativar"}
            </DropdownMenuItem>
          </DialogTrigger>
          <ModalChangeStatus
            path={"questions/change-status"}
            id={question.id}
            status={question.activated}
            title={`Deseja realmente ${
              question.activated ? "desativar" : "ativar"
            } a questão ${question.number}?`}
            message={`A questão ${question.number} - ${
              question.title
            } irá ser ${
              question.activated ? "desativado" : "ativado"
            }, essa alteração pode ser revertida.`}
          />
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QuestionActions;
