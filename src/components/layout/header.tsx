"use client";

import Link from "next/link";
import {
  BookOpenCheck,
  BookPlus,
  Home,
  LogOut,
  Package2,
  PanelLeft,
  Settings,
  Trophy,
  User2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import "@/app/globals.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import fetchWithAuth from "@/utils/api/fetchWithAuth";
import { customErrors } from "@/utils/customErrors";
import { avatar } from "@/utils/avatar";
import { errorToast, successToast } from "@/utils/toast";
import { UserTypeEnum } from "@/utils/enum/UserType.enum";
import { getUserType } from "@/utils/tokenService";
import { getMenu } from "@/utils/menu";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  activated: boolean;
  creationDate: string;
  punctuation: number;
}

export default function HeaderPage() {
  const [initials, setInitials] = useState("");
  const [punctuation, setPunctuation] = useState("");
  const [userLogged, setUserLogged] = useState<User | undefined>();
  const [userEmail, setUserEmail] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [isStudent, setIsStudent] = useState(true);

  useEffect(() => {
    const type = getUserType();
    debugger;
    if (type) {
      const adm = UserTypeEnum.ADM.id;
      const res = Number(type) !== adm;
      setIsStudent(res);
    }
  }, []);

  const router = useRouter();

  useEffect(() => {
    handleGetLogged();
  }, []);

  const handleUser = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetchWithAuth(
        "https://localhost:5001/auth/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userEmail,
            firstName: userFirstName,
            lastName: userLastName,
            id: userLogged?.id,
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

      successToast("Perfil atualizado com sucesso!");
      setTimeout(() => {
        router.reload();
      }, 2500);
    } catch (error) {
      errorToast(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/auth");
  };

  const handleGetLogged = async () => {
    try {
      const response = await fetchWithAuth("https://localhost:5001/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        const message = await customErrors(
          errorResponse,
          "Falha ao obter usuário logado!"
        );
        throw new Error(message);
      }

      const user = await response.json();
      setUserLogged(user);
      setUserFirstName(user.firstName);
      setUserLastName(user.lastName);
      setUserEmail(user.email);
      setInitials(avatar(`${user.firstName} ${user.lastName}`));
      setPunctuation(user.punctuation);
      debugger;
      if (user.type == "Student" && user.firstAccess) {
        router.push("/questionnaire");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [sideMenu, setSideMenu] = useState<any[]>([]);

  useEffect(() => {
    const type = getUserType();
    if (type) {
      const adm = UserTypeEnum.ADM.id;
      setSideMenu(getMenu(Number(type) === adm));
    }
  }, []);

  const renderIcon = (icon: string) => {
    switch (icon) {
      case "home":
        return <Home className="h-5 w-5" />;
      case "book-plus":
        return <BookPlus className="h-5 w-5" />;
      case "book-open-check":
        return <BookOpenCheck className="h-5 w-5" />;
      default:
      case "user":
        return <User2Icon className="h-5 w-5" />;
    }
  };

  return (
    <header className="sticky top-0 z-30 py-2 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-b sm:bg-background sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            {sideMenu.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                {renderIcon(item.icon)}
                <span className="text-sm text-muted-foreground text-emerald-500">
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="relative ml-auto flex-1 md:grow-0"></div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcsn.png" alt="avatar" />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Dialog>
            <DialogTrigger asChild>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={(e) => e.preventDefault()}
              >
                <span>Perfil</span>
                <Settings className="h-3.5 w-3.5 ml-2" />
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Perfil</DialogTitle>
                <DialogDescription>
                  Veja os principais dados, e altere quando necessário.
                </DialogDescription>
              </DialogHeader>
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
                    </div>

                    <DialogFooter>
                      <DialogClose>
                        <Button
                          variant="secondary"
                          type="button"
                          className="w-full mt-2"
                        >
                          Cancelar
                        </Button>
                      </DialogClose>
                      <Button variant="add" type="submit" className="w-full mt-2">
                        Salvar
                      </Button>
                    </DialogFooter>
                  </form>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <span>Sair</span>
            <LogOut className="h-3.5 w-3.5 ml-2" />
          </DropdownMenuItem>
          {isStudent && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="flex items-center space-x-2">
                <span>Pontuação</span> <Trophy className="h-3.5 w-3.5" />
                <span className="m-2">{punctuation}</span>
              </DropdownMenuLabel>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
