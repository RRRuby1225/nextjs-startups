//错误提示：每个字段下显示红字错误
interface Props {
  error?: string;
}

export function FormErrorDisplay({ error }: Props) {
  if (!error) return null;

  return (
    <p className="startup-form_error">
      {Array.isArray(error) ? error[0] : error}
    </p>
  );
}
