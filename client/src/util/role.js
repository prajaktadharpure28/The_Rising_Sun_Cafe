import swal from 'sweetalert2';

export const isAdmin = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.user.role === 'admin';
};

export const isUser = () => {
    if (!isAdmin()){
        swal.fire({
            title: 'Error',
            text: 'You are not authorized to access this page',
            icon: 'error',
            button: 'OK',
        }).then(() => {
            window.location.href = '/';
        })
    }
};

export const isUserAdmin = () => {
    if (!isAdmin()){
        swal.fire({
            title: 'Error',
            text: 'You are not authorized to access this page',
            icon: 'error',
            button: 'OK',
        }).then(() => {
            window.location.href = '/';
        })
    }
}
