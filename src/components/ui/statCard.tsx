import React from "react";

// Defina uma interface para as props do seu componente
interface StatCardProps {
  title: string;
  value: string | number; // 'value' pode ser uma string ou número, dependendo do seu uso
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <div className="rounded-xl border bg-card text-card-foreground shadow">
    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
      <div className="tracking-tight text-sm font-medium">{title}</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="h-4 w-4 text-muted-foreground"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
      </svg>
    </div>
    <div className="p-6 pt-0">
      <div className="text-2xl font-bold">{value}</div>
    </div>
  </div>
);

export default StatCard;
