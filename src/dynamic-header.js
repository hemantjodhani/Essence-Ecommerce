
function header_generator(){
    
    $(".checkout").mouseenter(function () {
        $(".cart-section").show()
      });
      $(".cart-section").mouseleave(function () {
        $(".cart-section").hide()
      });
    $.get("header.html")
        
        .done( function ( data ) {
            $(".index-header").html(data)         
        })
        .fail(function(){
            alert("Sorry, couldn't load the data.")
        })

}
export default header_generator;