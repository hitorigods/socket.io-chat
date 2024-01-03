export const useDateLocale = (date: string) => {
  const utcDate = new Date(date);
  const localDate = utcDate.toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  return localDate;
};
