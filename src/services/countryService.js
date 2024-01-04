import { apiClient } from "./apiClient.js";

export async function getCountries() {
  return await apiClient.get("country");
}
