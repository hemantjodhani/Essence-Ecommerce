function admin_data_visibility(){
    $(".add-product-nagigation").click(function(){
        
        $(".add-product-form-wrap").show()
    });
    $(".add-cancelation-button").click(function(){

        $(".add-product-form-wrap").hide()
    });
    $(".add-product-form").submit(function(){

        alert("product added successfully");
        $(".add-product-form-wrap").hide()
    });
    $(".products-anchor").click(function(){

        $(this).css("background" , "blue")
        $(".products-wrap").show()
        $(".order-table").hide()
        $(".orders-anchor").css("background" , "none")
    });
    $(".orders-anchor").click(function(){

        $(this).css("background" , "blue")
        $(".order-table").show()
        $(".products-wrap").hide()
        $(".products-anchor").css("background" , "none")
    });
}
export default admin_data_visibility;