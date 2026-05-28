import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip
} from "@mui/material";
import { CalendarDays, Search, X } from "lucide-react";
import type { EntryFilters as EntryFiltersType } from "../../types/workEntry";
import type { Translation } from "../../i18n";

interface EntryFiltersProps {
  filters: EntryFiltersType;
  t: Translation;
  onChange: (filters: EntryFiltersType) => void;
}

export function EntryFilters({ filters, t, onChange }: EntryFiltersProps) {
  const clearFilters = () => {
    onChange({ date: "", search: "", sort: filters.sort });
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      gap={2}
      alignItems={{ xs: "stretch", md: "center" }}
      sx={{ width: "100%" }}
    >
      <TextField
        label={t.search}
        value={filters.search ?? ""}
        onChange={(event) => onChange({ ...filters, search: event.target.value })}
        fullWidth
        sx={{ maxWidth: { md: 360 } }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size={18} />
            </InputAdornment>
          )
        }}
      />

      <TextField
        label={t.date}
        type="date"
        value={filters.date ?? ""}
        onChange={(event) => onChange({ ...filters, date: event.target.value })}
        fullWidth
        sx={{ maxWidth: { md: 220 } }}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CalendarDays size={18} />
            </InputAdornment>
          )
        }}
      />

      <FormControl fullWidth sx={{ maxWidth: { md: 180 } }}>
        <InputLabel id="sort-date-label">{t.sort}</InputLabel>
        <Select
          labelId="sort-date-label"
          label={t.sort}
          value={filters.sort}
          onChange={(event) => onChange({ ...filters, sort: event.target.value })}
        >
          <MenuItem value="desc">{t.newestFirst}</MenuItem>
          <MenuItem value="asc">{t.oldestFirst}</MenuItem>
        </Select>
      </FormControl>

      <Tooltip title={t.clearFilters}>
        <span>
          <Button
            startIcon={<X size={18} />}
            variant="outlined"
            onClick={clearFilters}
            disabled={!filters.date && !filters.search}
            sx={{ minWidth: 132 }}
          >
            {t.clear}
          </Button>
        </span>
      </Tooltip>
    </Stack>
  );
}
