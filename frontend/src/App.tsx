import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { WorkJournalPage } from "./features/work-journal/WorkJournalPage";
import { createAppTheme, type ColorMode } from "./theme";
import { queryClient } from "./lib/queryClient";
import type { Language } from "./i18n";

export function App() {
  const [mode, setMode] = useState<ColorMode>("light");
  const [language, setLanguage] = useState<Language>("ru");
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const toggleMode = () => {
    setMode((currentMode) => (currentMode === "light" ? "dark" : "light"));
  };

  const toggleLanguage = () => {
    setLanguage((currentLanguage) => (currentLanguage === "en" ? "ru" : "en"));
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WorkJournalPage
          mode={mode}
          language={language}
          onToggleMode={toggleMode}
          onToggleLanguage={toggleLanguage}
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
