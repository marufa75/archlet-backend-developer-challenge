import { Worksheet } from "exceljs";
import { NexusGenFieldTypes, NexusGenRootTypes } from "../../nexus-typegen";
import { TYPE_COL, valueIsFloat, valueIsInt } from "../util/parse";
import { BidExcel, BUYER_TYPE, COL_NAME_TYPE } from "./bid.excel.service";
import { v4 as uuidv4 } from 'uuid';

interface COL_NAME_TYPE_FLD extends COL_NAME_TYPE {
  field: string;
}

export const mapAndStoreWorksheetToDb = (projectId: string, worksheet: Worksheet) => {

  const bid = new BidExcel(worksheet);
  const colsBuyer = mapColsName(bid.colsBuyer);
  const colsSupplier = mapColsName(bid.colsSupplier);

  const titles = mapColsToTitles(true, colsBuyer).concat(mapColsToTitles(false, colsSupplier)).map(obj => ({ projectId, ...obj }));
  const buyers = mapDataset(bid.dataset, colsBuyer, colsSupplier).map(obj => ({ projectId, ...obj }));
  return { titles, buyers };
}
const mapDataset = (dataset: Record<string, BUYER_TYPE>, colsBuyer: COL_NAME_TYPE_FLD[], colsSupplier: COL_NAME_TYPE_FLD[]) => {
  const keys = Object.keys(dataset);
  return keys.map(key => mapRowDataset(dataset[key], colsBuyer, colsSupplier));
}
const mapRowDataset = (row: BUYER_TYPE, colsBuyer: COL_NAME_TYPE_FLD[], colsSupplier: COL_NAME_TYPE_FLD[]) => {
  const buyer: NexusGenFieldTypes['Buyer'] = mapToDynRecord(row.buyer, colsBuyer);
  const buyerId = buyer.id;
  buyer.suppliers = row.supplier.map(supplier => mapToDynRecord(supplier, colsSupplier))
    .map(obj => ({ buyerId, ...obj }));
  return buyer;
}
const convToValue = (val: string, type: TYPE_COL) => {
  if (type === TYPE_COL.FLOAT) {
    return valueIsFloat(val)[1];
  } else if (type === TYPE_COL.INT) {
    return valueIsInt(val)[1];
  }
  return val;
}
const mapToDynRecord = <A extends { id: string }>(data: string[], titles: COL_NAME_TYPE_FLD[]): A => {
  const row: any = {
    id: uuidv4(),
  };
  data.forEach((cell, idx) => row[titles[idx].field] = convToValue(cell, titles[idx].type));
  return row;
}

const createFldName = (pref: string, n: number): string => {
  return pref + (n < 10 ? '0' : '') + n;
}
const mapColsToTitles = (forBuyer: boolean, cols: COL_NAME_TYPE_FLD[]): NexusGenRootTypes['Title'][] => {
  return cols.map(col => {
    return {
      id: uuidv4(),
      field: col.field,
      label: col.name,
      forBuyer
    }
  })
}
const mapColsName = (cols: COL_NAME_TYPE[]): COL_NAME_TYPE_FLD[] => {
  let cntInt = 0, cntFlt = 0, cntStr = 0;
  return cols.map(col => {
    let field = "";
    switch (col.type) {
      case TYPE_COL.FLOAT:
        field = createFldName('flt', ++cntFlt);
        break;
      case TYPE_COL.INT:
        field = createFldName('int', ++cntInt);
        break;
      case TYPE_COL.STRING:
        field = createFldName('txt', ++cntStr);
        break;
    }
    return { ...col, field }
  })
}
