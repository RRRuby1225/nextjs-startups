import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormErrorDisplay } from "./FormErrorDisplay";

interface Props {
  errors: Record<string, string>;
}

export function StartupFormFields({ errors }: Props) {
  const fields = [
    {
      id: "title",
      name: "title",
      className: "startup-form_input",
      placeholder: "Startup Title",
      as: Input,
    },
    {
      id: "description",
      name: "description",
      className: "startup-form_textarea",
      placeholder: "Startup Description",
      as: Textarea,
    },
    {
      id: "category",
      name: "category",
      className: "startup-form_input",
      placeholder: "Tech, Health, Education...",
      as: Input,
    },
    {
      id: "link",
      name: "link",
      className: "startup-form_input",
      placeholder: "Startup Image URL",
      as: Input,
    },
  ];

  return (
    <>
      {fields.map(({ id, name, className, placeholder, as: Component }) => (
        <div key={id}>
          <label htmlFor={id} className="startup-form_label">
            {name}
          </label>
          <Component
            id={id}
            name={name}
            className={className}
            required
            placeholder={placeholder}
          />
          <FormErrorDisplay error={errors[id]} />
        </div>
      ))}
    </>
  );
}
