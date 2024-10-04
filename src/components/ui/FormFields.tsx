import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";

interface FormFieldProps {
  id: string;
  label: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  isRequired?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  isRequired = false,
}) => {
  return (
    <FormControl id={id} isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      {type === "textarea" ? (
        <Textarea
          value={value as string}
          onChange={onChange}
          placeholder={placeholder}
          bg="gray.50"
        />
      ) : (
        <Input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          bg="gray.50"
        />
      )}
    </FormControl>
  );
};

export default FormField;
