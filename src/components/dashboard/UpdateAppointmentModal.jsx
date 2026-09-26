"use client";

import { updateAppointment } from "@/actions/appointments";
import { authClient } from "@/lib/auth-client";
import { Clock, Pencil } from "@gravity-ui/icons";
import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  DatePicker,
  DateField,
  FieldError,
  Calendar,
  TimeField,
  TextArea,
  toast,
} from "@heroui/react";
import {
  getLocalTimeZone,
  parseDate,
  parseTime,
  today,
} from "@internationalized/date";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UpdateAppointmentModal({ appointment }) {
  const { data: userData } = authClient.useSession();
  const router = useRouter();
  const currentDate = today(getLocalTimeZone());

  const patient = userData?.user;

  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(
    appointment.date ? parseDate(appointment.date) : null,
  );
  const [time, setTime] = useState(
    appointment.time ? parseTime(appointment.time) : null,
  );

  const isInvalid = date != null && date.compare(currentDate) < 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const appointmentData = {
      phone: formData.get("phone"),
      date: formData.get("date"),
      time: formData.get("time"),
      reason: formData.get("reason"),
    };

    try {
      await updateAppointment(appointment._id, appointmentData);

      setIsOpen(false);
      router.refresh();

      toast.success("Appointment updated successfully");
    } catch (error) {
      toast.danger(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button variant="secondary" onPress={() => setIsOpen(true)}>
        <Pencil className="size-4" />
        Update
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-lg">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Clock className="size-5" />
              </Modal.Icon>

              <Modal.Heading>Update Appointment</Modal.Heading>

              <p className="mt-1.5 text-sm leading-5 text-muted">
                Change form details to update your appointment.
              </p>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  {/* Doctor */}
                  <TextField className="w-full" type="text" variant="secondary">
                    <Label>Doctor Name</Label>
                    <Input value={appointment.doctor?.name ?? ""} readOnly />
                  </TextField>

                  {/* Patient */}
                  <TextField className="w-full" type="text" variant="secondary">
                    <Label>Patient Name</Label>
                    <Input value={patient?.name ?? ""} readOnly />
                  </TextField>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    {/* Gender */}
                    <TextField
                      className="w-full"
                      type="text"
                      variant="secondary"
                    >
                      <Label>Gender</Label>

                      <Input
                        value={
                          appointment.gender
                            ? appointment.gender.charAt(0).toUpperCase() +
                              appointment.gender.slice(1)
                            : ""
                        }
                        readOnly
                      />
                    </TextField>

                    {/* Phone */}
                    <TextField
                      isRequired
                      className="flex-2"
                      name="phone"
                      type="tel"
                      variant="secondary"
                      defaultValue={appointment.phone}
                    >
                      <Label>Phone</Label>
                      <Input />
                    </TextField>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    {/* Date */}
                    <DatePicker
                      isRequired
                      className="flex-1"
                      isInvalid={isInvalid}
                      minValue={currentDate}
                      name="date"
                      value={date}
                      onChange={setDate}
                    >
                      <Label>Appointment date</Label>

                      <DateField.Group variant="secondary" fullWidth>
                        <DateField.Input>
                          {(segment) => <DateField.Segment segment={segment} />}
                        </DateField.Input>

                        <DateField.Suffix>
                          <DatePicker.Trigger>
                            <DatePicker.TriggerIndicator />
                          </DatePicker.Trigger>
                        </DateField.Suffix>
                      </DateField.Group>

                      <FieldError>
                        Date must be today or in the future.
                      </FieldError>

                      <DatePicker.Popover>
                        <Calendar aria-label="Appointment date">
                          <Calendar.Header>
                            <Calendar.YearPickerTrigger>
                              <Calendar.YearPickerTriggerHeading />
                              <Calendar.YearPickerTriggerIndicator />
                            </Calendar.YearPickerTrigger>

                            <Calendar.NavButton slot="previous" />
                            <Calendar.NavButton slot="next" />
                          </Calendar.Header>

                          <Calendar.Grid>
                            <Calendar.GridHeader>
                              {(day) => (
                                <Calendar.HeaderCell>{day}</Calendar.HeaderCell>
                              )}
                            </Calendar.GridHeader>

                            <Calendar.GridBody>
                              {(calendarDate) => (
                                <Calendar.Cell date={calendarDate} />
                              )}
                            </Calendar.GridBody>
                          </Calendar.Grid>

                          <Calendar.YearPickerGrid>
                            <Calendar.YearPickerGridBody>
                              {({ year }) => (
                                <Calendar.YearPickerCell year={year} />
                              )}
                            </Calendar.YearPickerGridBody>
                          </Calendar.YearPickerGrid>
                        </Calendar>
                      </DatePicker.Popover>
                    </DatePicker>

                    {/* Time */}
                    <TimeField
                      isRequired
                      className="flex-1"
                      name="time"
                      value={time}
                      onChange={setTime}
                    >
                      <Label>Time</Label>

                      <TimeField.Group variant="secondary">
                        <TimeField.Prefix>
                          <Clock className="size-4 text-muted" />
                        </TimeField.Prefix>

                        <TimeField.Input>
                          {(segment) => <TimeField.Segment segment={segment} />}
                        </TimeField.Input>
                      </TimeField.Group>
                    </TimeField>
                  </div>

                  {/* Reason */}
                  <TextField
                    className="w-full"
                    name="reason"
                    variant="secondary"
                    defaultValue={appointment.reason}
                  >
                    <Label>Reason for visit (Optional)</Label>

                    <TextArea className="w-full" rows={3} />
                  </TextField>

                  <div className="flex justify-end gap-2 pt-5">
                    <Button slot="close" variant="secondary">
                      Cancel
                    </Button>

                    <Button type="submit">Update Appointment</Button>
                  </div>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
