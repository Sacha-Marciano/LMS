import axiosInstance from "@/api/axiosInstance";

export async function registerService(signUpFormData) {
  const { data } = await axiosInstance.post("/auth/register", {
    ...signUpFormData,
    role: "user",
  });

  return data;
}

export async function loginService(signInFormData) {
  const { data } = await axiosInstance.post("/auth/login", signInFormData);

  return data;
}

export async function checkAuthService() {
  const { data } = await axiosInstance.get("/auth/check-auth");

  return data;
}

export async function mediaUploadService(formData, onProgress) {
  const { data } = await axiosInstance.post("/media/upload", formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgress(percentCompleted);
    },
  });

  return data;
}
