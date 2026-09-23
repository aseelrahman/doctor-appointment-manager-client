import { Button, Card, Chip } from "@heroui/react";
import { Calendar, Clock, MapPin, StarFill } from "@gravity-ui/icons";
import Image from "next/image";
import { fetchDoctorById } from "@/lib/doctors";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { AppointmentBookModal } from "@/components/AppointmentBookModal";

const DoctorDetailPage = async ({ params }) => {
  const { id } = await params;

  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  const doctor = await fetchDoctorById(id, tokenData.token);

  const {
    name,
    image,
    rating,
    specialty,
    description,
    location,
    experience,
    hospital,
    availability,
    fee,
  } = doctor;

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 md:py-16">
      <Card className="overflow-hidden rounded-3xl">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          {/* Doctor Image */}
          <div className="relative min-h-96 lg:min-h-150 rounded-2xl overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              priority
              className="object-cover"
            />

            {/* Rating */}
            <Chip className="absolute top-4 right-4 rounded-full bg-background/90 px-3 shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-1.5">
                <StarFill className="size-4 text-warning" />
                <span className="font-bold">{rating}</span>
              </div>
            </Chip>
          </div>

          {/* Doctor Details */}
          <div className="flex flex-col p-6 md:p-10">
            <div>
              <Chip
                color="primary"
                variant="soft"
                className="mb-4 rounded-full"
              >
                {specialty}
              </Chip>

              <h1 className="text-3xl font-bold md:text-4xl">{name}</h1>

              <p className="mt-4 leading-7 text-default-600">{description}</p>
            </div>

            {/* Divider */}
            <div className="my-7 h-px w-full bg-default-200" />

            {/* Basic Information */}
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-primary/10 p-2.5">
                  <MapPin className="size-5 text-primary" />
                </div>

                <div>
                  <p className="text-sm text-default-500">Location</p>
                  <p className="font-semibold">{location}</p>
                </div>
              </div>

              {/* Experience */}
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-primary/10 p-2.5">
                  <Clock className="size-5 text-primary" />
                </div>

                <div>
                  <p className="text-sm text-default-500">Experience</p>
                  <p className="font-semibold">{experience}</p>
                </div>
              </div>

              {/* Hospital */}
              <div className="flex items-start gap-3 sm:col-span-2">
                <div className="rounded-xl bg-primary/10 p-2.5">
                  <Calendar className="size-5 text-primary" />
                </div>

                <div>
                  <p className="text-sm text-default-500">Hospital</p>
                  <p className="font-semibold">{hospital}</p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-7 h-px w-full bg-default-200" />

            {/* Availability */}
            <div>
              <h2 className="text-lg font-bold">Available Schedule</h2>

              <div className="mt-3 flex flex-wrap gap-2">
                {availability.map((slot) => (
                  <Chip
                    key={slot}
                    color="success"
                    variant="soft"
                    className="rounded-full"
                  >
                    {slot}
                  </Chip>
                ))}
              </div>
            </div>

            {/* Booking */}
            <div className="mt-8 rounded-2xl bg-default-100 p-5">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-default-500">Consultation Fee</p>

                  <p className="mt-1 text-3xl font-bold text-accent">${fee}</p>
                </div>
                <AppointmentBookModal doctor={doctor} />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
};

export default DoctorDetailPage;
