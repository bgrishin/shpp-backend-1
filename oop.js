'use strict'

let countReviewID = 0;
let countProductID = 0;

class AbstractProduct {
  constructor(ID, name, description, price, brand, quantity, date, reviews, images) {
    this.ID = ID;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.quantity = quantity;
    this.date = date;
    this.reviews = reviews;
    this.images = images;
  }
}
//Функции основного класса
Object.assign(AbstractProduct.prototype, {

  getID() {return this.ID},
  setID(ID) {this.ID = ID},

  getName() {return this.name},
  setName(name) {this.name = name},

  getDescription() {return this.description},
  setDescription(description) {this.description = description},

  getPrice() {return this.price},
  setPrice(price) {this.price = price},

  getBrand() {return this.brand},
  setBrand(brand) {this.brand = brand},

  getQuantity() {return this.quantity},
  setQuantity(quantity) {this.quantity = quantity},

  getDate() {return this.date},
  setDate(date) {this.date = date},

  getReviewByID(idr) {return this.reviews[idr]},
  addReview(review) {
    this.reviews.push(review);
  },

  delReview(idr) {
    this.reviews.splice(idr, 1);
  },

  getAvarageRating() {
    let rateArr = []
    this.reviews.forEach(item => {
      rateArr.push(item.rating);
    })

    let avarageRating = rateArr.reduce((a, b) => a + b) / rateArr.length;

    return avarageRating;
  },
  getPriceForQuantity(quantity) {
    return `${quantity * this.price} $`
  },
  getFullInformation() {
    for(let item of Object.keys(this)) {
      console.log("Item " + item + " - " + this[item] + "\n");
    }
  }
})

//Класс електроники
class Electronics extends AbstractProduct {
  constructor(ID, name, description, price, brand, quantity, date, reviews, images, warranty, power) {
    super(ID, name, description, price, brand, quantity, date, reviews, images)
    this.warranty = warranty;
    this.power = power;
  }
}

Object.assign(Electronics.prototype, {
  getWarranty() {return this.warranty;},
  setWarranty(warranty) {this.warranty = warranty;},

  getPower() {return this.power;},
  setPower() {this.power = power;},
})

//Класс одежды
class Clothes extends AbstractProduct {
  constructor(ID, name, description, price, brand, quantity, date, reviews, images, material, color, sizes, activeSize) {
    super(ID, name, description, price, brand, quantity, date, reviews, images)
    this.material = material;
    this.color = color;
  }
}

Object.assign(Clothes.prototype, {
  getMaterial() {return this.material;},
  setMaterial() {this.material = material;},

  getColor() {return this.color;},
  setColor() {this.color = color;},
})

//Конструктор отзыва
function Review(ID, author, date, comment, rating) {
  this.ID = ID;
  this.author = author;
  this.date = date;
  this.comment = comment;
  this.rating = rating;
}

//Поиск продуктов
function searchProducts(products, search) {
  let result = []
  search = search.toLowerCase();
  if (search.indexOf("*") > 0) {
    let temp = search.split("*")
    search = temp[0];
  }
  let i = 0;
  while(i < products.length) {
    if(products[i].name.toLowerCase().indexOf(search) >= 0) {
      result.push(products[i].name);
    }
    if(products[i].description.toLowerCase().indexOf(search) >= 0) {
      result.push(products[i].description);
    }
    i++
  }
  return result;
}

//Сортировка
function sortProducts(products, sortRule) {
  let sortResult = products.sort((a, b) => (a[sortRule] > b[sortRule]) ? 1 : -1)
  return sortResult;
}
//ТЕСТЫ

const rev1 = new Review(countReviewID++, 'Oleg', '05.05.2021', 'Bad T-Shirt', 2);
const rev2 = new Review(countReviewID++, 'SomeMAN', '01.12.2021', 'NICE TRAINERS', 5);
const rev3 = new Review(countReviewID++, 'vovan333', '07.04.2021', 'So cool', 4);

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const images = ['image1', 'image2', 'image3'];
const reviews = [rev1, rev2, rev3];

let prod1 = new Clothes(countProductID++, 'Футболка', 'Отличная футболка.', 30, 'Adibas', 100, '01.02.2021', reviews, images, 'Leather', 'RED');
let prod2 = new Electronics(countProductID++, 'Ноутбук', 'RTX9070', 300000, 'GIGABYTE', 100, '02.07.2021', reviews, images, "3 years", 100);
let prod3 = new Clothes(countProductID++, 'Куртка', 'Отличная куртка!', 100, 'Puma', 200, '05.05.2021', reviews, images, 'Cotton', 'Black');
let prod4 = new Electronics(countProductID++, 'Микроволновка', 'LG1032', 2000, 'LG', 150, '01.12.2021', reviews, images, "5 years", 100);

let products = [prod1, prod2, prod3, prod4]
//Остальные тесты проводились в консоли. Всё работает !)
