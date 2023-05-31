import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

function order_table() {
  const db = getFirestore();
  const colRef = collection(db, 'Orders');

  const tableBody = $('#order-table-body');
  tableBody.empty();

  onSnapshot(colRef, (snapshot) => {
    let tableHtml = '';

    snapshot.docs.forEach((doc, index) => {
      const orderData = doc.data();
      const { name, email, phone, address, address2, city, pincode, items, totalPrice, Status } = orderData; // Use "Status" instead of "status"
      const orderId = doc.id;

      const rowHtml = `
        <tr>
          <td>${name}</td>
          <td>${email}</td>
          <td>${phone}</td>
          <td>${address}</td>
          <td>${address2}</td>
          <td>${city}</td>
          <td>${pincode}</td>
          <td>
            ${Array.isArray(items)
              ? items
                  .map((item) => `${item.name} (${item.quantity}) - ${item.price}`)
                  .join('<br>')
              : ''}
          </td>
          <td>${totalPrice}</td>
          <td>
          <label for="status">Set Status</label>
          <select data-title="${orderId}" name="status" class="status-drop-down" required>
              <option value="Order Confirmed">Order Confirmed</option>
              <option value="In transit">In transit</option>
              <option value="Shipped">Shipped</option>
              <option value="Out of delivery">Out of delivery</option>
              <option value="delivered">Out of delivery</option>
              <option value="Cancel">Cancel</option>
          </select>
          </td>         </tr>
      `;

      tableHtml += rowHtml;
    });

    tableBody.html(tableHtml);
  });
}

export default order_table;
