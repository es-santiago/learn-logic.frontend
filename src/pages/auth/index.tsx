"use client";

import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import "@/app/globals.css";

interface LoginResponse {
  token: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showError, setShowError] = useState(false);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setShowMessage(false);
    setShowError(false);

    try {
      const response = await fetch("https://localhost:5001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Falha ao realizar login!");
      }

      const { token }: LoginResponse = await response.json();
      localStorage.setItem("authToken", token);
      setShowMessage(true);
      setTimeout(() => router.push("/home"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      <div className="w-full max-w-sm space-y-6">
        {showMessage && (
          <div className="text-xs p-4 bg-green-100 text-green-800 rounded-lg">
            Login realizado com sucesso!
          </div>
        )}
        {showError && (
          <div className="text-xs p-4 bg-red-100 text-red-800 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-2 text-start">
          <h1 className="text-2xl font-semibold tracking-tight">
            Faça login na sua conta
          </h1>
          <p className="text-sm text-muted-foreground">
            Digite seu e-mail e senha para fazer login
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              placeholder="joaosilvao@gmail.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Senha
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

          <Button
            className="w-full bg-[#0A2647] hover:bg-[#0A2647]/90"
            type="submit"
          >
            Entrar
          </Button>
        </form>

        <div className="text-center">
          <span className="text-sm text-muted-foreground">Ou</span>
        </div>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Não tem conta? </span>
          <Link
            href="/auth/register"
            className="font-semibold text-primary hover:underline"
          >
            Crie a sua conta agora
          </Link>
        </div>
      </div>
    </div>
  );
}
