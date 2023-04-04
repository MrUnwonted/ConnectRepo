const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true
})

function success(message){
    Toast.fire({
        icon: 'success',
        title: 'Success',
        text: message
    })
}
function error(message){
    Toast.fire({
        icon: 'error',
        title: message
    })
}

function warning(message){
    Toast.fire({
        icon: 'warning',
        title: message
    })
}
function info(message){
     Toast.fire({
        icon: 'info',
        title: message
    })
}
function question(message){
    Toast.fire({
        icon: 'question',
        title: message
    })

}
