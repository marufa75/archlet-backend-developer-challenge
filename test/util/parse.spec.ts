import { expect } from 'chai';
import { calcType, calcTypeArr, stringContainFloatOrInt, stringsManyContainFloatOrInt, TYPE_COL, valueClean, valueForKey, valueIsFloat, valueIsInt } from "../../src/util/parse";

describe('util/parse tests', () => {
  it('valueForKey', () => {
    const value = valueForKey("Test Space");
    expect(value).to.equal("testspace");
  });
  it('valueClean', () => {
    const value = valueClean("Test\tSpace\n ");
    expect(value).to.equal("Test Space");
  });
  it('valueIsInt', () => {
    ['', 'test', '34d 34', '12.3'].forEach(value => {
      const [isInt] = valueIsInt(value);
      expect(isInt).to.be.false;
    });

    const [isInt, v] = valueIsInt("12");
    expect(isInt).to.be.true;
    expect(v).to.equal(12);
  });

  it('valueIsFloat', () => {
    ['', 'test', '34d 34', '12'].forEach(value => {
      const [isInt] = valueIsFloat(value);
      expect(isInt).to.be.false;
    });

    const [isInt, v] = valueIsFloat("12,34");
    expect(isInt).to.be.true;
    expect(v).to.equal(12.34);
  });

  it('calcType', () => {
    [
      ['', TYPE_COL.EMPTY],
      ['hi', TYPE_COL.STRING],
      ['12', TYPE_COL.INT],
      ['12,23', TYPE_COL.FLOAT],
      ['12.23', TYPE_COL.FLOAT],
    ].forEach(([value, type]) => {
      const v = calcType(value as string);
      expect(v).to.equal(type);
    });
  });

  it('calcTypeArr', () => {
    [
      [['', null, undefined], TYPE_COL.EMPTY],
      [['12', 'hi'], TYPE_COL.STRING],
      [['', '12', ''], TYPE_COL.INT],
      [['', '12', '12,23', '11'], TYPE_COL.FLOAT],
    ].forEach(([value, type]) => {
      const v = calcTypeArr(value as string[]);
      expect(v, `check  ${v}  ${type}`).to.equal(type);
    });
  });
  it('stringContainFloatOrInt', () => {
    [
      ['test 12 plus 23', '12'],
      ['12.13 test', '12.13'],
      ['test 20', '20'],
      ['', undefined],
      ['test', undefined],
    ].forEach(([value, res]) => {
      const v = stringContainFloatOrInt(value as string);
      expect(v, `check  ${v}  ${res}`).to.equal(res);
    });
  });
  it('stringsManyContainFloatOrInt', () => {
    [
      [['21','12', '13.13'], undefined],
      [['test','12', 'hi'], undefined],
      [['test 20','32', 'hi'], ['20', '32', undefined]],
    ].forEach(([value, res]) => {
      const v = stringsManyContainFloatOrInt(value as unknown as string[]);
      expect(v, `check  ${v}  ${res}`).to.eql(res);
    });
  });
});


