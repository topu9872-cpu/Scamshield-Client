const BASE_URL = process.env.NEXT_PUBLIC_URL;

export const userPostData = async (url: string, data: unknown) => {
console.log(BASE_URL,url)

  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
        console.log(await res.json());
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
