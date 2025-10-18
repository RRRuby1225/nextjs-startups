//Markdown编辑器：独立的Pitch输入框
import MDEditor from "@uiw/react-md-editor";
import { FormErrorDisplay } from "./FormErrorDisplay";

interface Props {
  pitch: string;
  onPitchChange: (value: string) => void;
  error?: string;
}

export function StartupPitchEditor({ pitch, onPitchChange, error }: Props) {
  return (
    <div data-color-mode="light">
      <label htmlFor="pitch" className="startup-form_label">
        Pitch
      </label>

      <MDEditor
        value={pitch}
        onChange={(value) => onPitchChange(value || "")}
        id="pitch"
        preview="edit"
        height={300}
        style={{ borderRadius: 20, overflow: "hidden" }}
        textareaProps={{
          placeholder: "Briefly describe your idea and what problem it solves",
        }}
        previewOptions={{
          disallowedElements: ["style"],
        }}
      />

      <FormErrorDisplay error={error} />
    </div>
  );
}
