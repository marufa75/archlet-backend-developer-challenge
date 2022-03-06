import { expect } from 'chai';
import { RowValues, Workbook, Worksheet } from 'exceljs';
import Sinon from 'sinon';
import { BidExcel } from '../../src/bid/bid.excel.service';


describe('bid/bid excel service tests', () => {
  it('elaboratePosSupplier', () => {
    const value = BidExcel.elaboratePosSupplier(['a', 'A', 'a', 'b']);
    expect(value).to.equal(3);
  });
  it('elaborateColumns', () => {
    const value = BidExcel.elaborateColumns(3, ['a', 'b', 'c', 'd', 'e']);
    expect(value.colsBuyer).to.eql(['a', 'b', 'c']);
    expect(value.colsSupplier).to.eql(['d', 'e']);
  });

  const bidData: string[][] = [
    ['buy', 'buy', 'sup'],
    ['a', 'b', 's'],
    ['a1', '1', 's1'],
    ['a2', '2', 's1'],
    ['a1', '1', 's2'],
  ];

  it('calculateDataset', () => {
    const value = BidExcel.calculateDataset(bidData.slice(2), 2);
    const keys = Object.keys(value);
    expect(keys.length).to.equal(2);
    const key1 = keys.find(el => el.startsWith('a1'));
    const key2 = keys.find(el => el.startsWith('a2'));
    expect(!!key1).to.be.true;
    expect(!!key2).to.be.true;
    const el1 = value[key1!];
    const el2 = value[key2!];
    expect(el1.buyer).to.be.eql(['a1', '1']);
    expect(el1.supplier.length).to.be.equals(2);
    expect(el2.supplier.length).to.be.equals(1);
  });
  it('findAndSplitCols', () => {

    const bidDataNeedSplit: string[][] = [
      ['buy', 'buy', 'sup'],
      ['a', 'b', 's'],
      ['a1', '1 a', 's1'],
      ['a2', '2', 's1'],
      ['a1', '1 b', 's2'],
    ];

    BidExcel.findAndSplitCols(bidDataNeedSplit);

    expect(bidDataNeedSplit[0].length).to.equal(4);
    expect(bidDataNeedSplit[1][1]).to.equal('b extra');
    expect(bidDataNeedSplit[2][1]).to.equal('1');

  });


  it('BidExcel', () => {
    const worksheet = { getSheetValues: () => [] as RowValues[] } as Worksheet;
    Sinon.stub(BidExcel, 'toCellsValues').callsFake(() => bidData);
    const bid = new BidExcel(worksheet);
    const dataset = bid.dataset;
    const keys = Object.keys(dataset);
    expect(keys.length).to.equal(2);
    expect(bid.colsBuyer.map(el => el.name)).to.be.eql(['a', 'b']);
    expect(bid.colsSupplier.map(el => el.name)).to.be.eql(['s']);
  });
});


