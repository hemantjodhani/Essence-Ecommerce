
function header_generator(){
    // alert()
    $.get("header.html")
        
        .done( function ( data ) {
            // console.log(data)
            $(".whole-web").html(data)         
        })
        .fail(function(){
            alert("Sorry, couldn't load the data.")
        })

}
export default header_generator;