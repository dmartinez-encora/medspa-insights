import { DateTime } from "luxon";

export const HYPHEN = "–";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      mr: 1,
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export const formatValue = (value: string | null | undefined) => {
  return value === "" || value === undefined || value === null ? HYPHEN : value;
};

export function formatClientsBirthdate(birthdate: Date | null) {
  if (!birthdate || birthdate === null) return "";

  const clientsBirthdate = DateTime.fromISO(birthdate.toISOString());

  const clientAge = DateTime.now()
    .diff(clientsBirthdate, "years")
    .years.toFixed(0);

  return `${clientsBirthdate.toLocaleString()} • Age ${clientAge}`;
}

export function formatAppointmentDate(
  startDate: Date | null,
  endDate: Date | null
) {
  if (!startDate || endDate === null) return "";

  const start = DateTime.fromISO(startDate.toISOString());
  const end = DateTime.fromISO(endDate.toISOString());

  return `${start.toLocaleString()} • ${start.toFormat("t")} - ${end.toFormat(
    "t"
  )}`;
}
