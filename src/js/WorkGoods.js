/* eslint-disable class-methods-use-this */
import Goods from './Goods.js';
import initData from './InitData.js';
import Display from './Display.js';
import Popovers from './Popovers.js';
import ProductDel from './ProductDel.js';

const goods = new Goods();
const display = new Display();
const popup = new Popovers(document.body);
const productDel = new ProductDel();

export default class WorkGoods {
  constructor() {
    this.tableGoods = document.querySelector('tbody');
    this.elAddProduct = document.querySelector('.add-product');
    this.id = -1;
    this.itemIndex = '';
  }

  init() {
    initData(goods);
    display.rendering(goods.arrGoods);
    popup.bindToDOM();
    popup.saveProduct(this.saveProduct.bind(this));
    this.inpText = document.getElementById('inpText');
    this.inpPrise = document.getElementById('inpPrise');
    productDel.init();
    this.eventsGoods();
  }

  eventsGoods() {
    this.tableGoods.addEventListener('click', (e) => {
      const eClass = e.target.classList;
      this.id = Number(e.target.closest('tr').dataset.id);
      // change product
      if (eClass.contains('change-product')) {
        this.itemIndex = this.findProductIndex(this.id);
        this.inpText.value = goods.arrGoods[this.itemIndex].name;
        this.inpPrise.value = goods.arrGoods[this.itemIndex].price;
        popup.showPopup();
      }
      // delete product
      if (eClass.contains('del-product')) {
        productDel.delElement(this.delProduct.bind(this));
      }
    });

    this.elAddProduct.addEventListener('click', () => {
      this.id = -1;
      popup.showPopup();
    });
  }

  delProduct() {
    goods.arrGoods = goods.arrGoods.filter((item) => item.id !== this.id);
    display.rendering(goods.arrGoods);
  }

  saveProduct() {
    if (this.id >= 0) {
      // change
      goods.arrGoods[this.itemIndex].name = this.inpText.value;
      goods.arrGoods[this.itemIndex].price = Number(this.inpPrise.value);
    } else {
      // save new
      goods.addGood(this.inpText.value, Number(this.inpPrise.value));
    }
    display.rendering(goods.arrGoods);
  }

  findProductIndex(id) {
    return goods.arrGoods.findIndex((item) => item.id === id);
  }
}
