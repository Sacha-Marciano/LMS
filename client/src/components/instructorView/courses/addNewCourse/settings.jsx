import MediaProgressBar from "@/components/mediaProgressBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InstructorContext } from "@/context/instructor-context";
import { mediaUploadService } from "@/services";
import React, { useContext } from "react";

function Settings() {
  const {
    courseLandingFormData,
    setCourseLandingFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercent,
    setMediaUploadProgressPercent,
  } = useContext(InstructorContext);
  async function handleImageUpload(evt) {
    const selectedImage = evt.target.files[0];

    if (selectedImage) {
      const imageFormData = new FormData();

      imageFormData.append("file", selectedImage);

      try {
        setMediaUploadProgress(true);
        const response = await mediaUploadService(
          imageFormData,
          setMediaUploadProgressPercent
        );
        if (response.success) {
          setCourseLandingFormData({
            ...courseLandingFormData,
            image: response.data?.url,
          });
          setMediaUploadProgress(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Settings</CardTitle>
      </CardHeader>
      {mediaUploadProgress ? (
        <div className="w-full bg-gray-200 rounded-md p-5 mt-5 mb-5 relative overflow-hidden">
          <h2>Uploading image</h2>
          <MediaProgressBar
            isMediaUploading={mediaUploadProgress}
            progress={mediaUploadProgressPercent}
          />
        </div>
      ) : null}
      <CardContent>
        {courseLandingFormData?.image ? (
          <img src={courseLandingFormData.image} alt="Course Image" />
        ) : (
          <div className=" flex flex-col gap-3">
            <Label>Upload Course Image</Label>
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default Settings;
