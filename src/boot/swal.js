import Swal from 'sweetalert2'

export default async ({ Vue }) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000
  })

  Vue.prototype.$toast = Toast
}
