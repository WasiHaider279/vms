import Swal, { SweetAlertResult } from "sweetalert2";
import { toast } from "react-toastify";

let toastId: any = null;

export const success = (message: string): void => {
  if (!toast.isActive(toastId)) toastId = toast(message, { type: "success" });
};

export const warning = (message: string): void => {
  if (!toast.isActive(toastId)) toastId = toast(message, { type: "warning" });
};

export const failure = (message: string): void => {
  if (!toast.isActive(toastId)) toastId = toast(message, { type: "error" });
};

export const confirmation = (
  message: string = "delete data",
  buttonText: string = "Delete",
  text: string = ""
): Promise<SweetAlertResult> =>
  Swal.fire({
    title: "Are you sure?",
    text: text ? text : `You want to ${message}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#150b70",
    cancelButtonColor: "#d33",
    confirmButtonText: buttonText,
  });
