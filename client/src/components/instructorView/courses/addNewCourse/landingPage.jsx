// Course Landing page form
// For any changes, change the config object courseLandingPageFormControls

// React methods
import React, { useContext } from "react";

// Contexts
import { InstructorContext } from "@/context/instructor-context";

// Components
import FormControls from "@/components/commonForm/formControls";

// Third-party UI components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Config for form inputs
import { courseLandingPageFormControls } from "@/config";

function LandingPage() {
  const { courseLandingFormData, setCourseLandingFormData } =
    useContext(InstructorContext);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Landing Page</CardTitle>
      </CardHeader>
      <CardContent>
        <FormControls
          formControls={courseLandingPageFormControls}
          formData={courseLandingFormData}
          setFormData={setCourseLandingFormData}
        />
      </CardContent>
    </Card>
  );
}

export default LandingPage;
