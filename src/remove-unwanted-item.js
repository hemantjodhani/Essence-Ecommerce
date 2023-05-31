import { getFirestore, collection, deleteDoc, doc } from 'firebase/firestore';

function delete_product() {
  const db = getFirestore();
  const colRef = collection(db, 'Products');

  $(".delete-product-form").submit(function(event) {
    event.preventDefault();

    var id = $(".id-input").val();
    deleteProduct(id);

    $(".id-input").val('');
  });

  async function deleteProduct(productId) {
    try {
      const productDocRef = doc(colRef, productId);
      await deleteDoc(productDocRef);

      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product: ' + error.message);
    }
  }
}

export default delete_product;
