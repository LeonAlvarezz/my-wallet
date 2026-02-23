import { Computer, Moon, Sun } from "lucide-react";
import { type HTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/modules/theme/use-theme";

type ThemeToggleProps = HTMLAttributes<HTMLDivElement> & {};

export function ThemeToggle({ className, ...props }: ThemeToggleProps) {
  // const { setTheme } = useTheme();

  // return (
  //   <div className={className} {...props}>
  //     <DropdownMenu>
  //       <DropdownMenuTrigger asChild>
  //         <Button variant="outline" size="icon">
  //           <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
  //           <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
  //           <span className="sr-only">Toggle theme</span>
  //         </Button>
  //       </DropdownMenuTrigger>
  //       <DropdownMenuContent align="end">
  //         <DropdownMenuItem onClick={() => setTheme("light")}>
  //           Light
  //         </DropdownMenuItem>
  //         <DropdownMenuItem onClick={() => setTheme("dark")}>
  //           Dark
  //         </DropdownMenuItem>
  //         <DropdownMenuItem onClick={() => setTheme("system")}>
  //           System
  //         </DropdownMenuItem>
  //       </DropdownMenuContent>
  //     </DropdownMenu>
  //   </div>
  // );

  const { setTheme, theme } = useTheme();
  const handleThemeSwitch = () => {
    switch (theme) {
      case "dark":
        setTheme("light");
        break;
      default:
        setTheme("dark");
        break;
    }
  };
  return (
    <div className={className} {...props}>
      <Button variant="outline" size="icon" onClick={handleThemeSwitch}>
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      </Button>
    </div>
  );

  // if (theme === "dark") {
  //   return (

  //   );
  // }

  // if (theme === "light") {
  //   return (
  //     <Moon
  //       className="h-[1.2rem] w-[1.2rem] shrink-0 scale-100 rotate-0 cursor-pointer text-neutral-900 transition-all hover:scale-110 dark:scale-0 dark:-rotate-90"
  //       onClick={() => setTheme("dark")}
  //     />
  //   );
  // }
}
