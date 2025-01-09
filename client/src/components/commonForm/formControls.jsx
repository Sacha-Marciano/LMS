// You can use directly form controls instead of common form
// See comments in commonForm/index for explanation
// If using only formControls, a submit button must be created separately

// Third-party UI components
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

function FormControls({ formControls, formData, setFormData }) {
  // Renders inputs according to their type
  const renderComponentByType = (item) => {
    let element = null;
    const value = formData[item.name] || "";
    // Switch depending on input type
    switch (item.componentType) {
      case "input":
        element = (
          <Input
            id={item.name}
            name={item.name}
            placeholder={item.placeholder}
            type={item.type}
            value={value}
            onChange={(evt) =>
              setFormData({
                ...formData,
                [item.name]: evt.target.value,
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, [item.name]: value })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={item.label} />
            </SelectTrigger>
            <SelectContent>
              {item.options && item.options.length > 0
                ? item.options.map((option) => {
                    return (
                      <SelectItem key={option.id} value={option.id}>
                        {option.label}
                      </SelectItem>
                    );
                  })
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            id={item.name}
            name={item.name}
            placeholder={item.placeholder}
            value={value}
            onChange={(evt) =>
              setFormData({
                ...formData,
                [item.name]: evt.target.value,
              })
            }
          />
        );
        break;
      default:
        element = (
          <Input
            id={item.name}
            name={item.name}
            placeholder={item.placeholder}
            type={item.type}
            value={value}
            onChange={(evt) =>
              setFormData({
                ...formData,
                [item.name]: evt.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  };

  return (
    <div className="flex flex-col gap-3">
      {/*Iterates over form controls props and output wanted inputs*/}
      {formControls.map((controlItem) => {
        return (
          <div key={controlItem.name}>
            <Label htmlFor={controlItem.name}>{controlItem.label}</Label>
            {renderComponentByType(controlItem)}
          </div>
        );
      })}
    </div>
  );
}

export default FormControls;
