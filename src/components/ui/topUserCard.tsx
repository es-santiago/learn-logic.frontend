import { avatar } from "@/utils/avatar";

interface User {
  fullName: string;
  email: string;
  punctuation: number;
  // adicione outras propriedades conforme necessário
}

interface TopUserCardProps {
  user: User;
}

const TopUserCard: React.FC<TopUserCardProps> = ({ user }) => (
  <div className="flex items-center">
    <span className="relative shrink-0 overflow-hidden rounded-full flex h-9 w-9 items-center justify-center space-y-0 border">
      {avatar(user.fullName)}
    </span>
    <div className="ml-4 space-y-1">
      <p className="text-sm font-medium leading-none">{user.fullName}</p>
      <p className="text-sm text-muted-foreground">{user.email}</p>
    </div>
    <div className="ml-auto font-medium">{user.punctuation}</div>
  </div>
);

export default TopUserCard;
