
export enum TYPE_COL {
  EMPTY,
  STRING,
  INT,
  FLOAT
}



export const valueForKey = (v: any) => {
  if (typeof v === "string") return v.trim().toLowerCase().replace(/ |\t|\n|\r/g, "");
  return v || "";
}

export const valueClean = (v: any) => {
  if (typeof v === "string") return v.trim().replace(/\t|\n|\r/g, " ");
  return v;
}

export const stringContainFloatOrInt = (v: string) => {
  return (v || "").split(' ').find(isFloatOrInt);
}
export const stringsManyContainFloatOrInt = (values: string[]) => {
  if (calcTypeArr(values)=== TYPE_COL.STRING) {
    const mapCol = values.map(stringContainFloatOrInt);
    const countValues = mapCol.filter(el => el !== undefined).length;
    return (countValues >= values.length / 2) ? mapCol as string[] : undefined;
  }
  return undefined;
}
export const isFloatOrInt = (v: string) => {
  const vt = (v || "").replace(",", ".");
  return (/^[+-]?(\d*[.])?\d+$/.test(vt)) ? vt : undefined;
}
export const valueIsFloat = (v: string): [boolean, number | undefined] => {
  const vt = (v || "").replace(",", ".");

  if (/^[+-]?(\d*[.])\d+$/.test(vt)) {
    const value = parseFloat(vt);
    if (!isNaN(value)) {
      return [true, value];
    }
  }
  const [_, intV] = valueIsInt(v);
  return [false, intV];
}
export const valueIsInt = (v: string): [boolean, number | undefined] => {
  if (/^\d+$/.test(v)) {
    const value = parseInt(v);
    if (!isNaN(value)) {
      return [true, value];
    }
  }
  return [false, undefined];
}


export const calcType = (value: string): TYPE_COL => {
  if (value === undefined || value === null || value === "") return TYPE_COL.EMPTY;
  const [isFloat] = valueIsFloat(value);
  if (isFloat) return TYPE_COL.FLOAT;
  const [isInt] = valueIsInt(value);
  if (isInt) return TYPE_COL.INT;
  return TYPE_COL.STRING;
}

export const calcTypeArr = (values: string[]): TYPE_COL => {
  return values.reduce((res: TYPE_COL, value) => {
    if (res === TYPE_COL.STRING) return TYPE_COL.STRING;
    const type = calcType(value);
    if (type === TYPE_COL.STRING) {
      return TYPE_COL.STRING;
    }
    if (type === TYPE_COL.FLOAT) return TYPE_COL.FLOAT;
    if (type === TYPE_COL.INT && res === TYPE_COL.EMPTY) return TYPE_COL.INT;
    return res;
  }, TYPE_COL.EMPTY);
}