export function showSuccessToast(msg) {
    Toastify({ text: msg, duration: 3000, gravity: "top", position: "right" }).showToast();
}
export function showErrorToast(msg) {
    Toastify({ text: msg, duration: 3000, gravity: "top", position: "right",
        style: { background: "linear-gradient(to right, #8b0000, #FFCCCB)" } }).showToast();    
}