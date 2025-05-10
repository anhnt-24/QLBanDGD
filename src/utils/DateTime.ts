export const formatLocalDate = (utcDate: string) => {
  return new Date(utcDate).toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour12: false,
  });
};

// src/utils/dateUtils.ts

const weekdays = [
  "Chủ nhật",
  "Thứ hai",
  "Thứ ba",
  "Thứ tư",
  "Thứ năm",
  "Thứ sáu",
  "Thứ bảy",
];

export const formatDateTimeWithWeekday = (isoString: string): string => {
  if (!isoString) return "";

  const date = new Date(isoString);

  const weekday = weekdays[date.getDay()];
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // JS tháng bắt đầu từ 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${weekday}, ${day}/${month}/${year} ${hours}:${minutes}`;
};
