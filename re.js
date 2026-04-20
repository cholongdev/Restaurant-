// Restaurant Menu JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Add "Add to Cart" buttons to menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        const addButton = document.createElement('button');
        addButton.textContent = 'Add to Cart';
        addButton.className = 'add-to-cart';
        addButton.addEventListener('click', () => addToCart(item));
        item.appendChild(addButton);
    });

    // Create cart display
    const cartDiv = document.createElement('div');
    cartDiv.id = 'cart';
    cartDiv.innerHTML = '<h2>Cart</h2><ul id="cart-items"></ul><p>Total: $<span id="total">0.00</span></p>';
    document.body.appendChild(cartDiv);
});

function addToCart(menuItem) {
    const itemName = menuItem.querySelector('h3').textContent;
    const itemPrice = parseFloat(menuItem.querySelector('.price').textContent.replace('$', ''));

    const cartItems = document.getElementById('cart-items');
    const existingItem = Array.from(cartItems.children).find(li => li.dataset.name === itemName);

    if (existingItem) {
        const quantity = parseInt(existingItem.dataset.quantity) + 1;
        existingItem.dataset.quantity = quantity;
        existingItem.textContent = `${itemName} x${quantity} - $${(itemPrice * quantity).toFixed(2)}`;
    } else {
        const li = document.createElement('li');
        li.dataset.name = itemName;
        li.dataset.quantity = 1;
        li.textContent = `${itemName} x1 - $${itemPrice.toFixed(2)}`;
        cartItems.appendChild(li);
    }

    updateTotal();
}

function updateTotal() {
    const cartItems = document.querySelectorAll('#cart-items li');
    let total = 0;
    cartItems.forEach(item => {
        const price = parseFloat(item.textContent.split(' - $')[1]);
        total += price;
    });
    document.getElementById('total').textContent = total.toFixed(2);
}