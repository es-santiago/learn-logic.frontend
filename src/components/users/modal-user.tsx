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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
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

export const ModalUser: React.FC<ModalUserProps> = ({ user }) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [userEmail, setUserEmail] = useState(user?.email ?? "");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [userFirstName, setUserFirstName] = useState(user?.firstName ?? "");
  const [userLastName, setUserLastName] = useState(user?.lastName ?? "");
  const [userType, setUserType] = useState(user?.type ?? "Student");

  const handleUser = async (event: React.FormEvent) => {
    event.preventDefault();

    if (userPassword !== userConfirmPassword) {
      errorToast("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetchWithAuth(
        user && user.id
          ? "https://localhost:5001/auth/update"
          : "https://localhost:5001/auth/register",
        {
          method: user && user.id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
            password: userPassword,
            firstName: userFirstName,
            lastName: userLastName,
            type: userType,
            id: user?.id,
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

      // router.reload();
      router.push(router.asPath);
      setTimeout(() => {
        successToast(
          user?.id
            ? "Cadastro atualizado com sucesso!"
            : "Cadastro realizado com sucesso!"
        );
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
          {user?.id ? "Atualizar Usuário" : "Adicionar Usuário"}
        </DialogTitle>
      </DialogHeader>
      <hr />
      <div className="flex flex-col items-center justify-center bg-background p-6">
        <div className="w-full max-w-sm space-y-6">
          <form className="space-y-4" onSubmit={handleUser}>
            <div className="space-y-2">
              <div className="mb-4">
                <label
                  htmlFor="firstName"
                  className="text-sm mb-2 font-medium leading-none"
                >
                  Nome
                </label>
                <Input
                  id="firstName"
                  placeholder="João"
                  type="text"
                  value={userFirstName}
                  onChange={(e) => setUserFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="lastName"
                  className="text-sm mb-2 font-medium leading-none"
                >
                  Sobrenome
                </label>
                <Input
                  id="lastName"
                  placeholder="Silva"
                  type="text"
                  value={userLastName}
                  onChange={(e) => setUserLastName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="text-sm mb-2 font-medium leading-none"
                >
                  Tipo
                </label>
                <Select value={userType} onValueChange={setUserType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tipo</SelectLabel>
                      <SelectItem value="Administrator">
                        Administrador
                      </SelectItem>
                      <SelectItem value="Student">Estudante</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="text-sm mb-2 font-medium leading-none"
                >
                  Email
                </label>
                <Input
                  id="email"
                  placeholder="joaosilva@gmail.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
              </div>

              {!user?.id && (
                <>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium leading-none"
                    >
                      Senha
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
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
                      Confirme a Senha
                    </label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        value={userConfirmPassword}
                        onChange={(e) => setUserConfirmPassword(e.target.value)}
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
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </div>
      <DialogFooter />
    </DialogContent>
  );
};
