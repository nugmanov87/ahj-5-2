import Goods from '../js/Goods.js';

test('add product', () => {
  const goods = new Goods();
  goods.addGood('iPhone', 30000);
  const received = goods.arrGoods[0].name;
  const expected = 'iPhone';
  expect(received).toBe(expected);
});
