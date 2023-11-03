import ky from "ky-universal";
import mem from "mem";
import Router from "next/router";

export const fetcher = (input: URL | RequestInfo, init?: RequestInit | undefined) =>
  ky(`${input}`, {
    ...init,
    hooks: {
      afterResponse: [
        async (request, options, response) => {
          if (response.status === 401) {
            try {
              await memorizedRefresh();
              return ky(request);
            } catch (error) {
              if (process.browser && window.location.pathname !== "/login") {
                Router.push("/login");
              }
              throw error;
            }
          }
          return response;
        },
      ],
    },
  }).then((res) => res.json());

export const fetchApi = ky.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchFormDataApi = ky.create({
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const memorizedRefresh = mem(
  async () => {
    try {
      await ky.post("/api/account/refresh-auth");
    } catch (error) {
      throw error;
    }
  },
  {
    maxAge: 3000,
  }
);
