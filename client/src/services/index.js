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

export async function mediaDeleteService(id) {
  const { data } = await axiosInstance.delete(`/media/delete/${id}`);

  return data;
}

export async function fetchInstructorCourseListService() {
  const { data } = await axiosInstance.get(`/instructor/course/get`);

  return data;
}

export async function addNewCourseService(formData) {
  const { data } = await axiosInstance.post(`/instructor/course/add`, formData);

  return data;
}

export async function fetchInstructorCourseDetailService(id) {
  const { data } = await axiosInstance.get(`/instructor/course/details/${id}`);

  return data;
}

export async function updateInstructorCourseService(id, formData) {
  const { data } = await axiosInstance.put(
    `/instructor/course/update/${id}`,
    formData
  );

  return data;
}
