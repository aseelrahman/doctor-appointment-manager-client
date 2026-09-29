//All Doctors
export const fetchDoctors = async (search) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/doctors`;
  if (search) {
    url = `${process.env.NEXT_PUBLIC_API_URL}/doctors?search=${encodeURIComponent(search)}`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch doctors");
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
