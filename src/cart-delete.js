import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import get_user_id from './anonymous-login';

function cart_delete_handler() {
  $(document).on("click", ".cart-delete-btn", async function() {
    try {
      const user_id = await get_user_id();
      const product = $(this).closest(".item-wrap");

      const image = product.find("img").attr("src");
      const name = product.find("span").eq(1).text();
      const price = product.find("td").eq(1).text();

      const db = getFirestore();
      const docRef = doc(db, 'Users', user_id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const updatedProducts = userData.products.filter((productData) => {
          return productData.Product_Name !== name && productData.Image !== image;
        });

        await updateDoc(docRef, { products: updatedProducts });
        product.remove();
        location.reload()
      }
    } catch (error) {
      console.error(error);
    }
  });
}

export default cart_delete_handler;
