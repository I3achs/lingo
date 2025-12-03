import { SimpleForm, Create, TextInput, required, ReferenceInput, NumberInput } from "react-admin";

export const LessonCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput
        source="title"
        validate={[required()]}
        label={"Title"} 
         />
       <ReferenceInput
       source="unitId"
       reference="units"
       />
       <NumberInput
       source="order"
       validate={[required()]}
       label="Order"
       />
    </SimpleForm>
  </Create>
);