import {
  appendIdToList,
  deleteItemFromList,
  updateCurrentDataLst,
} from '../src/Utils/constants';

jest.mock('uuid', () => ({v4: () => 'hjhj87878'}));

describe('update current data state', () => {
  it('updating with 1 new items', () => {
    const response = updateCurrentDataLst(
      [
        {id: 1, name: 'data'},
        {id: 2, name: 'data2'},
        {id: 3, name: 'data3'},
        {id: 4, name: 'data4'},
        {id: 5, name: 'data5'},
        {id: 6, name: 'data6'},
        {id: 7, name: 'data7'},
      ],
      [{id: 11, name: 'data11'}],
    );
    expect(response).toStrictEqual([
      {id: 11, name: 'data11'},
      {id: 2, name: 'data2'},
      {id: 3, name: 'data3'},
      {id: 4, name: 'data4'},
      {id: 5, name: 'data5'},
      {id: 6, name: 'data6'},
      {id: 7, name: 'data7'},
    ]);
  });

  it('updating with 3 new item', () => {
    const response = updateCurrentDataLst(
      [
        {id: 1, name: 'data'},
        {id: 2, name: 'data2'},
        {id: 3, name: 'data3'},
        {id: 4, name: 'data4'},
        {id: 5, name: 'data5'},
        {id: 6, name: 'data6'},
        {id: 7, name: 'data7'},
      ],
      [
        {id: 11, name: 'data11'},
        {id: 12, name: 'data12'},
        {id: 13, name: 'data13'},
      ],
    );
    expect(response).toStrictEqual([
      {id: 11, name: 'data11'},
      {id: 12, name: 'data12'},
      {id: 13, name: 'data13'},
      {id: 4, name: 'data4'},
      {id: 5, name: 'data5'},
      {id: 6, name: 'data6'},
      {id: 7, name: 'data7'},
    ]);
  });

  it('updating with 0  new item', () => {
    const response = updateCurrentDataLst(
      [
        {id: 1, name: 'data'},
        {id: 2, name: 'data2'},
        {id: 3, name: 'data3'},
        {id: 4, name: 'data4'},
        {id: 5, name: 'data5'},
        {id: 6, name: 'data6'},
        {id: 7, name: 'data7'},
      ],
      [],
    );
    expect(response).toStrictEqual([
      {id: 1, name: 'data'},
      {id: 2, name: 'data2'},
      {id: 3, name: 'data3'},
      {id: 4, name: 'data4'},
      {id: 5, name: 'data5'},
      {id: 6, name: 'data6'},
      {id: 7, name: 'data7'},
    ]);
  });
});

describe('add unique id and isPiined falg to list', () => {
  it('for list with 3 items', () => {
    const response = appendIdToList([
      {name: 'name1'},
      {name: 'name2'},
      {name: 'name3'},
    ]);
    expect(response).toStrictEqual([
      {name: 'name1', isPinned: false, id: 'hjhj87878'},
      {name: 'name2', isPinned: false, id: 'hjhj87878'},
      {name: 'name3', isPinned: false, id: 'hjhj87878'},
    ]);
  });
});

describe('deleting item from the list', () => {
  it('delete item from list', () => {
    const response = deleteItemFromList(1, [
      {id: 1, name: 'name1'},
      {id: 2, name: 'name2'},
    ]);
    expect(response).toStrictEqual([{id: 2, name: 'name2'}]);
  });

  it('id does not match with the items', () => {
    const response = deleteItemFromList(10, [
      {id: 1, name: 'name1'},
      {id: 2, name: 'name2'},
    ]);

    expect(response).toStrictEqual([
      {id: 1, name: 'name1'},
      {id: 2, name: 'name2'},
    ]);
  });
});
