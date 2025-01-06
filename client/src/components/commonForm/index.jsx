import FormControls from "./formControls";

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
