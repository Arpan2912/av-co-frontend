import swal from 'sweetalert';

export default class ModalService {

  static openAlert(title, msg, suceess) {
    // swal(title, msg, suceess);
    swal({
      title: title,
      text: msg,
      icon: suceess,
      dangerMode: suceess === 'success' ? false : true,
      button: {
        text: "OK",
        value: false,
        visible: false,
        className: "",
        closeModal: true,
      }
    })
  }

}