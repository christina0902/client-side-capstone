export const calculateNewDueDate = (dueDate, repeatBillId) => {
  const dueDates = [];
  const currentDate = new Date(dueDate);

  for (let i = 0; i < 50; i++) {
    switch (repeatBillId) {
      case 2:
        currentDate.setDate(currentDate.getDate() + 7);
        break;
      case 3:
        currentDate.setDate(currentDate.getDate() + 14);
        break;
      case 4:
        currentDate.setDate(currentDate.getDate() + 21);
        break;
      case 5:
        currentDate.setDate(currentDate.getDate() + 28);
        break;
      case 6:
        const dayOfMonth = currentDate.getDate();
        if (dayOfMonth < 15) {
          currentDate.setDate(15);
        } else {
          currentDate.setMonth(currentDate.getMonth() + 1);
          currentDate.setDate(1);
        }
        break;
      case 7:
        currentDate.setMonth(currentDate.getMonth() + 1);
        break;
      case 8:
        currentDate.setMonth(currentDate.getMonth() + 2);
        break;
      case 9:
        currentDate.setMonth(currentDate.getMonth() + 3);
        break;
      case 10:
        currentDate.setMonth(currentDate.getMonth() + 4);
        break;
      case 11:
        currentDate.setMonth(currentDate.getMonth() + 6);
        break;
      case 12:
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        break;
      case 13:
        currentDate.setFullYear(currentDate.getFullYear() + 2);
        break;
      case 14:
        currentDate.setFullYear(currentDate.getFullYear() + 3);
        break;
      case 15:
        currentDate.setFullYear(currentDate.getFullYear() + 4);
        break;
      case 16:
        currentDate.setFullYear(currentDate.getFullYear() + 5);
        break;
    }
    dueDates.push(currentDate.toISOString().split("T")[0]);
  }
  return dueDates;
};
