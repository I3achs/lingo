import { SimpleForm, TextInput, required, ReferenceInput, NumberInput, Edit } from "react-admin";

export const UnitEdit = () => (
  <Edit>
    <SimpleForm>
      <NumberInput
        source="id"
        validate={[required()]}
        label={"Id"} 
         />
      <TextInput 
        source="description" 
        validate={[required()]}
        label={"Description"} 
       />
       <ReferenceInput
       source="courseId"
       reference="courses"
       />
       <NumberInput
       source="order"
       validate={[required()]}
       label="Order"
       />
    </SimpleForm>
  </Edit>
);