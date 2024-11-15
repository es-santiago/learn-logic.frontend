"use client";

import { Tabs } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import Layout from "../layout";
import QuestionsTable from "@/components/questions/list/questions-table";
import ActionButtons from "@/components/questions/list/actions-buttons";
import { getWithAuth } from "@/utils/api/httpService";

export default function Questions() {
  const [userList, setUserList] = useState<Question[]>([]);
  const [filter, setFilter] = useState("TODOS");
  const [filteredQuestions, setFilteredQuestions] =
    useState<Question[]>(userList);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    const updatedFilteredQuestions =
      filter === "TODOS"
        ? userList
        : userList.filter((user) => user.activated === (filter === "ATIVO"));
    setFilteredQuestions(updatedFilteredQuestions);
  }, [filter, userList]);

  const fetchQuestions = async () => {
    const res = await getWithAuth({
      url: "https://localhost:5001/questions/list?$select=id,number,title,tags,points,status,level,activated,imageName,creationDate&$orderby=number desc",
      errorMessage: "Falha ao listar questões!",
    });

    if (res.success) {
      setUserList(res.data);
    }
  };

  return (
    <Layout>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-1 xl:grid-cols-1">
        <Tabs defaultValue="all">
          <ActionButtons filter={filter} setFilter={setFilter} />
          <QuestionsTable filteredQuestions={filteredQuestions} />
        </Tabs>
      </main>
    </Layout>
  );
}
