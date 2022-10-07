const weekday = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];

const formatDateAndDay = (dayAndDateString) => {
  const today = new Date(Date.now());
  const formattedDate = today.toLocaleDateString("ko", {
    day: "numeric",
    month: "long",
  });
  const formattedDay = weekday[today.getDay()];
  if (dayAndDateString === "date") return formattedDate;
  if (dayAndDateString === "day") return formattedDay;
};

export default formatDateAndDay;
