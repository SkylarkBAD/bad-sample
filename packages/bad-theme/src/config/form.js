export const FORM_CONFIG = {
  core_membershipapplicationid: {
    Label: "Membership Application",
    AttributeType: "Uniqueidentifier",
    MaxLength: 100,
    Required: "SystemRequired",
    order: 1,
  },
  bad_ethnicity: {
    Label: "Ethnicity",
    AttributeType: "Picklist",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  py3_ethnicity: {
    Label: "Input Lapbel",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  py3_currentgrade: {
    Label: "Current Grade",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  py3_insertnhsnetemailaddress: {
    Label: "If Yes Insert nhs.net email address",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  py3_otherregulatorybodyreference: {
    Label: "Input Lapbel",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  bad_memberdirectory: {
    Label: "Input Lapbel",
    AttributeType: "Boolean",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  bad_preferredmailingaddress: {
    Label: "Input Lapbel",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  bad_readpolicydocument: {
    Label: "Input Lapbel",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  bad_newhospitaladded: {
    Label: "Input Lapbel",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 0,
  },
  sky_newhospitaltype: {
    Label: "Input Lapbel",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 0,
  },
  sky_cvurl: {
    Label: "Input Lapbel",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 0,
  },
  sky_profilepicture: {
    Label: "Input Lapbel",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  sky_newhospitalname: {
    Label: "Input Lapbel",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 0,
  },
  py3_speciality: {
    Label: "Speciality",
    AttributeType: "Memo",
    MaxLength: 2000,
    Required: "None",
    order: 1,
    Choices: [
      { value: "Anaesthetics", Label: "Anaesthetics" },
      { value: "Cardiology", Label: "Cardiology" },
      { value: "Dermatology", Label: "Dermatology" },
    ],
  },
  py3_whatukbasedroleareyou: {
    Label: "UK/Overseas role",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  bad_mainareaofinterest: {
    Label: "Main area of Interest",
    AttributeType: "Picklist",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  bad_isbadmember: {
    Label: "Are you a BAD member?",
    AttributeType: "Boolean",
    MaxLength: 100,
    Required: "None",
    order: 1,
    Handler: () => console.log("🐞 onClick handler"),
  },
  bad_includeinthebssciiemaildiscussionforum: {
    Label: "Include in the BSSCII email discussion forum",
    AttributeType: "Boolean",
    MaxLength: 100,
    Required: "None",
    order: 1,
    Handler: () => console.log("🐞 onClick handler"),
  },
  py3_constitutionagreement: {
    Label: "Constitution Agreement",
    AttributeType: "Boolean",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  bad_otherjointclinics: {
    Label: "Other joint Clinics",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  py3_title: {
    Label: "Title",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  py3_firstname: {
    Label: "First Name",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  py3_initials: {
    Label: "Initials",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  py3_lastname: {
    Label: "Last Name",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  py3_alternativelastname: {
    Label: "Alternative Last Name",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  py3_gender: {
    Label: "Gender",
    AttributeType: "Picklist",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  py3_dateofbirth: {
    Label: "Date of Birth",
    AttributeType: "DateTime",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  py3_email: {
    Label: "Email",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  py3_mobilephone: {
    Label: "Mobile Phone",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  py3_gmcnumber: {
    Label: "GMC Number",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  py3_ntnno: {
    Label: "NTN Number",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  bad_currentpost: {
    Label: "Current Post",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  py3_hospitalid: {
    Label: "Main Hospital / Place of Work / Medical School details.",
    AttributeType: "Lookup",
    MaxLength: 100,
    Required: "None",
    order: 0,
  },
  bad_proposer1: {
    Label: "Proposer 1",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  bad_proposer2: {
    Label: "Proposer 2",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  bad_interestinfieldquestion: {
    Label: "Interest in Field Question",
    AttributeType: "Memo",
    MaxLength: 2000,
    Required: "None",
    order: 1,
  },
  bad_mrpcqualified: {
    Label: "MRCP Qualified",
    AttributeType: "Boolean",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  bad_hasmedicallicence: {
    Label: "License to Practice Medicine?",
    AttributeType: "Boolean",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  bad_existingsubscriptionid: {
    Label: "Existing Category",
    AttributeType: "Lookup",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  core_membershipsubscriptionplanid: {
    Label: "New Category",
    AttributeType: "Lookup",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  bad_newcategorydate: {
    Label: "New Category Date",
    AttributeType: "DateTime",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: 1,
  },
  py3_nationality: {
    Label: "Nationality",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  bad_sigapprovalrequestdate: {
    Label: "SIG  Approval Request Date",
    AttributeType: "DateTime",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  bad_noofdayswithsig: {
    Label: "No of Days with SIG",
    AttributeType: "Integer",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  py3_address1ine1: {
    Label: "Address Line 1",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: -1,
  },
  py3_addressline2: {
    Label: "Address Line 2",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  py3_addresstowncity: {
    Label: "Address Town/City",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  py3_addressline3: {
    Label: "Address Line 3",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  py3_addresscountystate: {
    Label: "Address County/State",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  py3_addresszippostalcode: {
    Label: "Address Zip/Postal Code",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  py3_addresscountry: {
    Label: "Address Country",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  bad_expectedyearofqualification: {
    Label: "Expected Year of Qualification",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  bad_qualifications: {
    Label: "Qualifications",
    AttributeType: "Memo",
    MaxLength: 500,
    Required: "None",
    order: 1,
    caption:
      "If you would like to change your job title please use the form on your dashboard.",
  },
  core_accountid: {
    Label: "SIG",
    AttributeType: "Lookup",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  bad_organisedfor: {
    Label: "Organised For",
    AttributeType: "Picklist",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: 1,
  },
  bad_applicationfor: {
    Label: "Application for",
    AttributeType: "Picklist",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: 1,
  },
  transactioncurrencyid: {
    Label: "Currency",
    AttributeType: "Lookup",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
  bad_psychodermatologycategory: {
    Label: "Psychodermatology Category",
    AttributeType: "Picklist",
    MaxLength: 100,
    Required: "None",
    order: 1,
  },
};
