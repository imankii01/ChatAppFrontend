export function getDuration(startDate, endDate, current) {
  if (current) {
    return "Present";
  } else {
    const startFormatted = startDate ? formatDate(startDate) : "";
    const endFormatted = endDate ? formatDate(endDate) : "Present";
    return `${startFormatted} - ${endFormatted}`;
  }
}

function formatDate(dateString) {
  if (!dateString) {
    return ""; // Return empty string if dateString is not defined
  }
  const [year, month] = dateString.split("-");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
}

export function calculateExperience(startDate, endDate) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date(); // If endDate is not provided, use current date

  const diffInMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""}`;
  }

  const years = Math.floor(diffInMonths / 12);
  const remainingMonths = diffInMonths % 12;

  if (remainingMonths === 0) {
    return `${years} year${years !== 1 ? "s" : ""}`;
  }

  return `${years} year${years !== 1 ? "s" : ""} and ${remainingMonths} month${
    remainingMonths !== 1 ? "s" : ""
  }`;
}

export const convertUTCtoLocal = (utcDateString) => {
  const utcDate = new Date(utcDateString);
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true, // Use 12-hour clock format
  };
  const localDateTime = utcDate.toLocaleString("en-US", options);
  return localDateTime;
};
