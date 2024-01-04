import { apiClient } from "./apiClient";

export async function getVisasByHomeAndDestinationCountry(
  homeCountryId,
  destinationCountryId
) {
  return apiClient.get("/visa/" + homeCountryId + "," + destinationCountryId);
}
