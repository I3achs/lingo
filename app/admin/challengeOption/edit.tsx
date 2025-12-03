import { SimpleForm, TextInput, required, ReferenceInput, Edit, BooleanInput, } from "react-admin";

export const ChallengeOptionEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput
       source="text"
        validate={[required()]}
         label={"Text"} 
         />
         <BooleanInput
         source="correct"
         label="Correct option"
         />
      <ReferenceInput
       source="challengeId"
       reference="challenges"
          />
          <TextInput
          source="imageSrc"
          label="Image URL"
          />
          <TextInput
          source="audio"
          label="Audio URL"
          />
    </SimpleForm>
  </Edit>
);