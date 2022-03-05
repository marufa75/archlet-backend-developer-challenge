import { expect } from 'chai';
import { calcType, calcTypeArr, TYPE_COL, valueClean, valueForKey, valueIsFloat, valueIsInt } from "../../src/util/parse";

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
     ['','test','34d 34', '12.3'].forEach(value => {
      const [isInt] = valueIsInt(value);
      expect(isInt).to.be.false; 
     });
    
     const [isInt, v] = valueIsInt("12");
     expect(isInt).to.be.true; 
     expect(v).to.equal(12); 
  });

  it('valueIsFloat', () => { 
    ['','test','34d 34', '12'].forEach(value => {
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
    [ ['','12', ''], TYPE_COL.INT],
    [ ['','12', '12,23' ,'11'], TYPE_COL.FLOAT],
   ].forEach(([value, type]) => {
   const v = calcTypeArr(value as string[]);
   expect(v).to.equal(type); 
  });
}); 
});


