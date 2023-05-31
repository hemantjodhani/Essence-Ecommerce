import { getFirestore, collection, onSnapshot, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function item_generator() {
  const db = getFirestore();
  const colRef = collection(db, 'Products');
  const storage = getStorage();

  onSnapshot(colRef, (snapshot) => {
    var Products = [];
    snapshot.docs.forEach((product) => {
      Products.push({ ...product.data(), id: product.id });
    });
    console.log(Products[0]);
    displayProductsTable(Products);
  });

  const add_product_Form = $('.add-product-form');
  if (!add_product_Form.length) {
    return;
  }
  add_product_Form.on('submit', (e) => {
    e.preventDefault();

    const fileInput = add_product_Form.find('input[type="file"]');
    const file = fileInput[0].files[0];

    const fileName = Date.now() + '-' + file.name;
    const storageRef = ref(storage, 'images/' + fileName);

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        alert('Product added successfully');
        return getDownloadURL(storageRef);
      })
      .then((downloadURL) => {
        return addDoc(colRef, {
          Product_Name: add_product_Form.find('input[name="name"]').val(),
          Price: add_product_Form.find('input[name="price"]').val(),
          Image_URL: downloadURL,
        });
      })
      .then(() => {
        add_product_Form[0].reset();
      })
      .catch((error) => {
        console.log('Error uploading image:', error);
      });
  });
}

function displayProductsTable(products) {
  const productsTable = $('#products-table');
  productsTable.empty();

  products.forEach((product) => {
    const { id, Product_Name, Price, Image_URL } = product;

    const row = $('<tr></tr>');

    const idCell = $('<td></td>').text(id);
    row.append(idCell);

    const nameCell = $('<td></td>').text(Product_Name);
    row.append(nameCell);

    const imageCell = $('<td></td>');
    const image = $('<img>').attr('src', Image_URL).attr('alt', Product_Name).css('width', '50px');
    imageCell.append(image);
    row.append(imageCell);

    const priceCell = $('<td></td>').text(Price);
    row.append(priceCell);

    productsTable.append(row);
  });
}

export default item_generator;
