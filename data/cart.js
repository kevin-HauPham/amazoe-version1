
export let cart = JSON.parse(localStorage.getItem('cart'));
if(!cart){
    cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: 'option1',
    },
    {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 2,
        deliveryOptionId: 'option2',
    },
    ]
}


// use localStorage to save data into local because when save data in variavle it will be refresh after loading page
// function saveStorage(){
//     localStorage.setItem('love', JSON.stringify(cart));
// }

function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(newProductName,newProductId){
        // check if the item already in the cart just increse quantity not duplicate the item in the cart
        // create a variable to store if new item is already in the cart
        let matchingItem;
        cart.forEach((cartItem) => {
            if(newProductId === cartItem.productId){
                matchingItem = cartItem;
            }})
            if(matchingItem){
                matchingItem.quantity +=1;
            }else{
                cart.push({
                    productId: newProductId,
                    quantity : 1,
                    deliveryOptionId: 'option1',
                });
            }
            saveToStorage();
        }

export function removeFromCart(productIdToRemove){
            let newCart = [];
            cart.forEach((cartItem) => {
                if(cartItem.productId !== productIdToRemove){
                    newCart.push(cartItem);
                }
            })
            cart = newCart;
            saveToStorage();
        }
