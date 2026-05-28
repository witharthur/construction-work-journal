import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField
} from "@mui/material";
import { Save, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { useEffect, useMemo } from "react";
import type { FormEvent } from "react";
import type { WorkEntry, WorkEntryPayload, WorkType } from "../../types/workEntry";
import { toDateInputValue } from "../../lib/date";
import { createEntryFormSchema, type EntryFormValues } from "./entryFormSchema";
import type { Language, Translation } from "../../i18n";
import { getLocalizedWorkTypeOptions } from "./workTypeOptions";

interface EntryFormDialogProps {
  isOpen: boolean;
  entry?: WorkEntry | undefined;
  workTypes: WorkType[];
  language: Language;
  t: Translation;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (payload: WorkEntryPayload) => void;
}

const defaultValues: EntryFormValues = {
  date: toDateInputValue(new Date()),
  workType: "",
  volume: 1,
  unit: "",
  workerName: ""
};

export function EntryFormDialog({
  isOpen,
  entry,
  workTypes,
  language,
  t,
  isSubmitting,
  onClose,
  onSubmit
}: EntryFormDialogProps) {
  const entrySchema = useMemo(() => createEntryFormSchema(t), [t]);
  const {
    control,
    handleSubmit,
    reset,
    trigger,
    formState: { errors }
  } = useForm<EntryFormValues>({
    resolver: zodResolver(entrySchema) as Resolver<EntryFormValues>,
    defaultValues
  });
  const hasErrors = Object.keys(errors).length > 0;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    reset(
      entry
        ? {
            date: toDateInputValue(entry.date),
            workType: entry.workType,
            volume: entry.volume,
            unit: entry.unit,
            workerName: entry.workerName
          }
        : defaultValues
    );
  }, [entry, isOpen, reset]);

  useEffect(() => {
    if (isOpen && hasErrors) {
      void trigger();
    }
  }, [hasErrors, isOpen, language, trigger]);

  const submitForm = (values: EntryFormValues) => {
    onSubmit({
      date: values.date,
      workType: values.workType.trim(),
      volume: values.volume,
      unit: values.unit.trim(),
      workerName: values.workerName.trim()
    });
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    void handleSubmit(submitForm)(event);
  };

  const workTypeOptions = useMemo(
    () => getLocalizedWorkTypeOptions(workTypes, language),
    [language, workTypes]
  );

  return (
    <Dialog open={isOpen} onClose={isSubmitting ? undefined : onClose} fullWidth maxWidth="sm">
      <DialogTitle>{entry ? t.editWorkEntry : t.createWorkEntry}</DialogTitle>
      <DialogContent>
        <Stack component="form" id="entry-form" onSubmit={handleFormSubmit} gap={2} pt={1}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t.date}
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={Boolean(errors.date)}
                    helperText={errors.date?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="workType"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    freeSolo
                    options={workTypeOptions}
                    value={field.value}
                    onChange={(_event, value) => field.onChange(value ?? "")}
                    onInputChange={(_event, value) => field.onChange(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t.workType}
                        fullWidth
                        error={Boolean(errors.workType)}
                        helperText={errors.workType?.message}
                      />
                    )}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="volume"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t.volume}
                    type="number"
                    inputProps={{ min: 0, step: "any" }}
                    fullWidth
                    error={Boolean(errors.volume)}
                    helperText={errors.volume?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="unit"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t.unit}
                    placeholder={t.unitPlaceholder}
                    fullWidth
                    error={Boolean(errors.unit)}
                    helperText={errors.unit?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Controller
                name="workerName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={t.workerFullName}
                    fullWidth
                    error={Boolean(errors.workerName)}
                    helperText={errors.workerName?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Stack direction="row" gap={1} flexWrap="wrap">
          <Button startIcon={<X size={18} />} onClick={onClose} disabled={isSubmitting}>
            {t.cancel}
          </Button>
          <Button
            startIcon={<Save size={18} />}
            type="submit"
            form="entry-form"
            variant="contained"
            disabled={isSubmitting}
          >
            {entry ? t.saveChanges : t.createEntry}
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
