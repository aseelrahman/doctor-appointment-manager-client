"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const createAppointment = async (appointmentData) => {
  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });

  if (!tokenData?.token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${process.env.API_URL}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenData.token}`,
    },
    body: JSON.stringify(appointmentData),
  });

  if (!res.ok) {
    throw new Error("Failed to create appointment");
  }
  return res.json();
};
