import {
    getAuth ,signOut 
  }from 'firebase/auth';
function logout_handler(){
    const auth = getAuth()
    const logoutButton = document.querySelector('.logout-btn')
    if( !logoutButton ){
        return;
    }
    logoutButton.addEventListener('click' , (e) => {
    e.preventDefault()
    signOut(auth)
    .then(() =>{
        alert("user signed out")
        $(".login").show()
        $(".admin-content").hide()
    })
    .catch((err) =>{
        alert(err.message)
    })
})
}

export default logout_handler;