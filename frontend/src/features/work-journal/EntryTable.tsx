import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Edit2, Plus, Trash2 } from "lucide-react";
import type { WorkEntry } from "../../types/workEntry";
import { formatDisplayDate } from "../../lib/date";
import type { Language, Translation } from "../../i18n";

interface EntryTableProps {
  entries: WorkEntry[];
  total: number;
  language: Language;
  t: Translation;
  isLoading: boolean;
  isError: boolean;
  onCreate: () => void;
  onEdit: (entry: WorkEntry) => void;
  onDelete: (entry: WorkEntry) => void;
}

function EntryCard({
  entry,
  language,
  t,
  onEdit,
  onDelete
}: {
  entry: WorkEntry;
  language: Language;
  t: Translation;
  onEdit: (entry: WorkEntry) => void;
  onDelete: (entry: WorkEntry) => void;
}) {
  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 1 }}>
      <Stack spacing={1.5}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" gap={1}>
          <Box minWidth={0}>
            <Typography fontWeight={700}>{entry.workType}</Typography>
            <Typography color="text.secondary">{formatDisplayDate(entry.date, language)}</Typography>
          </Box>
          <Stack direction="row" gap={0.5}>
            <Tooltip title={t.editEntry}>
              <IconButton aria-label={t.editEntry} size="small" onClick={() => onEdit(entry)}>
                <Edit2 size={18} />
              </IconButton>
            </Tooltip>
            <Tooltip title={t.deleteEntry}>
              <IconButton aria-label={t.deleteEntry} size="small" color="error" onClick={() => onDelete(entry)}>
                <Trash2 size={18} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Typography color="text.secondary">{t.volume}</Typography>
          <Typography fontWeight={600}>
            {entry.volume} {entry.unit}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" gap={2}>
          <Typography color="text.secondary">{t.worker}</Typography>
          <Typography fontWeight={600} textAlign="right">
            {entry.workerName}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}

export function EntryTable({
  entries,
  total,
  language,
  t,
  isLoading,
  isError,
  onCreate,
  onEdit,
  onDelete
}: EntryTableProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (isError) {
    return <Alert severity="error">{t.loadError}</Alert>;
  }

  if (isLoading) {
    return (
      <Paper variant="outlined" sx={{ p: 5, borderRadius: 1 }}>
        <Stack alignItems="center" spacing={2}>
          <CircularProgress />
          <Typography color="text.secondary">{t.loadingEntries}</Typography>
        </Stack>
      </Paper>
    );
  }

  if (entries.length === 0) {
    return (
      <Paper variant="outlined" sx={{ p: { xs: 3, md: 5 }, borderRadius: 1 }}>
        <Stack alignItems="center" textAlign="center" spacing={2}>
          <Typography variant="h2">{t.emptyTitle}</Typography>
          <Typography color="text.secondary" maxWidth={480}>
            {t.emptyDescription}
          </Typography>
          <Button startIcon={<Plus size={18} />} variant="contained" onClick={onCreate}>
            {t.createEntry}
          </Button>
        </Stack>
      </Paper>
    );
  }

  if (isMobile) {
    return (
      <Stack spacing={1.5}>
        <Typography color="text.secondary">{t.entryCount(total)}</Typography>
        {entries.map((entry) => (
          <EntryCard
            key={entry.id}
            entry={entry}
            language={language}
            t={t}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </Stack>
    );
  }

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{
        borderRadius: 1,
        boxShadow: "0 12px 30px rgba(23, 32, 29, 0.08)",
        overflow: "hidden"
      }}
    >
      <Table sx={{ minWidth: 780 }} aria-label={t.tableAriaLabel}>
        <TableHead>
          <TableRow>
            <TableCell>{t.date}</TableCell>
            <TableCell>{t.workType}</TableCell>
            <TableCell>{t.volumeUnit}</TableCell>
            <TableCell>{t.workerFullName}</TableCell>
            <TableCell align="right">{t.actions}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((entry) => (
            <TableRow key={entry.id} hover>
              <TableCell>{formatDisplayDate(entry.date, language)}</TableCell>
              <TableCell>{entry.workType}</TableCell>
              <TableCell>
                {entry.volume} {entry.unit}
              </TableCell>
              <TableCell>{entry.workerName}</TableCell>
              <TableCell align="right">
                <Tooltip title={t.editEntry}>
                  <IconButton aria-label={t.editEntry} onClick={() => onEdit(entry)}>
                    <Edit2 size={18} />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t.deleteEntry}>
                  <IconButton aria-label={t.deleteEntry} color="error" onClick={() => onDelete(entry)}>
                    <Trash2 size={18} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
