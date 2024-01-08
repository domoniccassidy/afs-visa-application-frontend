import { apiClient } from "./apiClient";

export async function getAppointmentDates(id, departureDate) {
  return apiClient.get("branch/appointment/" + id + "," + departureDate);
}
