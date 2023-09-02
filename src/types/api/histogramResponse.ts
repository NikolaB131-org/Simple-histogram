type HistogramResponse = {
  earnings: {
    year_sum: number;
    six_month_sum: number;
    last_month_sum: number;
  };
  graph: {
    year: {
      January: number;
      February: number;
      March: number;
      April: number;
      May: number;
      June: number;
      July: number;
      August: number;
      September: number;
      October: number;
      November: number;
      December: number;
    };
    half_year: {
      January: number;
      February: number;
      March: number;
      April: number;
      May: number;
      June: number;
    };
    month: Record<number, number>;
  };
};
