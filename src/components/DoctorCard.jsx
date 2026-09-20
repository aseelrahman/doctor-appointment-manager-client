import { Clock, MapPin, StarFill } from "@gravity-ui/icons";
import { Button, Card, Chip } from "@heroui/react";
import Image from "next/image";

const DoctorCard = ({ doctor }) => {
  return (
    <Card className="w-full overflow-hidden rounded-3xl">
      {/* Doctor Image */}
      <div className="relative h-80 md:h-60 w-full rounded-2xl overflow-hidden">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          className="object-cover"
        />
        <Chip className="absolute top-3 right-3 rounded-full bg-background/90 px-3 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-1.5">
            <StarFill className="size-4 text-warning" />
            <span className="font-bold">{doctor?.rating}</span>
          </div>
        </Chip>
      </div>

      {/* Doctor Information */}
      <div className="flex flex-col p-6">
        <Card.Header className="flex flex-col items-start gap-1 p-0">
          <Card.Title className="text-2xl font-bold">{doctor.name}</Card.Title>

          <p className="text-lg font-semibold text-accent">
            {doctor.specialty}
          </p>

          <Card.Description className="mt-3 line-clamp-2 text-base">
            {doctor.description}
          </Card.Description>
        </Card.Header>

        {/* Location + Experience */}
        <div className="mt-5 flex flex-col gap-2 text-default-600">
          <div className="flex items-center gap-2">
            <MapPin className="size-5 shrink-0" />
            <span>{doctor.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="size-5 shrink-0" />
            <span>{doctor.experience} experience</span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-default-200" />

        {/* Footer */}
        <Card.Footer className="flex items-end justify-between p-0">
          <div>
            <p className="text-sm text-default-600">Consultation</p>
            <p className="text-2xl font-bold text-accent">${doctor.fee}</p>
          </div>

          <Button color="primary" size="lg">
            View Details
          </Button>
        </Card.Footer>
      </div>
    </Card>
  );
};
export default DoctorCard;
