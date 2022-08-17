const parseCSV = (data) => {
  const csv = [];

  //rows
  const rows = data.split("\n");

  //names
  const names = rows[0]
    .split(",")
    .filter((d) => typeof d == "string" && d.trim() !== "");

  //values
  for (let i = 1; i < rows.length; i++) {
    const values = rows[i]
      .split(",")
      .map((d) => (typeof d == "string" ? d.trim() : undefined));

    const row = names
      .map((d, i) => ({ [d.trim()]: values[i] }))
      .reduce((prev, curr) => ({ ...prev, ...curr }), {});

    if (Object.values(row).some((d) => d !== undefined && d !== ""))
      csv.push(row);
  }

  return csv;
};

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

function isNumeric(str) {
  if (typeof str == "number") return true;
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}

function round(value, decimals = 0, isFixed = false) {
  const a = Math.pow(10, decimals);
  const v = Math.round(value * a) / a;
  return isFixed ? v.toFixed(decimals) : v;
}

export { parseCSV, isValidDate, isNumeric, round };
