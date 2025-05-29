export default function sortSingsByDate(sings, order = "asc") {
  return sings.slice().sort((a, b) => {
    const dateA = new Date(a.start_date);
    const dateB = new Date(b.start_date);

    if (order === "desc") {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });
}
