"use client";

import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import "@/app/globals.css";
import { UserTypeEnum } from "@/utils/enum/UserType.enum";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showError, setShowError] = useState(false);

  // User registration state
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");

  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegisterUser = async (event: React.FormEvent) => {
    event.preventDefault();
    setShowMessage(false);
    setShowError(false);

    try {
      const response = await fetch("https://localhost:5001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
          firstName: userFirstName,
          lastName: userLastName,
          type: UserTypeEnum.STUDENT.id,
        }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Falha ao registra-se!");
      }

      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
        router.push("/auth");
      }, 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-4 bg-background p-6">
        <div className="w-full max-w-sm space-y-6">
          {showMessage && (
            <div className="text-xs p-4 bg-green-100 text-green-800 rounded-lg">
              Cadastro realizado com sucesso, você será redirecionado para a
              tela de login!
            </div>
          )}
          {showError && (
            <div className="text-xs p-4 bg-red-100 text-red-800 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-2 text-start">
            <h1 className="text-2xl font-semibold tracking-tight">
              Crie sua conta
            </h1>
            <p className="text-sm text-muted-foreground">
              Crie uma conta para continuar!
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleRegisterUser}>
            <div className="space-y-2">
              <div className="mb-4">
                <label htmlFor="firstName" className="text-sm font-medium">
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
                <label htmlFor="lastName" className="text-sm font-medium">
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
                <label htmlFor="email" className="text-sm font-medium">
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

              <div className="mb-4">
                <label htmlFor="password" className="text-sm font-medium">
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
                    onClick={() => setShowPassword(!showPassword)}
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
                  className="text-sm font-medium"
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
                    onClick={() => setShowPassword(!showPassword)}
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
            </div>

            <Button
              className="w-full bg-[#0A2647] hover:bg-[#0A2647]/90"
              type="submit"
            >
              Criar conta
            </Button>
          </form>
        </div>
      </div>

      <div className="text-center">
        <span className="text-sm text-muted-foreground">Ou</span>
      </div>
      <div className="text-center my-4 text-sm">
        <span className="text-muted-foreground">Já tem conta? </span>
        <Link
          href="/auth"
          className="font-semibold text-primary hover:underline"
        >
          Faça Login
        </Link>
      </div>
    </div>
  );
}
