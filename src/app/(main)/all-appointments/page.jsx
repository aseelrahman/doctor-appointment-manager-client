import DoctorCard from "@/components/DoctorCard";
import { fetchDoctors } from "@/lib/doctors";
import { SearchField } from "@heroui/react";

const AllAppointments = async () => {
  const doctors = await fetchDoctors();
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-center font-bold text-3xl md:text-4xl mt-10">
        All Appointments
      </h1>
      <p className="text-center text-muted mt-3">
        Find the right doctor for you.
      </p>
      <div className="max-w-xl mx-auto px-5 mt-3">
        <SearchField name="search">
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input
              className="w-70"
              placeholder="Search by doctor name or specialty..."
            />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
      </div>

      <div className="flex flex-col gap-5 md:grid md:grid-cols-2 xl:grid-cols-3 px-5 my-10 sm:my-20">
        {doctors.map((doctor) => {
          return <DoctorCard key={doctor._id} doctor={doctor} />;
        })}
      </div>
    </div>
  );
};
export default AllAppointments;
