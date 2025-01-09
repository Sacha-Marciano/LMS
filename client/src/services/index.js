//Every service uses axios instance then define an endpoint then add body as needed
import axiosInstance from "@/api/axiosInstance";

// Sign up new users
export async function registerService(signUpFormData) {
  const { data } = await axiosInstance.post("/auth/register", {
    ...signUpFormData,
    role: "user",
  });

  return data;
}

// Sign in users known in db
export async function loginService(signInFormData) {
  const { data } = await axiosInstance.post("/auth/login", signInFormData);

  return data;
}

// Check if user is rightfully logged in
export async function checkAuthService() {
  const { data } = await axiosInstance.get("/auth/check-auth");

  return data;
}

// Uploads media to server
export async function mediaUploadService(formData, onProgress) {
  const { data } = await axiosInstance.post("/media/upload", formData, {
    // define a function to be used during uploading
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      // return the result of the uploading function during uploading to be displayed to UI
      onProgress(percentCompleted);
    },
  });

  return data;
}

// Delete media from cloudinary by ID
export async function mediaDeleteService(id) {
  const { data } = await axiosInstance.delete(`/media/delete/${id}`);

  return data;
}

// Get all courses from instructor list
export async function fetchInstructorCourseListService() {
  const { data } = await axiosInstance.get(`/instructor/course/get`);

  return data;
}

// Add finalized course data to course collection
export async function addNewCourseService(formData) {
  const { data } = await axiosInstance.post(`/instructor/course/add`, formData);

  return data;
}

// Fetch a specific course details by ID
export async function fetchInstructorCourseDetailService(id) {
  const { data } = await axiosInstance.get(
    `/instructor/course/get/details/${id}`
  );

  return data;
}

// Updated a specific course details by ID
export async function updateInstructorCourseService(id, formData) {
  const { data } = await axiosInstance.put(
    `/instructor/course/update/${id}`,
    formData
  );

  return data;
}
