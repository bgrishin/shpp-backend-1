let countReviewID = 0;
let countProductID = 0;

const rev1 = new Review(countReviewID++, 'Oleg', '05.05.2021', 'Bad T-Shirt', 2);
const rev2 = new Review(countReviewID++, 'SomeMAN', '01.12.2021', 'NICE TRAINERS', 5);
const rev3 = new Review(countReviewID++, 'vovan333', '07.04.2021', 'So cool', 4);

sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
images = ['image1', 'image2', 'image3'];
reviews = [rev1, rev2, rev3];

let prod1 = new Product(countProductID++, 'Футболка', 'Отличная футболка.', 30, 'Adibas', sizes, 'XL', 100, '01.02.2021', reviews, images);
let prod2 = new Product(countProductID++, 'Штаны', 'Отличные штаны', 40, 'Nike', sizes, 'L', 120, '03.04.2021', reviews, images);
let prod3 = new Product(countProductID++, 'Куртка', 'Отличная куртка!', 100, 'Puma', sizes, 'XXL', 200, '05.05.2021', reviews, images);
let prod4 = new Product(countProductID++, 'Кроссовки', 'Отличные кроссовки', 70, 'Diverse', sizes, 'L', 400, '07.06.2021', reviews, images);

prodArr = [prod1, prod2, prod3, prod4];

//Конструктор продукта со всёми его фунцкиями
function Product(ID, name, description, price, brand, sizes, activeSize, quantity, date, reviews, images) {

  this.ID = ID;
  this.getID = function () {return this.ID}
  this.setID = function (ID) {this.ID = ID}

  this.name = name;
  this.getName = function () {return this.name}
  this.setName = function (name) {this.name = name}

  this.description = description;
  this.getDescription = function () {return this.description}
  this.setDescription = function (description) {this.description = description}

  this.price = price;
  this.getPrice = function () {return this.price}
  this.setPrice = function (price) {this.price = price}

  this.brand = brand;
  this.getBrand = function () {return this.brand}
  this.setBrand = function (brand) {this.brand = brand}

  this.sizes = sizes;
  this.getSizes = function () {return this.sizes}
  this.addSize = function (size) {this.sizes.push(size)}

  this.activeSize = activeSize;
  this.getActiveSize = function () {return this.activeSize}
  this.setActiveSize = function (activeSize) {this.activeSize = activeSize}

  this.quantity = quantity;
  this.getQuantity = function () {return this.quantity}
  this.setQuantity = function (quantity) {this.quantity = quantity}

  this.date = date;
  this.getDate = function () {return this.date}
  this.setDate = function (date) {this.date = date}

  this.reviews = reviews;
  this.getReviewByID = function (idr) {return this.reviews[idr]}
  this.addReview = function (review) {
    this.reviews.push(review);
  }
  this.delReview = function (idr) {
    this.reviews.splice(idr, 1);
  }
  this.getAvarageRating = function () {
    let rateArr = []
    this.reviews.forEach(item => {
      rateArr.push(item.rating);
    })

    let avarageRating = rateArr.reduce((a, b) => a + b) / rateArr.length;

    return avarageRating;
  }

  this.images = images;
  this.getImage = function (idm) {
    if(idm == undefined || idm == "") {
      return this.images[0];
    }else{
      return this.images[idm];
    }
  }
  this.addImage = function(image) {this.images.push(image)}
  this.delImage = function(idm) {this.images.splice(idm, 1)}
}

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

//Тестировал через консоль, все работает.
