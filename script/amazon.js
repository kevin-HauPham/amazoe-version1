import { cart, addToCart } from "../data/cart.js";
import {products} from "../data/products.js"
//create variable HTML to store creating html elements
// tofixed method will turn number in to string, when we wat to show how many decimal : example number.tofixed (2) will show 2 deciamls and convert it to string
let productsHTML = '';

products.forEach((product) => {
    productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image" src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${(product.priceCents / 100).toFixed(2)} 
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected="" value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
           data-product-name = "${product.name}"
           data-product-id = "${product.id}"
           >
            Add to Cart
          </button>
        </div>`;
});
// using DOM to show html 
document.querySelector('.js-products-grid').innerHTML = productsHTML;   


function calculateQuantity(){
    // calculate total order item from cart
    let cartQuantity = 0;
            cart.forEach((item) => {
                cartQuantity += item.quantity;
            })
            document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}
// adding item to cart when user click add to cart
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
        // use data attribute when to store data to a specific element
        const newProductName = button.dataset.productName;
        const newProductId = button.dataset.productId;
        addToCart(newProductName,newProductId);
        console.log(cart);
        calculateQuantity();  
    });
});
