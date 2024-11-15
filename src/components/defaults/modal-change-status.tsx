import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import fetchWithAuth from "@/utils/api/fetchWithAuth";
import { customErrors } from "@/utils/customErrors";
import router from "next/router";
import { toast } from "react-toastify";

interface ModalChangeStatusProps {
  path: string;
  id: string;
  status: boolean;
  title: string;
  message: string;
}

export const ModalChangeStatus: React.FC<ModalChangeStatusProps> = ({
  path,
  id,
  status,
  title,
  message,
}) => {
  const handleChangeStatus = async () => {
    try {
      const response = await fetchWithAuth(
        `https://localhost:5001/${path}/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        const message = await customErrors(
          errorResponse,
          "Falha ao alterar o status do registro!"
        );
        throw new Error(message);
      }
      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleErrorClick = () => {
    toast.error("deu erro aqui", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSuccessClick = () => {
    toast.success("deu sucesso aqui", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <DialogContent className="w-11/12 rounded-md sm:mx-auto">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription />
      </DialogHeader>
      <p>{message}</p>
      <DialogFooter>
        <button onClick={handleErrorClick}>Mostrar Erro</button>
        <button onClick={handleSuccessClick}>Mostrar Sucesso</button>
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
