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
            <div class="product">
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

    return;

     for(var i = 0 ; i <= Products.length-1 ; i++){
         console.log(i)
         console.log(Products[i].Image_URL)
            $(".all-products").append(`
                                            <div class="product">
                                            <img  src="${Products[i].Image_URL}">
                                            <div class="cart-container">
                                            <button>Add to cart</button>
                                            </div>
                                            <div class="product-details">
                                                <p class="product-type">topshop</p>
                                                <p class="product-name">${Products[i].Product_Name}</p>
                                                <P class="product-price">$ ${Products[i].Price}</P>
                                            </div>
                                            </div>
                                        `)
    
        }
});

}
export default data_appender;

