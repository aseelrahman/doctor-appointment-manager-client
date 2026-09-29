import DoctorCard from "@/components/DoctorCard";
import { fetchDoctors } from "@/lib/doctors";
import { Button, SearchField } from "@heroui/react";

export const metadata = {
  title: "All Appointments",
  description:
    "Browse doctors, explore their specialties, and find the right doctor for your healthcare needs.",
};

const AllAppointments = async ({ searchParams }) => {
  const { search } = await searchParams;

  const doctors = await fetchDoctors(search);
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-center font-bold text-3xl md:text-4xl mt-10">
        All Appointments
      </h1>
      <p className="text-center text-muted mt-3">
        Find the right doctor for you.
      </p>

      <form className="max-w-xl mx-auto px-5 mt-3">
        <div className="flex gap-2 justify-center">
          <SearchField aria-label="Search doctors" name="search">
            <SearchField.Group className={"rounded-full"}>
              <SearchField.SearchIcon />
              <SearchField.Input
                className="w-70"
                placeholder="Search by doctor name"
              />
              <SearchField.ClearButton />
            </SearchField.Group>
          </SearchField>

          <Button type="submit">Search</Button>
        </div>
      </form>

      <div className="flex flex-col gap-5 md:grid md:grid-cols-2 xl:grid-cols-3 px-5 my-10 sm:my-20">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))
        ) : (
          <p className="col-span-full text-center text-muted">
            No doctors found.
          </p>
        )}
      </div>
    </div>
  );
};
export default AllAppointments;
