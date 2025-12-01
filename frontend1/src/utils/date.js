export function formatDateRange(startDate, endDate) {
  if (!startDate) return "";

  const start = new Date(startDate);
  const today = new Date();
  const end = endDate ? new Date(endDate) : today;

  const options = { year: "numeric", month: "short" };
  const startStr = start.toLocaleDateString("en-US", options);

  // нормализуем дату до "YYYY-MM-DD"
  const formatISO = (date) => date.toISOString().split("T")[0];
  const isToday = endDate && formatISO(new Date(endDate)) === formatISO(today);

  const endStr = !endDate || isToday
    ? "Present"
    : end.toLocaleDateString("en-US", options);

  // вычисляем длительность
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }

  let duration = "";
  if (years > 0) duration += `${years} yr${years > 1 ? "s" : ""} `;
  if (months > 0) duration += `${months} mo${months > 1 ? "s" : ""}`;
  if (!duration) duration = "Less than a month";

  return `${startStr} - ${endStr} · ${duration.trim()}`;
}
