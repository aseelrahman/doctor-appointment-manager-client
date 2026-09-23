"use client";

import { createAppointment } from "@/actions/appointments";
import { authClient } from "@/lib/auth-client";
import { Clock } from "@gravity-ui/icons";
import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
  Select,
  ListBox,
  DatePicker,
  DateField,
  FieldError,
  Calendar,
  TimeField,
  TextArea,
  toast,
} from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useState } from "react";

export function AppointmentBookModal({ doctor }) {
  const { data: userData } = authClient.useSession();

  const patient = userData?.user;

  const [value, setValue] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const currentDate = today(getLocalTimeZone());
  const isInvalid = value != null && value.compare(currentDate) < 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const appointmentData = {
      doctorId: doctor._id,
      gender: formData.get("gender"),
      phone: formData.get("phone"),
      date: formData.get("date"),
      time: formData.get("time"),
      reason: formData.get("reason"),
    };
    try {
      await createAppointment(appointmentData);
      setIsOpen(false);
      toast.success("Appontment Booked Successfully.");
    } catch (error) {
      toast.danger(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        color="primary"
        size="lg"
        className="px-8 font-semibold"
        onPress={() => setIsOpen(true)}
      >
        Book Appointment
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-lg">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Clock className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Book Appointment</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                Fill out the form below to book an appointment with Doctor.
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <TextField
                    className="w-full"
                    type="email"
                    variant="secondary"
                  >
                    <Label>User Email</Label>
                    <Input value={patient?.email ?? ""} readOnly />
                  </TextField>
                  <TextField className="w-full" type="text" variant="secondary">
                    <Label>Doctor Name</Label>
                    <Input value={doctor.name} readOnly />
                  </TextField>
                  <TextField className="w-full" type="text" variant="secondary">
                    <Label>Patient Name</Label>
                    <Input value={patient?.name ?? ""} readOnly />
                  </TextField>
                  <div className="flex flex-col sm:flex-row gap-2">
                    {/* Select Gender */}
                    <Select
                      isRequired
                      className="flex-1"
                      variant="secondary"
                      placeholder="Select one"
                      name="gender"
                    >
                      <Label>Gender</Label>
                      <Select.Trigger>
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover>
                        <ListBox>
                          <ListBox.Item id="male" textValue="Male">
                            Male
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                          <ListBox.Item id="female" textValue="Female">
                            Female
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                          <ListBox.Item id="other" textValue="Other">
                            Other
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                    {/* Phone Number */}
                    <TextField
                      isRequired
                      className="flex-2"
                      name="phone"
                      type="tel"
                      variant="secondary"
                    >
                      <Label>Phone</Label>
                      <Input placeholder="Enter your phone number" />
                    </TextField>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    {/* Date Picker */}
                    <DatePicker
                      isRequired
                      className="flex-1"
                      isInvalid={isInvalid}
                      minValue={currentDate}
                      name="date"
                      value={value}
                      onChange={setValue}
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
                        <Calendar aria-label="Event date">
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
                              {(date) => <Calendar.Cell date={date} />}
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
                    {/* Time Picker */}
                    <TimeField isRequired className="flex-1" name="time">
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

                  {/* Reason for Visit */}
                  <TextField
                    className="w-full"
                    name="reason"
                    variant="secondary"
                  >
                    <Label>Reason for visit (Optional)</Label>
                    <TextArea className="w-full" rows={3} />
                  </TextField>
                  <div className="flex gap-2 justify-end pt-5">
                    <Button slot="close" variant="secondary">
                      Cancel
                    </Button>
                    <Button type="submit">Confirm Appointment</Button>
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
