import {
  AppBar,
  Box,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography
} from "@mui/material";
import { Building2, Languages, Moon, Sun } from "lucide-react";
import type { ColorMode } from "../theme";
import type { Language, Translation } from "../i18n";

interface PageShellProps {
  mode: ColorMode;
  language: Language;
  t: Translation;
  onToggleMode: () => void;
  onToggleLanguage: () => void;
  children: React.ReactNode;
}

export function PageShell({
  mode,
  language,
  t,
  onToggleMode,
  onToggleLanguage,
  children
}: PageShellProps) {
  return (
    <Box minHeight="100vh" bgcolor="background.default">
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          backdropFilter: "blur(16px)"
        }}
      >
        <Toolbar sx={{ gap: 2, minHeight: { xs: 64, md: 72 } }}>
          <Stack direction="row" alignItems="center" spacing={1.25} flex={1} minWidth={0}>
            <Box
              width={40}
              height={40}
              borderRadius={1}
              display="grid"
              sx={{ placeItems: "center", bgcolor: "primary.main", color: "primary.contrastText" }}
            >
              <Building2 size={22} />
            </Box>
            <Box minWidth={0}>
              <Typography component="h1" variant="h1" noWrap sx={{ fontSize: { xs: 20, md: 28 } }}>
                {t.appTitle}
              </Typography>
              <Typography color="text.secondary" noWrap sx={{ display: { xs: "none", sm: "block" } }}>
                {t.appSubtitle}
              </Typography>
            </Box>
          </Stack>

          <Tooltip title={t.switchLanguage}>
            <IconButton
              aria-label={t.switchLanguage}
              aria-pressed={language === "ru"}
              onClick={onToggleLanguage}
            >
              <Languages size={20} />
              <Typography component="span" sx={{ ml: 0.5, fontSize: 13, fontWeight: 700 }}>
                {t.languageButtonLabel}
              </Typography>
            </IconButton>
          </Tooltip>

          <Tooltip title={mode === "light" ? t.switchToDarkMode : t.switchToLightMode}>
            <IconButton aria-label="Toggle color mode" onClick={onToggleMode}>
              {mode === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 } }}>
        {children}
      </Container>
    </Box>
  );
}
