import Swal from "sweetalert2"

export const alertSucces = async (message) => {
    return Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
    })
}

export const alertError = async (message) => {
    return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
    })
}

export const alertConfirm = async (message) => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: message,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',   
        confirmButtonText: 'Yes, delete it!'
    })
    return result.isConfirmed;
}