import { apiClient } from "./apiClient";

export async function createApplication(application) {
  apiClient.post("visaApplication", application);
}
