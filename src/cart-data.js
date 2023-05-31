import { getFirestore, doc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import get_user_id from './anonymous-login';

async function cart_data_appender() {

  const db = getFirestore();
  // let pageReloaded = false;
  $(document).on("click", ".cart-btn", async function (e) {
    e.preventDefault();
    var product = $(this).parent().parent();
    var image = product.find("img").attr("src");
    var name = product.find(".product-name").text();
    var price = product.find(".product-price").text();

    var user_id = await get_user_id()

    const docRef = doc(db, 'Users', user_id);

    try {
      await updateDoc(docRef, {
        products: arrayUnion({
          Product_Name: name,
          Price: price,
          Image: image
        })
      });


    } catch (error) {
      console.error(error);
    }
  });
  const user_id = await get_user_id('user_id');
  const docRef = doc(db, 'Users', user_id);

  onSnapshot(docRef, (snapshot) => {
    const data = snapshot.data();
    const cart_section = $(".cart-section");
    cart_section.empty();

    const checkout_items = $(".cart-page table");
    // console.log(checkout_items)
    // checkout_items.empty();
    var reset_items = $("item-wrap")
    reset_items.remove()
    if (data.products == undefined) {
      return
    }
    data.products.forEach((product) => {
      cart_section.prepend(`
      <div class="cart-item">
        <div class="img-span-wrap">
        <span class="windows-wala-button">X</span>
        <img width="50px" src="${product.Image}">
        </div>
        <p class="product-name"><span>1X</span>${product.Product_Name}</p>
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
        <td><input min="1" max="10" class="qauntity-input" style="margin: 0 auto; width: 80px;" type="number"></td>
        <td>${product.Price}</td>
      </tr>  
      `);
    });

	var totalPrice = 0;
    data.products.forEach((product) => {
      const price = parseFloat(product.Price.replace('$', ''));
      totalPrice += price;
    });

	$(".total-cart-value").text("Total price"+ totalPrice)


    $(".checkout span").text(data.products.length)
    $(".qauntity-input").val(1)
  });
}

export default cart_data_appender;
