import { getFirestore, collection, addDoc, onSnapshot } from 'firebase/firestore';
import emailjs from 'emailjs-com';

function order_handler() {
  const db = getFirestore();
  const colRef = collection(db, 'Orders');

  async function sendEmail(toEmail) {
    try {
      await emailjs.send('service_cn4nshk', 'template_zk545qt', {
        to_name: $("input[name='name']").val(),
        to_email: toEmail,
        message: 'Your order has been placed successfully!'
      }, '2yLD13LrwSw51lcx3');
    } catch (error) {
      console.error('Error sending email: ', error);
      alert("Error sending email. Please try again later.");
    }
  }

  $(".final-order-form").submit(async function (e) {
    e.preventDefault();

    try {
      const cartItems = JSON.parse(localStorage.getItem("cartItems"));
      const totalPrice = $(".total-cart-price").text();
      const userEmail = $("input[name='email']").val(); // Get the user's email

      await addDoc(colRef, {
        name: $("input[name='name']").val(),
        email: userEmail,
        phone: $("input[name='phone']").val(),
        address: $("input[name='address']").val(),
        address2: $("input[name='address-2']").val(),
        city: $("input[name='city']").val(),
        pincode: $("input[name='pincode']").val(),
        items: cartItems,
        totalPrice: totalPrice,
        Status: "Order Placed"
      });

      await sendEmail(userEmail);

      $(".final-order-form")[0].reset();
      localStorage.removeItem("cartItems");
      alert("Order placed successfully!");
      window.location.href = "index.html";
    } catch (error) {
      console.error('Error adding order: ', error);
      alert("Error placing order. Please try again later.");
    }
  });

  onSnapshot(colRef, (snapshot) => {
    var orders = [];
    snapshot.docs.forEach((doc) => {
      orders.push({ ...doc.data(), id: doc.id });
    });
    // console.log(orders);
  });
}

export default order_handler;
