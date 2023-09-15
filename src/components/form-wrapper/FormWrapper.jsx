import { Button, Stack } from "@chakra-ui/react";

const FormWrapper = ({ children, onSubmit }) => {
  return (
    <div>
      <Stack spacing={7}>
        {children}

        <div className="">
          <Button className="mr-3 bg-green-400" onClick={onSubmit}>Save</Button>
          <Button>Cancel</Button>
        </div>
      </Stack>
    </div>
  );
};

export default FormWrapper;
