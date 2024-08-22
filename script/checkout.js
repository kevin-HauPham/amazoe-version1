import { cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurency } from "../util/currency.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import deliveryOption from "../data/deliveryOptions.js";
import deliveryOptions from "../data/deliveryOptions.js";

let cartSummaryHTML = "";
cart.forEach((cartItem) => {
  const cartItemId = cartItem.productId;
  let productInCart;
  products.forEach((producItem) => {
    if (producItem.id === cartItemId) {
      productInCart = producItem;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.deliveryOptionId === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryTimeInDays, "days");
  const dateString = deliveryDate.format("dddd,MMMM D");

  cartSummaryHTML += `  
    <div class="cart-item-container js-cart-item-container-${productInCart.id}">
            <div class="delivery-date">
              ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image" src="${productInCart.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${productInCart.name}
                </div>
                <div class="product-price">
                  ${formatCurency(productInCart.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${
                      cartItem.quantity
                    }</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id = ${
                    productInCart.id
                  }>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionHTML(productInCart, cartItem)}
              </div>
            </div>
          </div>
        `;
});

function deliveryOptionHTML(productInCart, cartItem) {
  let html = "";
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryTimeInDays, "days");
    const dateString = deliveryDate.format("dddd,MMMM D");
    const priceString =
      deliveryOption.priceCents === 0
        ? "Free"
        : `${formatCurency(deliveryOption.priceCents)}-`;

    const isCheck =
      deliveryOption.deliveryOptionId === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option">
        <input type="radio" ${
          isCheck ? "checked" : ""
        } class="delivery-option-input" name="${productInCart.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString}
          </div>
        </div>
      </div>
    `;
  });
  return html;
}

document.querySelector(".js-cart-summary").innerHTML = cartSummaryHTML;

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    // using dataset to choose which item to remove by ID
    const productIdToRemove = link.dataset.productId;
    // remove Item is chosen by ID from cart
    removeFromCart(productIdToRemove);
    // create a "class" in HTML and using remove() method to remove HTML element
    const container = document.querySelector(
      `.js-cart-item-container-${productIdToRemove}`
    );
    container.remove();
  });
});
