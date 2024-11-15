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
import { useState } from "react";
import fetchWithAuth from "@/utils/api/fetchWithAuth";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { customErrors } from "@/utils/customErrors";
import { errorToast, successToast } from "@/utils/toast";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  activated: boolean;
  creationDate: string;
}

interface ModalUserProps {
  user?: User;
}

export const ModalChangePassword: React.FC<ModalUserProps> = ({ user }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleUser = async (event: React.FormEvent) => {
    event.preventDefault();

    if (newPassword !== confirmNewPassword) {
      errorToast("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetchWithAuth(
        "https://localhost:5001/users/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword,
            userId: user?.id,
          }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        const message = await customErrors(
          errorResponse,
          "Falha ao registrar usuário!"
        );
        throw new Error(message);
      }

      successToast("Senha atualizada com sucesso!");
      setTimeout(() => {
        router.reload();
      }, 2500);
    } catch (error) {
      errorToast(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    }
  };

  return (
    <DialogContent className="w-11/12 rounded-md sm:mx-auto">
      <DialogHeader>
        <DialogTitle>
          {`Alterar Senha do Usuário ${user?.firstName} ${user?.lastName}`}
        </DialogTitle>
      </DialogHeader>
      <hr />
      <div className="flex flex-col items-center justify-center bg-background p-6">
        <div className="w-full max-w-sm space-y-6">
          <form className="space-y-4" onSubmit={handleUser}>
            <div className="space-y-2">
              {user?.id && (
                <>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium leading-none"
                    >
                      Senha ADM
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4 text-gray-500" />
                        ) : (
                          <EyeIcon className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium leading-none"
                    >
                      Nova Senha
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4 text-gray-500" />
                        ) : (
                          <EyeIcon className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium leading-none"
                    >
                      Confirme Nova Senha
                    </label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4 text-gray-500" />
                        ) : (
                          <EyeIcon className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <DialogClose>
                <Button variant="secondary" type="button">
                  Cancelar
                </Button>
              </DialogClose>

              <Button variant="add" type="submit">
                Confirmar
              </Button>
            </div>
          </form>
        </div>
      </div>
      <DialogFooter />
    </DialogContent>
  );
};
