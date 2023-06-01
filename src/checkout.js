function checkout_handler() {
  $(".checkout-btn").click(function() {
    var all_cart_items = $(".item-wrap");
    var cart_items = [];
    all_cart_items.each(function(index, item) {
      var name = $(item).find("span").eq(1).text();
      var price = $(item).find("td").eq(1).text();
      var quantity = $(item).find(".quantity-input").val();

      var cart_item_data = {
        name: name,
        price: price,
        quantity: quantity
      };

      cart_items.push(cart_item_data);
    });

    localStorage.setItem("cartItems", JSON.stringify(cart_items));
    calculate_and_display_total_cart_price(cart_items);
  });

  $(document).ready(function() {
    var cart_items = JSON.parse(localStorage.getItem("cartItems"));
    calculate_and_display_total_cart_price(cart_items);
  });
}

function calculate_and_display_total_cart_price(cart_items) {
  var total_cart_price = 0;

  if (cart_items && cart_items.length > 0) {
    cart_items.forEach(function(item) {
      $(".final-order-table tbody").append(`
        <tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>${item.price}</td>
          <td>$ ${calculate_total(item.price, item.quantity)}</td>
        </tr>
      `);

      total_cart_price += parseFloat(calculate_total(item.price, item.quantity));
    });
  }

  console.log("Total Cart Price:", total_cart_price.toFixed(2));
  $(".total-cart-price").text("Total " + "$ " + total_cart_price.toFixed(2));
}

function calculate_total(price, quantity) {
  var numeric_price = parseFloat(price.replace("$", ""));
  var numeric_quantity = parseInt(quantity);
  var total_price = numeric_price * numeric_quantity;
  return total_price.toFixed(2);
}

export default checkout_handler;
