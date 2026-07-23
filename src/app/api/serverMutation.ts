const BASE_URL = process.env.NEXT_PUBLIC_URL;

export const userPostData = async (url: string, data: unknown) => {
  const fullUrl = `${BASE_URL}${url}`;

  console.log("POST URL:", fullUrl);
  console.log("POST DATA:", data);

  try {
    const res = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorText = await res.text();

      console.error("POST Request Failed:", {
        status: res.status,
        statusText: res.statusText,
        url: fullUrl,
        response: errorText,
      });

      throw new Error(`POST failed: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("userPostData error:", error);
    throw error;
  }
};

export const getData = async (url: string) => {
  try {
    const res = await fetch(`${BASE_URL}${url}`);

    if (!res.ok) {
      throw new Error(`GET failed: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("getData error:", error);
    throw error;
  }
};
