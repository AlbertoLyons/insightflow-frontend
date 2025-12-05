export function isAuthenticated(): boolean {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const payload = getUserFromToken();
    if (!payload) return false;
    const currentTime = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < currentTime) return false;
    return true;
  } catch {
    return false;
  }
}

export function getUserFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload;
  } catch {
    return null;
  }
}

export function getUserRole(): string | null {
  const user = getUserFromToken();
  return user?.role ?? null;
}

export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/";
}
