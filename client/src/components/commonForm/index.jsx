// This components is a reusable form
// To use this components, define an object in config and us it as formControls
// Then create a state hook with formData and setFormData and give its initial state
// as an initial object (see config for exemples)
// Pass both as props with other needed props

//Components
import FormControls from "./formControls";

// Third-party UI components
import { Button } from "../ui/button";

function CommonForm({
  handleSubmit,
  buttonText,
  formControls = [],
  formData,
  setFormData,
  isButtonDisabled,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {/* render from controls here  */}
      <FormControls
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
      />
      <Button disabled={isButtonDisabled} type="submit" className="w-full mt-5">
        {buttonText || "submit"}
      </Button>
    </form>
  );
}

export default CommonForm;
