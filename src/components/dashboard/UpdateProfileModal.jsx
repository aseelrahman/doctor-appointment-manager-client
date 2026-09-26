"use client";

import { authClient } from "@/lib/auth-client";
import { Pencil } from "@gravity-ui/icons";
import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  toast,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UpdateProfileModal = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    setIsUpdating(true);

    try {
      const { error } = await authClient.updateUser({
        name: formData.get("name"),
        image: formData.get("image"),
      });

      if (error) {
        toast.danger(error.message);
        return;
      }

      setIsOpen(false);
      router.refresh();

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.danger(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button className="w-full" onPress={() => setIsOpen(true)}>
        <Pencil className="size-4" />
        Update Profile
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-lg">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Pencil className="size-5" />
              </Modal.Icon>

              <Modal.Heading>Update Profile</Modal.Heading>

              <p className="mt-1.5 text-sm leading-5 text-muted">
                Update your profile information.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <TextField
                    isRequired
                    name="name"
                    variant="secondary"
                    defaultValue={user.name}
                  >
                    <Label>Name</Label>
                    <Input />
                  </TextField>

                  <TextField
                    name="image"
                    variant="secondary"
                    defaultValue={user.image ?? ""}
                  >
                    <Label>Photo URL</Label>
                    <Input placeholder="https://..." />
                  </TextField>

                  <div className="flex justify-end gap-2 pt-5">
                    <Button
                      slot="close"
                      variant="secondary"
                      isDisabled={isUpdating}
                    >
                      Cancel
                    </Button>

                    <Button type="submit" isDisabled={isUpdating}>
                      {isUpdating ? "Saving..." : "Save"}
                    </Button>
                  </div>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default UpdateProfileModal;
