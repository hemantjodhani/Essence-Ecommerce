import { getFirestore, doc, updateDoc, arrayUnion, onSnapshot, getDoc } from 'firebase/firestore';
import get_user_id from './anonymous-login';

async function cart_data_appender() {
  const db = getFirestore();
  const user_id = await get_user_id();

  $(document).on("click", ".cart-btn", async function (e) {
    e.preventDefault();
    const product = $(this).parent().parent();
    const image = product.find("img").attr("src");
    const name = product.find(".product-name").text();
    const price = product.find(".product-price").text();
    const product_id = product.attr("product-data");

    const docRef = doc(db, 'Users', user_id);

    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        var cartProducts = userData.products;

        if (!cartProducts) {
          cartProducts = []; 
        }

        const existingProduct = cartProducts.find(function (p) {
          return p.product_id == product_id;
        });

        if (existingProduct) {
          existingProduct.quantity_ += 1;
          await updateDoc(docRef, { products: cartProducts });
        } else {
          const newProduct = {
            Product_Name: name,
            Price: price,
            Image: image,
            product_id: product_id,
            quantity_: 1
          };
          await updateDoc(docRef, { products: arrayUnion(newProduct) });
        }
      }
    } catch (error) {
      console.error(error);
    }
  });

  const docRef = doc(db, 'Users', user_id);

  onSnapshot(docRef, function (snapshot) {
    const data = snapshot.data();
    const cart_section = $(".cart-section");
    cart_section.empty();

    const checkout_items = $(".cart-page table");
    checkout_items.empty();

    if (data.products === undefined) {
      return;
    }

    data.products.forEach(function (product) {
      cart_section.prepend(`
        <div class="cart-item">
          <div class="img-span-wrap">
            <span class="windows-wala-button">X</span>
            <img width="50px" src="${product.Image}">
          </div>
          <p class="product-name"><span>${product.quantity_} x </span>${product.Product_Name}</p>
          <p class="product-price">${product.Price}</p>
        </div>
      `);

      checkout_items.append(`
        <tr class="item-wrap">
          <td>
            <span class="windows-wala-button cart-delete-btn">X</span>
            <img width="50px" src="${product.Image}">
            <span>${product.Product_Name}</span>
          </td>
          <td>${product.Price}</td>
          <td><input min="1" max="10" class="quantity-input" style="margin: 0 auto; width: 80px;" type="number" "></td>
          <td>${product.Price}</td>
        </tr>
      `);
    });

    var total_price = 0;
    var total_quantity = 0;
    data.products.forEach(function (product) {
      const price = parseFloat(product.Price.replace('$', ''));
      total_price += price;
      total_quantity += product.quantity_; 
    });


    $(".total-cart-value").text("Total price: $" + total_price);
    $(".checkout span").text(total_quantity);
    $(".quantity-input").val(1);
  });
}

export default cart_data_appender;
