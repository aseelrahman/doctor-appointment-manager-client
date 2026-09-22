//All Doctors
export const fetchDoctors = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors`);
  if (!res.ok) {
    throw new Error("Failed to fetch top doctors");
  }
  const data = await res.json();
  return data;
};

//Doctor by ID
export const fetchDoctorById = async (id, token) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch doctor");
  }
  const data = await res.json();
  return data;
};

// Top 3 Doctors
export const fetchTopDoctors = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/doctors/top-rated`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch top doctors");
  }
  const data = await res.json();
  return data;
};
