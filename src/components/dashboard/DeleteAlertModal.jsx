"use client";

import { deleteAppointment } from "@/actions/appointments";
import { AlertDialog, Button, toast } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteAlertModal({ appointmentId }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = async () => {
    try {
      await deleteAppointment(appointmentId);
      setIsOpen(false);
      router.refresh();
      toast.success("Appointment Deleted successfully");
    } catch (error) {
      toast.danger(error.message);
    }
  };

  return (
    <AlertDialog isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button variant="danger" onPress={() => setIsOpen(true)}>
        Delete
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete Appointment permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete appointment and all of its data.
                This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button variant="danger" onPress={handleDelete}>
                Delete Appointment
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
