import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  InputCheckbox,
  InputText,
} from '../../Common/FormControls/FormsControls';
import { textLengthAndRequired } from '../../../Utils/Validators/Validators';
import { ProfileType } from '../../../Types/types';

type ProfileDataFormType = {
  profile: ProfileType 
  handleSubmit: (values: ProfileType) => void;
};

const ProfileDataForm = ({ profile, handleSubmit }: ProfileDataFormType) => {
  let contactsKey = {};
  profile.contacts && Object.keys(profile.contacts).map((site) => {
    // @ts-ignore
    contactsKey[site] = profile.contacts[site] || '';
  });

  return (
    <Formik
      initialValues={{
        fullName: profile.fullName,
        aboutMe: profile.aboutMe,
        lookingForAJobDescription: profile.lookingForAJobDescription,
        lookingForAJob: profile.lookingForAJob,
        contacts: contactsKey,
      }}
      validationSchema={Yup.object().shape({
        fullName: textLengthAndRequired(20),
        aboutMe: textLengthAndRequired(100),
      })}
      onSubmit={async (values, { resetForm }) => {
        await handleSubmit(values as ProfileType);
        resetForm();
      }}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <InputText name="fullName" type="text" placeholder="Name" />
          <br />
          <InputText
            name="aboutMe"
            rows="5"
            as="textarea"
            placeholder="About Me"
          />
          <br />
          <InputCheckbox
            name="lookingForAJob"
            // @ts-ignore
            type="checkbox"
            id="lookingForAJob"
          >
            Looking For A Job
          </InputCheckbox>
          <br />
          {values.lookingForAJob && (
            <InputText
              name="lookingForAJobDescription"
              rows="5"
              as="textarea"
              placeholder="Looking For A Job Description (Skills)"
            />
          )}
          <br />
          {profile.contacts && Object.keys(profile.contacts).map((site, index) => (
            <label key={site}>
              <span>{site}:</span>
              <InputText
                type="url"
                placeholder={
                  // @ts-ignore
                  profile.contacts[site] ? profile.contacts[site] : 'https://' + site + '.com'
                }
                name={'contacts.' + site}
              />
              <br />
            </label>
          ))}
          <div>
            <button type="submit" disabled={isSubmitting}>
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileDataForm;
