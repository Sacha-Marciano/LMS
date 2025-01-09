// Course curriculum
// Add lectures to course, at least one must bee free preview

//React methods
import React, { useContext } from "react";

// Contexts
import { InstructorContext } from "@/context/instructor-context";

// Components
import MediaProgressBar from "@/components/mediaProgressBar";
import VideoPlayer from "@/components/videoPlayer";

// Third-party UI components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// Config for form inputs
import { courseCurriculumInitialFormData } from "@/config";

// API services
import { mediaDeleteService, mediaUploadService } from "@/services";

function Curriculum() {
  const {
    courseCurriculumFormData,
    setCourseCurriculumFormData,
    mediaUploadProgress,
    setMediaUploadProgress,
    mediaUploadProgressPercent,
    setMediaUploadProgressPercent,
  } = useContext(InstructorContext);

  const handleNewLecture = () => {
    setCourseCurriculumFormData([
      ...courseCurriculumFormData,
      { ...courseCurriculumInitialFormData[0] },
    ]);
  };

  const handleCourseTitleChange = (evt, currentIndex) => {
    let copyCourseCurriculumFormData = [...courseCurriculumFormData];
    copyCourseCurriculumFormData[currentIndex] = {
      ...copyCourseCurriculumFormData[currentIndex],
      title: evt.target.value,
    };
    setCourseCurriculumFormData(copyCourseCurriculumFormData);
  };

  const handleFreePreviewChange = (currentValue, currentIndex) => {
    let copyCourseCurriculumFormData = [...courseCurriculumFormData];
    copyCourseCurriculumFormData[currentIndex] = {
      ...copyCourseCurriculumFormData[currentIndex],
      freePreview: currentValue,
    };
    setCourseCurriculumFormData(copyCourseCurriculumFormData);
  };

  async function handleSingleLectureUpload(evt, currentIndex) {
    const selectedFile = evt.target.files[0];

    if (selectedFile) {
      const videoFormData = new FormData();
      videoFormData.append("file", selectedFile);

      try {
        setMediaUploadProgress(true);
        const response = await mediaUploadService(
          videoFormData,
          setMediaUploadProgressPercent
        );
        if (response.success) {
          let copyCourseCurriculumFormData = [...courseCurriculumFormData];
          copyCourseCurriculumFormData[currentIndex] = {
            ...copyCourseCurriculumFormData[currentIndex],
            videoUrl: response?.data?.url,
            public_id: response?.data?.public_id,
          };

          setCourseCurriculumFormData(copyCourseCurriculumFormData);
          setMediaUploadProgress(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function handleReplaceLecture(currentIndex) {
    let copyCourseCurriculumFormData = [...courseCurriculumFormData];
    const currentVideoPublicId =
      copyCourseCurriculumFormData[currentIndex].public_id;

    const deleteLectureResponse = await mediaDeleteService(
      currentVideoPublicId
    );

    if (deleteLectureResponse?.success) {
      copyCourseCurriculumFormData[currentIndex] = {
        ...copyCourseCurriculumFormData[currentIndex],
        videoUrl: "",
        public_id: "",
      };

      setCourseCurriculumFormData(copyCourseCurriculumFormData);
    }
  }

  const isCurriculumFormDataValid = () => {
    return courseCurriculumFormData.every((item) => {
      return (
        item &&
        typeof item === "object" &&
        item.title.trim() !== "" &&
        item.videoUrl.trim() !== ""
      );
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Course Curriculum</CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          disabled={!isCurriculumFormDataValid() || mediaUploadProgress}
          onClick={handleNewLecture}
        >
          Add Lecture
        </Button>
        {mediaUploadProgress ? (
          <div className="w-full bg-gray-200 rounded-md p-5 mt-5 mb-5 relative overflow-hidden">
            <h2>Uploading video</h2>
            <MediaProgressBar
              isMediaUploading={mediaUploadProgress}
              progress={mediaUploadProgressPercent}
            />
          </div>
        ) : null}
        <div className="mt-4 space-y-4">
          {courseCurriculumFormData.map((item, index) => {
            return (
              <div className="border p-5 rounded-md" key={index}>
                <div className="flex gap-5 items-center">
                  <h3 className="font-semibold">Lecture {index + 1}</h3>
                  <Input
                    name={`Title-${index + 1}`}
                    placeholder="Enter lecture title"
                    className="max-w-96"
                    onChange={(evt) => handleCourseTitleChange(evt, index)}
                    value={courseCurriculumFormData[index]?.title}
                  />
                  <div className="flex items-center space-x-2">
                    <Switch
                      onCheckedChange={(value) =>
                        handleFreePreviewChange(value, index)
                      }
                      checked={courseCurriculumFormData[index]?.freePreview}
                      id={`freePreview-${index + 1}`}
                    />
                    <Label htmlFor={`freePreview-${index + 1}`}>
                      Free Preview
                    </Label>
                  </div>
                </div>
                <div className="mt-6">
                  {courseCurriculumFormData[index]?.videoUrl ? (
                    <div className="lg:flex gap-3">
                      <VideoPlayer
                        url={courseCurriculumFormData[index]?.videoUrl}
                        width="450px"
                        height="250px"
                      />
                      <Button onClick={() => handleReplaceLecture(index)}>
                        Replace video
                      </Button>
                      <Button className="bg-red-900">Delete lecture</Button>
                    </div>
                  ) : (
                    <Input
                      type="file"
                      accept="video/*"
                      onChange={(evt) => handleSingleLectureUpload(evt, index)}
                      className="mb-4"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default Curriculum;
