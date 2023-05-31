function quantity_handler() {

  $(document).on('change', '.qauntity-input', function() {
    var quantity = $(this).val();

    if ($(this).val() === quantity) {
      $(".quantity-update-btn").prop("disabled", false);
    } else {
      $(".quantity-update-btn").prop("disabled", true);
    }
  });

  $(".quantity-update-btn").click(function() {
    var all_cart_items = $("tr");
    var updatedCartItems = [];
    var totalCartPrice = 0;

    all_cart_items.each(function(index, item) {
      var quantityInput = $(item).find('.qauntity-input');
      var quantity = parseInt(quantityInput.val(), 10);

      if (!isNaN(quantity)) {
        var price = parseFloat($(item).find('td:nth-child(2)').text().replace('$', '').trim());
        var totalPrice = quantity * price;

        var updatedItem = {
          quantity: quantity,
          price: price,
          totalPrice: totalPrice
        };

        updatedCartItems.push(updatedItem);

        quantityInput.val(quantity);
        $(item).find('td:nth-child(4)').text('$ ' + totalPrice.toFixed(2));

        totalCartPrice += totalPrice;
      }
    });

    console.log("Updated Cart Items:", updatedCartItems);
    $(".total-cart-value").text("Total price"+ totalCartPrice)
  });

}

export default quantity_handler;
