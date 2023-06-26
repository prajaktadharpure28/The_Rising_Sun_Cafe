import swal from 'sweetalert2';
import { myBookedTable } from './bookedTable';

export async function tableBookingRequired() {
  if (!myBookedTable) {
    await swal.fire({
      title: 'Table Booking Required',
      text: 'Please Book the Table',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    });
    window.location.href = '/tables';
  }
}
