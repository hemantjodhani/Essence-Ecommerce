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
}
export default admin_data_visibility;