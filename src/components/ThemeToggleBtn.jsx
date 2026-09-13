"use client";

import { useTheme } from "next-themes";
import { Button } from "@heroui/react";
import { FaMoon } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";

export function ThemeToggleBtn() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      isIconOnly
      variant="bordered"
      className="rounded-full"
      onPress={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <MdWbSunny className="absolute h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <FaMoon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
