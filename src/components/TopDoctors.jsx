import DoctorCard from "@/components/DoctorCard";
import { fetchTopDoctors } from "@/lib/doctors";

const TopDoctors = async () => {
    const topDoctors = await fetchTopDoctors();


  return (
    <section className="max-w-7xl mx-auto px-5 my-20">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Top Rated Doctors</h2>

        <p className="text-muted mt-3">Meet our highest-rated doctors.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 mt-10">
        {topDoctors.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
    </section>
  );
};

export default TopDoctors;
