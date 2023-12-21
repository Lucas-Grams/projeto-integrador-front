// pdf-utils.ts
import Swal from 'sweetalert2';

export class PdfUtils {

   static openViewer(dataUrl: string): void {
      Swal.fire({
         html: `<object type="application/pdf" data="${dataUrl}" width="100%" height="99%"/>`,
         customClass: 'fullscreen',
         showCloseButton: true,
         showConfirmButton: false
      });
   }

}
