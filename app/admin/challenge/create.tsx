import { SimpleForm, Create, TextInput, required, NumberInput, ReferenceInput, SelectInput } from "react-admin";

export const ChallengeCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput
       source="question"
        validate={[required()]}
         label={"Question"} 
         />
         <SelectInput
         source="type"
         choices={[
            {
                id: "SELECT",
                name: "SELECT"
            },
            {
                id: "ASSIST",
                name: "ASSIST"
            },
         ]}
         validate={[required()]}
         />
      <ReferenceInput
       source="lessonsId"
       reference="lessons"
          />
          <NumberInput
          source="order"
          validate={[required()]}
          label="Order"
          />
    </SimpleForm>
  </Create>
);