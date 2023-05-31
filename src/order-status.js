import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';

async function update_order_status() {
  const db = getFirestore();

  $(document).on("change", ".status-drop-down", async function () {
    var status = $(this).val();
    var orderId = $(this).attr("data-title");

    try {
      const orderRef = doc(db, 'Orders', orderId);
      await updateDoc(orderRef, { Status: status });
      alert('Order status updated successfully!');
    } catch (error) {
      alert('Error updating order status. Please try again later.');
    }
  });

  $(document).ready(async function () {
    var orderId = $(".status-drop-down").attr("data-title");

    try {
      const orderRef = doc(db, 'Orders', orderId);
      const orderSnapshot = await getDoc(orderRef);
      const orderData = orderSnapshot.data();
      const currentStatus = orderData.Status;

      $(".status-drop-down").val(currentStatus).change();
    } catch (error) {
      console.error('Error retrieving order status:', error);
    }
  });
}

export default update_order_status;
