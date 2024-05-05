import { Timezones_List, countries, languages, userTypes } from "./common";

export const CreateClientsteps = [
  {
    title: "Company Info",
    fields: [
      {
        name: "company_name",
        title: "Company Name",
        type: "text",
        rules: [{ required: true, message: "Please enter company name" }],
      },
      {
        name: "company_email",
        title: "Company Email ID",
        type: "email",
        rules: [
          { required: true, message: "Please enter office email ID" },
          { type: "email", message: "Please enter a valid email address" },
        ],
      },
      {
        name: "company_location",
        title: "Company Location",
        type: "text",
        rules: [{ required: true, message: "Please enter company location" }],
      },
      {
        name: "company_type",
        title: "Company Type",
        type: "select",
        options: [
          { label: "Technology", value: "Technology" },
          { label: "Engineering", value: "Engineering" },
          { label: "Media", value: "Media" },
          { label: "Advertising", value: "Advertising" },
          { label: "Transportation", value: "Transportation" },
          { label: "Energy", value: "Energy" },
          { label: "Construction", value: "Construction" },
          { label: "Nonprofit", value: "Nonprofit" },
          { label: "Government", value: "Government" },
          { label: "Pharmaceutical", value: "Pharmaceutical" },
          // Add more options as needed
        ],

        rules: [{ required: true, message: "Please select industry type" }],
      },

      {
        name: "company_website",
        title: "Company Website",
        type: "url",
        rules: [
          {
            required: true,
            message: "Please enter a valid company website URL",
          },
          {
            type: "url",
            message: "Please enter a valid URL",
          },
          {
            pattern: /^(ftp|http|https):\/\/[^ "]+$/,
            message: "Please enter a valid URL",
          },
        ],
      },
    ],
  },
  {
    title: "Company Details",
    fields: [
      {
        name: "company_photo",
        title: "Company Photo/Logo",
        type: "file",
        rules: [{ required: true, message: "Please upload office photo" }],
      },
      {
        name: "company_description",
        title: "Company Description",
        type: "textarea",
        autoSize: { minRows: 3, maxRows: 6 },
        rules: [
          { required: true, message: "Please enter company description" },
          { min: 600, message: "Description must be at least 600 characters" },
          { max: 5000, message: "Description cannot exceed 5000 characters" },
        ],
      },
      {
        name: "company_size",
        title: "Company Size",
        type: "number",
        rules: [{ required: true, message: "Please enter company size" }],
      },
    ],
  },
  {
    title: "Recruiter Info",
    fields: [
      {
        name: "recruiter_name",
        title: "Recruiter Name",
        type: "text",
        rules: [{ required: true, message: "Please enter recruiter name" }],
      },
      {
        name: "recruiter_role",
        title: "Recruiter Role",
        type: "select",
        mode: false,
        rules: [{ required: true, message: "Please select recruiter role" }],
        options: [
          { label: "HR Manager", value: "HR Manager" },
          { label: "Recruiter", value: "Recruiter" },
          {
            label: "Talent Acquisition Specialist",
            value: "Talent Acquisition Specialist",
          },
          {
            label: "Human Resources Coordinator",
            value: "Human Resources Coordinator",
          },
          { label: "HR Generalist", value: "HR Generalist" },
          { label: "HR Business Partner", value: "HR Business Partner" },
          { label: "Recruitment Consultant", value: "Recruitment Consultant" },
          { label: "Sourcer", value: "Sourcer" },
          { label: "Staffing Coordinator", value: "Staffing Coordinator" },
          { label: "Employment Specialist", value: "Employment Specialist" },
          { label: "HR Analyst", value: "HR Analyst" },
          { label: "Onboarding Specialist", value: "Onboarding Specialist" },
          // Add more options as needed
        ],
      },

      {
        name: "recruiter_email",
        title: "Recruiter Email",
        type: "email",
        rules: [{ required: true, message: "Please enter recruiter email" }],
      },
      {
        name: "recruiter_phone",
        title: "Recruiter Phone",
        type: "number",
        rules: [
          { required: true, message: "Please enter recruiter phone number" },
        ],
      },
      {
        name: "recruiter_photo",
        title: "Recruiter Photo",
        type: "file",
        rules: [{ required: true, message: "Please upload recruiter photo" }],
      },
    ],
  },
];
export const RegistrationForm = [
  {
    title: "Basic Details",
    fields: [
      {
        name: "contact",
        title: "Contact Number",
        type: "number",
        rules: [{ required: true, message: "Please enter Contact Number" }],
      },
      {
        name: "address",
        title: "Address",
        type: "text",
        rules: [{ required: true, message: "Please enter Address" }],
      },

      {
        name: "country",
        title: "Country",
        type: "select",
        options: countries,

        rules: [{ required: true, message: "Please select Country " }],
      },

      {
        name: "dateOfBirth",
        title: "Date of Birth",
        type: "date",
        rules: [{ required: true, message: "Please select date " }],
      },
    ],
  },
  {
    title: "Profession",
    fields: [
      {
        name: "languagePreference",
        title: "Languages Preference",
        type: "select",
        rules: [
          { required: true, message: "Please select Languages Preference " },
        ],
        options: languages,
      },
      {
        name: "timezone",
        title: "Timezone",
        type: "select",
        rules: [{ required: true, message: "Please select Timezone " }],
        options: Timezones_List,
      },
    ],
  },
  {
    title: "Profile Photo",
    fields: [
      {
        name: "photo",
        title: "Profile Photo",
        type: "file",
        rules: [{ required: true, message: "Please upload Profile photo" }],
      },
    ],
  },
];
