function header_generator(){
    $(document).ready(function(){

        $.get("header.html")
        
        .done( function ( data ) {
            $(".index-header").html(data)         
        })
        .fail(function(){
            alert("Sorry, couldn't load the data.")
        })
        $(document).on("mouseenter", ".checkout", function () {
            $(".cart-section").show()
        });
  
        $(".cart-section").mouseleave(function () {
            $(".cart-section").hide()
        });
    });

    

}
export default header_generator;