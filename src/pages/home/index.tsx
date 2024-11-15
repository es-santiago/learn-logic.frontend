import StatCard from "@/components/ui/statCard";
import TopUserCard from "@/components/ui/topUserCard";
import { customErrors } from "@/utils/customErrors";
import { UserTypeEnum } from "@/utils/enum/UserType.enum";
import fetchWithAuth from "@/utils/api/fetchWithAuth";
import { errorToast } from "@/utils/toast";
import { getUserType } from "@/utils/tokenService";
import { ArrowDownToLine } from "lucide-react";
import { useEffect, useState } from "react";
import Layout from "@/pages/layout";

interface User {
  email: string;
  fullName: string;
  id: string;
  punctuation: number;
}

interface Summary {
  total_users: number;
  top_users: User[];
  total_questions: number;
  total_answers: number;
  users_register_last_week: number;
}

export default function Home() {
  const [summary, setSummary] = useState<Summary>({
    total_users: 0,
    top_users: [],
    total_questions: 0,
    total_answers: 0,
    users_register_last_week: 0,
  });
  const [userType, setUserType] = useState(1);

  useEffect(() => {
    handleSummary();

    const type = getUserType();
    if (type) {
      setUserType(Number(type));
    }
  }, []);

  const handleSummary = async () => {
    try {
      const response = await fetchWithAuth(
        "https://localhost:5001/home/summary",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        errorToast(
          await customErrors(
            errorResponse,
            "Falha ao obter informações da Home!"
          )
        );
      }

      const res = await response.json();
      setSummary(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3">
        {userType !== UserTypeEnum.STUDENT.id && (
          <>
            <StatCard title="Total de Usuários" value={summary.total_users} />
            <StatCard
              title="Total de Questões na Plataforma"
              value={summary.total_questions}
            />
            <StatCard
              title="Total de Questões Resolvidas"
              value={summary.total_answers}
            />
            <StatCard
              title="Total de Usuários Registrados na última semana"
              value={summary.users_register_last_week}
            />
          </>
        )}
      </main>

      <div className="m-8 rounded-xl border bg-card text-card-foreground shadow">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="font-semibold leading-none tracking-tight">
            Top 5 Usuários com maior Pontuação
          </div>
        </div>
        <div className="p-6 pt-0">
          <div className="space-y-8">
            {userType !== UserTypeEnum.STUDENT.id && (
              <>
                {summary.top_users.map((user) => (
                  <TopUserCard key={user.email} user={user} />
                ))}
              </>
            )}
            {userType === UserTypeEnum.STUDENT.id && (
              <>
                {summary.top_users.map((user, index) => (
                  <div key={user.email}>
                    {index < 5 && <TopUserCard user={user} />}

                    {index === 5 && (
                      <>
                        <div className="text-emerald-500">
                          <div className="flex flex-col items-center justify-center">
                            <ArrowDownToLine />
                            <p className="mt-2 mb-5 text-sm text-muted-foreground text-emerald-500">
                              Sua Pontuação.
                            </p>
                          </div>
                        </div>
                        <TopUserCard user={user} />
                      </>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
