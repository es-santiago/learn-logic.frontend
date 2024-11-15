import Link from "next/link";
import {
  BookOpenCheck,
  BookPlus,
  Home,
  User2Icon,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import "@/app/globals.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getUserType } from "@/utils/tokenService";
import { UserTypeEnum } from "@/utils/enum/UserType.enum";
import { getMenu } from "@/utils/menu";

export default function SideBar() {
  const pathname = usePathname();
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
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        {/* <Link
          href="/home"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg 
            font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base mb-4 mt-1"
        >
          <Image src={logo} alt="Logo" width={150} />
        </Link> */}

        <TooltipProvider>
          {sideMenu.map((item, index) => {
            const isActive = pathname === item.path;

            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.path}
                    className={`
                            flex h-9 w-9 items-center justify-center rounded-lg 
                            ${
                              isActive
                                ? "bg-slate-600 text-slate-100"
                                : "bg-transparent text-slate-600"
                            } 
                            transition-colors hover:bg-slate-600 hover:text-slate-200 md:h-8 md:w-8
                        `}
                  >
                    {renderIcon(item.icon)}
                    <span className="sr-only">{item.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>
    </aside>
  );
}
