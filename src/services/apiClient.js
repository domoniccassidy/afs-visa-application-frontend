import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7291/",
  headers: {
    Authorization:
      "Bearer " +
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkRvbSIsInN1YiI6IkRvbSIsImp0aSI6ImRhNWE3MGFiIiwicm9sZSI6ImF1dGhvcmlzZWRfdmlzYV9hcHBsaWNhbnQiLCJhdWQiOlsiaHR0cDovL2xvY2FsaG9zdDozNTgxNyIsImh0dHBzOi8vbG9jYWxob3N0OjQ0MzQ2IiwiaHR0cDovL2xvY2FsaG9zdDo1MjU3IiwiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI5MSJdLCJuYmYiOjE3MDM0NTY4NzksImV4cCI6MTcxMTMxOTI3OSwiaWF0IjoxNzAzNDU2ODgwLCJpc3MiOiJkb3RuZXQtdXNlci1qd3RzIn0.gHWFPh7LLXo6onFHk0QhSshvuFQrrcWBw70Ht67Qr_c",
  },
});

export { apiClient };
