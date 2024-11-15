import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/text-area";
import { TriangleAlert } from "lucide-react";
import { errorToast } from "@/utils/toast";
import { putWithAuth } from "@/utils/api/httpService";
import { Label } from "@/components/ui/label";

interface CommentProps {
  questionId: string;
  commentProp: string | undefined;
}

export function Comment({ questionId, commentProp }: CommentProps) {
  const [comment, setComment] = useState(""); // Estado para o comentário

  const handleSaveComment = async () => {
    if (!comment) {
      errorToast("Nenhum comentário foi inserido.");
      return;
    }
    const obj = {
      questionId: questionId,
      comment: comment,
    };
    const res = await putWithAuth({
      url: `https://localhost:5001/questionanswer/comment`,
      data: obj,
      successMessage: "Comentário registrada com sucesso!",
      errorMessage: "Falha ao registrar comentário!",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-2" variant="destructiveOutline">
          <Label className="m-2">
          Reportar
          </Label>
          <TriangleAlert className="text-destructive h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogDescription>
            Adicione um comentário positivo ou negativo. Estamos sempre atentos
            ao feedback dos usuários para que, se necessário, possamos reavaliar
            a questão!
          </DialogDescription>
        </DialogHeader>

        {commentProp && (
          <span className="mt-2 mb-5 text-sm text-muted-foreground text-emerald-500 bg-gray-100 p-4 rounded-lg">
            {commentProp}
          </span>
        )}

        {!commentProp && (
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)} // Atualiza o estado ao digitar
            placeholder="Digite seu comentário"
          />
        )}

        <DialogFooter>
          <Button type="button" onClick={handleSaveComment}>
            Salvar Comentário
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
