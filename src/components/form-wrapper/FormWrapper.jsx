import { Button, Stack } from "@chakra-ui/react";

const FormWrapper = ({ children, onSubmit, onCancel = () => {}, isSubmitDisabled = false }) => {
  // TODO: Handle the save button disable scenario
  return (
    <div>
      <Stack spacing={7}>
        {children}
        <div className="">
          <Button className="mr-3 bg-green-400" onClick={onSubmit} disabled={isSubmitDisabled}>Save</Button>
          <Button onClick={onCancel}>Cancel</Button>
        </div>
      </Stack>
    </div>
  );
};

export default FormWrapper;
