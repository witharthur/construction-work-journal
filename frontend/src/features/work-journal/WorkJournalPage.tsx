import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Snackbar,
  Stack,
  Typography
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ClipboardList, HardHat, Plus, Ruler } from "lucide-react";
import { useState } from "react";
import { PageShell } from "../../components/PageShell";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import {
  createEntry,
  deleteEntry,
  fetchEntries,
  fetchWorkTypes,
  updateEntry
} from "../../api/workEntries";
import { getApiErrorMessage } from "../../api/client";
import type {
  ApiListResponse,
  EntryFilters,
  WorkEntry,
  WorkEntryPayload
} from "../../types/workEntry";
import type { ColorMode } from "../../theme";
import { translations, type Language } from "../../i18n";
import { EntryFilters as EntryFiltersPanel } from "./EntryFilters";
import { EntryFormDialog } from "./EntryFormDialog";
import { EntryTable } from "./EntryTable";

const initialFilters: EntryFilters = {
  date: "",
  search: "",
  sort: "desc"
};

interface WorkJournalPageProps {
  mode: ColorMode;
  language: Language;
  onToggleMode: () => void;
  onToggleLanguage: () => void;
}

interface ToastState {
  message: string;
  severity: "success" | "error";
}

interface EntriesQueryContext {
  previousEntries: ApiListResponse<WorkEntry> | undefined;
}

function SummaryTile({
  label,
  value,
  icon
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 1, height: "100%" }}>
      <Stack direction="row" alignItems="center" gap={1.5}>
        <Box
          width={40}
          height={40}
          borderRadius={1}
          display="grid"
          sx={{ placeItems: "center", bgcolor: "primary.main", color: "primary.contrastText" }}
        >
          {icon}
        </Box>
        <Box minWidth={0}>
          <Typography color="text.secondary">{label}</Typography>
          <Typography variant="h2" noWrap>
            {value}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

