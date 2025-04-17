const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// A utility function to handle API requests
async function fetchData(endpoint, token, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "X-AUTH-USER-DATA": token,
        ...options.headers,
      },
    });

    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.statusText}`);
    }

    const json = await res.json();

    if (json.success && json.data) {
      return json.data;
    } else {
      throw new Error(json.error || "Failed to fetch data");
    }
  } catch (error) {
    console.error("API error:", error);
    return null;
  }
}

export async function login() {
  return fetchData("/v1/auth/login", null, {
    method: "POST",
    body: JSON.stringify({
      email: "youremail@gmail.com",
      password: "123456",
    }),
  });
}

export async function getSunCircumference(token) {
  const data = await fetchData("/v1/pi-calculator/sun-circumference", token);
  return data ? data.value : null;
}

export async function getCurrentPiValue(token) {
  const data = await fetchData("/v1/pi-calculator/calculate", token);
  return data ? data.value : null;
}
