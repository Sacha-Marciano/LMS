// Course settings
// This page can be customized at will
// Current settings :
// Course main image
//

// TODO: button to replace image like videos in curriculum

//React methods
import React, { useContext } from "react";

// Contexts
import { InstructorContext } from "@/context/instructor-context";

// Components
import MediaProgressBar from "@/components/mediaProgressBar";

// Third-party UI components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// API services
import { mediaUploadService } from "@/services";

function Settings() {
  // Context subscription
  const {
    courseLandingFormData,
    setCourseLandingFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercent,
    setMediaUploadProgressPercent,
  } = useContext(InstructorContext);

  // Methods
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
