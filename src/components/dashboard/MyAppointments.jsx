import { auth } from "@/lib/auth";
import {
  Calendar,
  CircleInfo,
  Clock,
  Pencil,
  TrashBin,
} from "@gravity-ui/icons";
import { Button, Card } from "@heroui/react";
import { headers } from "next/headers";
import { DeleteAlertModal } from "./DeleteAlertModal";

const MyAppointments = async () => {
  const token = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(`${process.env.API_URL}/appointments`, {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });

  const appointments = await res.json();

  return (
    <div>
      <h1 className="mb-5 text-2xl font-bold">My Appointments</h1>

      <div className="flex flex-col gap-5 md:grid md:grid-cols-2 xl:grid-cols-3 px-5 my-10 sm:my-20">
        {appointments.map((appointment) => (
          <Card key={appointment._id} className="w-full">
            <Card.Header>
              <Card.Title className="text-xl font-bold text-accent">
                {appointment.doctor.name}
              </Card.Title>

              <Card.Description>
                {appointment.doctor.specialty}
              </Card.Description>
            </Card.Header>

            <Card.Content className="space-y-3">
              {/* Date */}
              <div className="flex items-center gap-2">
                <Calendar className="size-5" />

                <span>
                  <span className="font-medium">Date:</span> {appointment.date}
                </span>
              </div>

              {/* Time */}
              <div className="flex items-center gap-2">
                <Clock className="size-5" />

                <span>
                  <span className="font-medium">Time:</span> {appointment.time}
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2">
                <CircleInfo className="size-5" />

                <span>
                  <span className="font-medium">Status:</span>{" "}
                  {appointment.status}
                </span>
              </div>

              {/* Reason */}
              <p>
                <span className="font-medium">Reason:</span>{" "}
                {appointment.reason || "No reason provided"}
              </p>
            </Card.Content>

            <Card.Footer className="gap-2 justify-center sm:justify-end">
              <Button variant="secondary">
                <Pencil className="size-4" />
                Update
              </Button>

              <DeleteAlertModal appointmentId={appointment._id} />
            </Card.Footer>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