export function WorkJournalPage({
  mode,
  language,
  onToggleMode,
  onToggleLanguage
}: WorkJournalPageProps) {
  const t = translations[language];
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<EntryFilters>(initialFilters);
  const [editingEntry, setEditingEntry] = useState<WorkEntry | undefined>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<WorkEntry | undefined>();
  const [toast, setToast] = useState<ToastState | undefined>();

  const entriesQuery = useQuery({
    queryKey: ["entries", filters],
    queryFn: () => fetchEntries(filters)
  });

  const workTypesQuery = useQuery({
    queryKey: ["workTypes"],
    queryFn: fetchWorkTypes
  });

  const createMutation = useMutation({
    mutationFn: createEntry,
    onSuccess: () => {
      setToast({ message: t.createdToast, severity: "success" });
      setIsFormOpen(false);
      void queryClient.invalidateQueries({ queryKey: ["entries"] });
    },
    onError: (error) => {
      setToast({ message: getApiErrorMessage(error), severity: "error" });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: WorkEntryPayload }) => updateEntry(id, payload),
    onSuccess: () => {
      setToast({ message: t.updatedToast, severity: "success" });
      setIsFormOpen(false);
      setEditingEntry(undefined);
      void queryClient.invalidateQueries({ queryKey: ["entries"] });
    },
    onError: (error) => {
      setToast({ message: getApiErrorMessage(error), severity: "error" });
    }
  });

  const deleteMutation = useMutation<WorkEntry, Error, string, EntriesQueryContext>({
    mutationFn: deleteEntry,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["entries", filters] });
      const previousEntries = queryClient.getQueryData<ApiListResponse<WorkEntry>>(["entries", filters]);

      if (previousEntries) {
        queryClient.setQueryData<ApiListResponse<WorkEntry>>(["entries", filters], {
          data: previousEntries.data.filter((entry) => entry.id !== id),
          meta: { total: Math.max(previousEntries.meta.total - 1, 0) }
        });
      }

      setEntryToDelete(undefined);
      return { previousEntries };
    },
    onSuccess: () => {
      setToast({ message: t.deletedToast, severity: "success" });
    },
    onError: (error, _id, context) => {
      if (context?.previousEntries) {
        queryClient.setQueryData(["entries", filters], context.previousEntries);
      }

      setToast({ message: getApiErrorMessage(error), severity: "error" });
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["entries"] });
    }
  });

  const entries = entriesQuery.data?.data ?? [];
  const total = entriesQuery.data?.meta.total ?? 0;
  const totalVolume = entries.reduce((sum, entry) => sum + entry.volume, 0);
  const uniqueWorkers = new Set(entries.map((entry) => entry.workerName)).size;

  const openCreateDialog = () => {
    setEditingEntry(undefined);
    setIsFormOpen(true);
  };

  const openEditDialog = (entry: WorkEntry) => {
    setEditingEntry(entry);
    setIsFormOpen(true);
  };

  const submitEntry = (payload: WorkEntryPayload) => {
    if (editingEntry) {
      updateMutation.mutate({ id: editingEntry.id, payload });
      return;
    }

    createMutation.mutate(payload);
  };

  return (
    <PageShell
      mode={mode}
      language={language}
      t={t}
      onToggleMode={onToggleMode}
      onToggleLanguage={onToggleLanguage}
    >
      <Stack spacing={3}>
        <Stack direction={{ xs: "column", md: "row" }} alignItems={{ md: "center" }} justifyContent="space-between" gap={2}>
          <Box>
            <Typography variant="h2" component="h2">
              {t.workEntries}
            </Typography>
            <Typography color="text.secondary">
              {t.recordsInCurrentView(total)}
            </Typography>
          </Box>
          <Button startIcon={<Plus size={18} />} variant="contained" onClick={openCreateDialog}>
            {t.createEntry}
          </Button>
        </Stack>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <SummaryTile label={t.entries} value={String(total)} icon={<ClipboardList size={20} />} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <SummaryTile label={t.workers} value={String(uniqueWorkers)} icon={<HardHat size={20} />} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <SummaryTile
              label={t.totalVolume}
              value={totalVolume.toLocaleString(language === "ru" ? "ru-RU" : "en")}
              icon={<Ruler size={20} />}
            />
          </Grid>
        </Grid>

        <Paper variant="outlined" sx={{ p: 2, borderRadius: 1 }}>
          <EntryFiltersPanel filters={filters} t={t} onChange={setFilters} />
        </Paper>

        <Divider />

        <EntryTable
          entries={entries}
          total={total}
          language={language}
          t={t}
          isLoading={entriesQuery.isLoading || entriesQuery.isFetching}
          isError={entriesQuery.isError}
          onCreate={openCreateDialog}
          onEdit={openEditDialog}
          onDelete={setEntryToDelete}
        />
      </Stack>

      <EntryFormDialog
        isOpen={isFormOpen}
        entry={editingEntry}
        workTypes={workTypesQuery.data ?? []}
        language={language}
        t={t}
        isSubmitting={createMutation.isPending || updateMutation.isPending}
        onClose={() => {
          setIsFormOpen(false);
          setEditingEntry(undefined);
        }}
        onSubmit={submitEntry}
      />

      <ConfirmDialog
        isOpen={Boolean(entryToDelete)}
        title={t.deleteTitle}
        description={
          entryToDelete
            ? t.deleteDescription(entryToDelete.workType, entryToDelete.workerName)
            : t.deleteFallback
        }
        confirmLabel={t.deleteConfirm}
        cancelLabel={t.cancel}
        isBusy={deleteMutation.isPending}
        onClose={() => setEntryToDelete(undefined)}
        onConfirm={() => {
          if (entryToDelete) {
            deleteMutation.mutate(entryToDelete.id);
          }
        }}
      />

      <Snackbar
        open={Boolean(toast)}
        autoHideDuration={4000}
        onClose={() => setToast(undefined)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        {toast ? (
          <Alert severity={toast.severity} variant="filled" onClose={() => setToast(undefined)}>
            {toast.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </PageShell>
  );
}
