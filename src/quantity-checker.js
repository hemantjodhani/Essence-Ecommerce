import { getFirestore, doc, getDoc } from 'firebase/firestore';
import get_user_id from './anonymous-login';

function quantity_handler() {
  $(document).on('change', '.quantity-input', function() {
    var quantity = $(this).val();

    if ($(this).val() === quantity) {
      $(".quantity-update-btn").prop("disabled", false);
    } else {
      $(".quantity-update-btn").prop("disabled", true);
    }
  });

  $(".quantity-update-btn").click(async function() {
    var all_cart_items = $("tr");
    var updatedCartItems = [];
    var totalCartPrice = 0;
    var totalQuantity = 0;

    all_cart_items.each(function(index, item) {
      var quantityInput = $(item).find('.quantity-input');
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
        totalQuantity += quantity;
      }
    });

    $(".total-cart-value").text("Total price: $" + totalCartPrice.toFixed(2));
    $(".checkout span").text(totalQuantity);
  });

  $(document).ready(async function() {
    const user_id = await get_user_id();
    const db = getFirestore();
    const docRef = doc(db, 'Users', user_id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();

      if (userData && userData.products) {
        userData.products.forEach(function(product, index) {
          var quantityInput = $("tr:eq(" + index + ")").find('.quantity-input');
          quantityInput.val(product.quantity_);

          var price = parseFloat($("tr:eq(" + index + ")").find('td:nth-child(2)').text().replace('$', '').trim());
          var totalPrice = product.quantity_ * price;
          $("tr:eq(" + index + ")").find('td:nth-child(4)').text('$ ' + totalPrice.toFixed(2));
        });

        var totalCartPrice = userData.products.reduce(function(acc, product) {
          var price = parseFloat(product.Price.replace('$', ''));
          return acc + product.quantity_ * price;
        }, 0);

        var totalQuantity = userData.products.reduce(function(acc, product) {
          return acc + product.quantity_;
        }, 0);

        $(".total-cart-value").text("Total price: $" + totalCartPrice.toFixed(2));
        $(".checkout span").text(totalQuantity);
      }
    }
  });
}

export default quantity_handler;
