import httpClient from "./httpClient";

function setJWT(token: string): void {
  localStorage.setItem("JWT", token);
}

function getJWT(): string | null {
  return localStorage.getItem("JWT");
}

function clearJWT(): void {
  localStorage.removeItem("JWT");
}

function getMessageForSign(address: string): Promise<string> {
  return httpClient
    .post<string>("/api/login/1", { address })
    .then(({ data }) => data);
}

function getAuthToken(address: string, signature: string): Promise<string> {
  return httpClient
    .post("/api/login/2", { address, signature })
    .then(({ data }) => data);
}

const authService = {
  getAuthToken,
  getMessageForSign,
  setJWT,
  getJWT,
  clearJWT,
};

export default authService;
