import {
getAuth , signInWithEmailAndPassword 
}from 'firebase/auth' ;

function handle_login_form() {
    const auth = getAuth()
    const loginForm = document.querySelector('.login')
    
    if( !loginForm ){
        return;
    }

    loginForm.addEventListener('submit' , (e) =>{
        e.preventDefault()
        const email = loginForm.email.value
        const password = loginForm.password.value
        $(".loading-wheel").css("display" , "flex")
    
        signInWithEmailAndPassword(auth , email , password)
        .then((cred) =>{
            $(".login").hide()
            $(".loading-wheel").hide()
            $(".admin-content").show()
            loginForm.reset()
        })
        .catch((err) =>{
            alert(err.message)
            $(".loading-wheel").hide()
        })
    });    
}

export default handle_login_form;