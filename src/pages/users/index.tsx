"use client";

import {
  ListFilter,
  MoreHorizontal,
  Pen,
  Lock,
  PlusCircle,
  Trash,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import fetchWithAuth from "@/utils/api/fetchWithAuth";
import { ModalUser } from "@/components/users/modal-user";
import { ModalChangeStatus } from "@/components/defaults/modal-change-status";
import { customErrors } from "@/utils/customErrors";
import { ModalChangePassword } from "@/components/users/modal-change-password";
import Layout from "../layout";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  activated: boolean;
  creationDate: string;
}

export default function Users() {
  const [userList, setUserList] = useState<User[]>([]);
  const [filter, setFilter] = useState("TODOS");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(userList);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const updatedFilteredUsers =
      filter === "TODOS"
        ? userList
        : userList.filter((user) => user.activated === (filter === "ATIVO"));
    setFilteredUsers(updatedFilteredUsers);
  }, [filter, userList]);

  const fetchUsers = async () => {
    try {
      const response = await fetchWithAuth(
        "https://localhost:5001/users/list?$select=id,firstName,lastName,email,type,activated,creationDate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
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

      const users = await response.json();
      setUserList(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <Layout>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-1 xl:grid-cols-1">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filtro
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {["TODOS", "ATIVO", "INATIVO"].map((option) => (
                    <DropdownMenuCheckboxItem
                      key={option}
                      checked={filter === option}
                      onSelect={() => setFilter(option)}
                    >
                      {option.charAt(0).toUpperCase() +
                        option.slice(1).toLowerCase()}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="add" className="h-7 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Adicionar
                    </span>
                  </Button>
                </DialogTrigger>
                <ModalUser />
              </Dialog>
            </div>
          </div>
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Usuários</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Sobrenome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Perfil</TableHead>
                      <TableHead>Data de Criação</TableHead>
                      <TableHead>
                        <span className="sr-only">Ações</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.firstName}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {user.lastName}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.activated ? "ATIVO" : "INATIVO"}>
                            {user.activated ? "Ativo" : "Inativo"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              user.type === "Administrator"
                                ? "TESTE_COLOR_2"
                                : "TESTE_COLOR"
                            }
                          >
                            {user.type === "Administrator"
                              ? "Administrador"
                              : "Estudante"}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {new Date(user.creationDate).toLocaleDateString(
                            "pt-BR"
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
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
                                <ModalUser user={user} />
                              </Dialog>

                              <Dialog>
                                <DialogTrigger asChild>
                                  <DropdownMenuItem
                                    className="cursor-pointer gap-1"
                                    onSelect={(e) => e.preventDefault()}
                                  >
                                    <Trash className="h-3.5 w-3.5" />
                                    {user.activated ? "Desativar" : "Ativar"}
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <ModalChangeStatus
                                  path={"users/change-status"}
                                  id={user.id}
                                  status={user.activated}
                                  title={`Deseja realmente ${
                                    user.activated ? "desativar" : "ativar"
                                  } o acesso do usuário ${user.firstName} ${
                                    user.lastName
                                  }?`}
                                  message={`O usuário ${user.firstName} ${
                                    user.lastName
                                  } com email ${user.email} irá ser ${
                                    user.activated ? "desativado" : "ativado"
                                  }, essa alteração pode ser revertida.`}
                                />
                              </Dialog>

                              <Dialog>
                                <DialogTrigger asChild>
                                  <DropdownMenuItem
                                    className="cursor-pointer gap-1"
                                    onSelect={(e) => e.preventDefault()}
                                  >
                                    <Lock className="h-3.5 w-3.5" />
                                    Alterar Senha
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <ModalChangePassword user={user} />
                              </Dialog>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>{/* Footer content if needed */}</CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </Layout>
  );
}
