// import axios from "axios";
import router from "../router/index";
import { emptyUser } from "../store/user";

async function request(
  method: string,
  url: string,
  data = {},
  headers = {} as any,
  type = ""
) {
  let resp;
  url = "/api" + url;
  console.log(url);
  try {
    if (type === "upload") {
      resp = await fetch(url, {
        method,
        body: data as any,
        headers: {
          ...headers,
        },
      });
    } else {
      if (method === "GET") {
        resp = await fetch(url, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
        });
      } else {
        resp = await fetch(url, {
          method,
          body: data ? JSON.stringify(data) : "",
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
        });
      }
    }
    resp = await resp.json();
  } catch (err) {
    console.log(err.message);
  }

  if (!resp.success && resp.code === 1) {
    try {
      resp = await fetch("/api/user/refreshtoken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          refresh_token: localStorage.getItem("refresh_token"),
        },
      });

      resp = await resp.json();
    } catch (err) {
      console.log(err.message);
    }

    if (resp.success) {
      localStorage.setItem("access_token", resp.access_token);
      localStorage.setItem("refresh_token", resp.refresh_token);

      headers.access_token = resp.access_token;

      try {
        if (type === "upload") {
          resp = await fetch(url, {
            method,
            body: data as any,
            headers: {
              ...headers,
            },
          });
        } else {
          if (method === "GET") {
            resp = await fetch(url, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                ...headers,
              },
            });
          } else {
            resp = await fetch(url, {
              method,
              body: data ? JSON.stringify(data) : "",
              headers: {
                "Content-Type": "application/json",
                ...headers,
              },
            });
          }
        }
        resp = await resp.json();
      } catch (err) {
        console.log(err.message);
      }
    } else {
      return false;
    }
  }

  console.log(resp);
  return resp;
}

function LogOffUser() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  emptyUser();
  router.push("/login");
}

export const post = async (url: string, data = {}) => {
  let resp;

  if (url === "/user/login" || url === "/user/register") {
    resp = await request("POST", url, data);
    return resp;
  }

  if (
    !localStorage.getItem("access_token") ||
    !localStorage.getItem("access_token").length
  ) {
    LogOffUser();
    return;
  }

  const headers = {
    access_token: localStorage.getItem("access_token"),
  };

  resp = await request("POST", url, data, headers);

  if (resp === false) LogOffUser();
  if (
    !resp.success &&
    resp.code === 3 &&
    resp.message === "You must be logged in."
  )
    LogOffUser();

  return resp;
};

export const get = async (url: string) => {
  let resp;

  if (
    !localStorage.getItem("access_token") ||
    !localStorage.getItem("access_token").length
  ) {
    LogOffUser();
    return;
  }

  const headers = {
    access_token: localStorage.getItem("access_token"),
  };

  resp = await request("GET", url, {}, headers);

  if (resp === false) LogOffUser();
  if (
    !resp.success &&
    resp.code === 3 &&
    resp.message === "You must be logged in."
  )
    LogOffUser();

  return resp;
};

export const put = async (url: string, data = {}) => {
  let resp;

  if (
    !localStorage.getItem("access_token") ||
    !localStorage.getItem("access_token").length
  ) {
    LogOffUser();
    return;
  }

  const headers = {
    access_token: localStorage.getItem("access_token"),
  };

  resp = await request("PUT", url, data, headers);

  if (resp === false) LogOffUser();
  if (
    !resp.success &&
    resp.code === 3 &&
    resp.message === "You must be logged in."
  )
    LogOffUser();

  return resp;
};

export const deleteReq = async (url: string, data = {}) => {
  let resp;

  if (
    !localStorage.getItem("access_token") ||
    !localStorage.getItem("access_token").length
  ) {
    LogOffUser();
    return;
  }

  const headers = {
    access_token: localStorage.getItem("access_token"),
  };
  resp = await request("DELETE", url, data, headers);

  if (resp === false) LogOffUser();
  if (
    !resp.success &&
    resp.code === 3 &&
    resp.message === "You must be logged in."
  )
    LogOffUser();

  return resp;
};

export const uploadPhoto = async (
  url: string,
  formData: object,
  header: object = {}
) => {
  let resp;

  if (
    !localStorage.getItem("access_token") ||
    !localStorage.getItem("access_token").length
  ) {
    LogOffUser();
    return;
  }

  const headers = {
    access_token: localStorage.getItem("access_token"),
    ...header,
  };

  resp = await request("post", url, formData, headers, "upload");

  if (resp === false) LogOffUser();
  if (
    !resp.success &&
    resp.code === 3 &&
    resp.message === "You must be logged in."
  )
    LogOffUser();

  return resp;
};
