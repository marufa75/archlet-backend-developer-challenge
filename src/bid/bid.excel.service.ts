import { CellValue, RowValues, Worksheet } from "exceljs";
import { calcTypeArr, TYPE_COL, valueClean, valueForKey } from "../util/parse";





export type COL_NAME_TYPE = {
  name: string,
  type: TYPE_COL
}
export type BUYER_TYPE = {
  buyer: string[], supplier: string[][]
}
export class BidExcel {
  private worksheet: Worksheet;
  readonly colsBuyer: COL_NAME_TYPE[] = [];
  readonly colsSupplier: COL_NAME_TYPE[] = [];
  readonly dataset: Record<string, BUYER_TYPE> = {};

  static toCellValues = (row: RowValues): string[] => {
    if (!row || !row.length) throw new Error("Invalid Row");
    const rows = row as CellValue[];
    if (rows.length < 2) throw new Error("Invalid Row");
    return rows.map(row => row ? valueClean(row.valueOf()).toString() : "");
  }
  static toCellsValues = (rows: RowValues[]): string[][] => {
    return rows.map(BidExcel.toCellValues);
  }
  constructor(worksheet: Worksheet) {
    this.worksheet = worksheet;
    const ws = BidExcel.toCellsValues(this.worksheet.getSheetValues());
    const { colsBuyer, colsSupplier, dataset } = this.elaborate(ws);
    this.colsBuyer = colsBuyer;
    this.colsSupplier = colsSupplier;
    this.dataset = dataset;
  }
  private elaborate(ws: string[][]) {
    if (ws.length < 3) throw new Error("Invalid DataSet");
    const postStartSupplier = BidExcel.elaboratePosSupplier(ws.shift()!);
    const { colsBuyer, colsSupplier } = BidExcel.elaborateColumns(postStartSupplier, ws.shift()!);

    Object.freeze(this.colsBuyer);
    Object.freeze(this.colsSupplier);

    const dataset = BidExcel.calculateDataset(ws, postStartSupplier);
    return {
      colsBuyer: BidExcel.colsInit(colsBuyer, colsBuyer.map((_, idx) => BidExcel.calcTypeCol(ws, idx))),
      colsSupplier: BidExcel.colsInit(colsSupplier, colsSupplier.map((_, idx) => BidExcel.calcTypeCol(ws, idx + postStartSupplier)))
      , dataset
    }

  }
  static calculateDataset = (ws: string[][], postStartSupplier: number): Record<string, BUYER_TYPE> => {
    return ws.map(cells => cells.slice(0, postStartSupplier).map(valueForKey).join("_"))
      .reduce((res: Record<string, BUYER_TYPE>, key, index) => {
        const row = ws[index];
        if (!res[key]) {
          res[key] = { buyer: row.slice(0, postStartSupplier).map(valueClean), supplier: [] }
        }
        res[key].supplier.push(row.slice(postStartSupplier).map(valueClean));
        return res;
      }, {});
  }

  private static calcTypeCol = (ws: string[][], col: number): TYPE_COL => {
    return calcTypeArr(ws.map(row => row[col]));
  }
  private static colsInit = (cols: string[], types: TYPE_COL[]): COL_NAME_TYPE[] => {
    return cols.map((name, idx) => {
      return { name, type: types[idx] }
    });
  }
  static elaboratePosSupplier(cells: string[]) {
    const keyBuyer = valueForKey(cells.shift()!);
    const pos = cells.findIndex(cell => cell && valueForKey(cell) !== keyBuyer);
    if (pos < 0) new Error("Invalid DataSet");
    return pos + 1;
  }
  static elaborateColumns(postStartSupplier: number, cells: string[]): { colsBuyer: string[], colsSupplier: string[] } {
    const colsSupplier: string[] = [...cells];
    const colsBuyer = colsSupplier.splice(0, postStartSupplier);
    return { colsBuyer, colsSupplier };
  }
}


