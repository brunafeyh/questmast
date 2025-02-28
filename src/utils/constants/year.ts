export const YearOptions = Array.from(
    { length: new Date().getFullYear() - 1980 + 1 },
    (_, index) => {
      const year = 1980 + index;
      return { label: year.toString(), value: year };
    }
  );
  