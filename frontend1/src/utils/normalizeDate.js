export const normalizeDate = (date) => {
    if (!date) return null;
    return date.includes("T") ? date.split("T")[0] : date;
  };