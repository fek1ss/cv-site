export function formatDateRange(startDate, endDate) {
  if (!startDate) return "";

  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const options = { year: "numeric", month: "short" };
  const startStr = start.toLocaleDateString("en-US", options);
  const endStr = endDate
    ? end.toLocaleDateString("en-US", options)
    : "Present";

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
