import FormField from "./FormFields";

interface ModuleFormFieldsProps {
  moduleData: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const ModuleFormFields: React.FC<ModuleFormFieldsProps> = ({ moduleData, handleChange }) => {
  return (
    <>
      <FormField
        id="name"
        label="Name"
        type="text"
        value={moduleData.name}
        onChange={handleChange}
        placeholder="Module Name"
        isRequired
      />
      <FormField
        id="description"
        label="Description"
        type="textarea"
        value={moduleData.description}
        onChange={handleChange}
        placeholder="Module Description"
        isRequired
      />
      <FormField
        id="startDate"
        label="Start Date"
        type="date"
        value={moduleData.startDate}
        onChange={handleChange}
        isRequired
      />
      <FormField
        id="endDate"
        label="End Date"
        type="date"
        value={moduleData.endDate}
        onChange={handleChange}
        isRequired
      />
    </>
  );
};

export default ModuleFormFields;
