import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import get_user_id from './anonymous-login';

async function delete_handler() {
  const db = getFirestore();

  $(document).on("click", ".windows-wala-button", async function() {
    const user_id = await get_user_id();
    const product = $(this).closest(".cart-item");
    const name = product.find(".product-name span").text();
    const image = product.find("img").attr("src");

    const docRef = doc(db, 'Users', user_id);

    try {
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const updatedProducts = userData.products.filter((productData) => {
          if (productData.Product_Name !== name && productData.Image !== image) {
            return true;
          } 
          else {
            return false;
          }
        });

        await updateDoc(docRef, { products: updatedProducts });
        product.remove();
      }
    } catch (error) {
      console.error(error);
    }
  });
}

export default delete_handler;