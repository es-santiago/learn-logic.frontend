import router from "next/router";
import { customErrors } from "../customErrors";
import fetchWithAuth from "./fetchWithAuth";
import { errorToast, successToast } from "../toast";

interface Options<T> {
  url: string;
  data: T;
  successMessage: string;
  errorMessage: string;
}

interface GetOptions<T> {
  url: string;
  errorMessage: string;
}

interface Response {
  success: boolean;
  data: any;
}

export const postWithAuth = async <T>({
  url,
  data,
  successMessage,
  errorMessage,
}: Options<T>): Promise<boolean> => {
  try {
    const response = await fetchWithAuth(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      const message = await customErrors(errorResponse, errorMessage);
      errorToast(message || errorMessage);

      return false;
    }

    successToast(successMessage);
    setTimeout(() => {
      router.reload();
    }, 2300);

    return true;
  } catch (error) {
    errorToast(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );

    return false;
  }
};

export const getWithAuth = async <T>({
  url,
  errorMessage,
}: GetOptions<T>): Promise<Response> => {
  try {
    const response = await fetchWithAuth(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      const message = await customErrors(errorResponse, errorMessage);
      errorToast(message || errorMessage);

      return { data: [], success: false } as Response;
    }

    const users = await response.json();
    return { data: users, success: true } as Response;
  } catch (error) {
    errorToast(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );

    return { data: [], success: false } as Response;
  }
};

export const putWithAuth = async <T>({
  url,
  data,
  successMessage,
  errorMessage,
}: Options<T>): Promise<boolean> => {
  try {
    const response = await fetchWithAuth(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      const message = await customErrors(errorResponse, errorMessage);
      errorToast(message || errorMessage);

      return false;
    }

    successToast(successMessage);
    setTimeout(() => {
      router.reload();
    }, 2300);

    return true;
  } catch (error) {
    errorToast(
      error instanceof Error ? error.message : "An unexpected error occurred."
    );

    return false;
  }
};
