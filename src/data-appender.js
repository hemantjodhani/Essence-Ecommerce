import { getFirestore, collection, onSnapshot} from 'firebase/firestore';
function data_appender(){
    const db = getFirestore();
    var Products = [];
    const colRef = collection(db, 'Products');
    
    onSnapshot(colRef, (snapshot) => {
    snapshot.docs.forEach((product) => {
      Products.push({ ...product.data(), id: product.id });
    });
    //  console.log(Products);

     Products.forEach( product => {
        $(".all-products").append(`
            <div class="product" product-data="${product.id}">
                <img  src="${product.Image_URL}">
                <div class="cart-container">
                <button class="cart-btn" >Add to cart</button>
                </div>
                <div class="product-details">
                    <p class="product-type">topshop</p>
                    <p class="product-name">${product.Product_Name}</p>
                    <P class="product-price">$ ${product.Price}</P>
                </div>
            </div>
    `)

    } );

});
}
export default data_appender;