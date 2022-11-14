export const FORM_CONFIG = {
  core_membershipapplicationid: {
    Label: "Membership Application",
    AttributeType: "Uniqueidentifier",
    MaxLength: 100,
    Required: "SystemRequired",
    order: 0,
    hidden: false,
    width: "100%",
    caption: "",
  },
  bad_ethnicity: {
    Label: "Ethnicity",
    AttributeType: "Picklist", // TODO add picklist options
    MaxLength: 100,
    Required: "None",
    order: 0,
    hidden: true, // hide this field
    width: "100%",
    caption: "",
  },
  py3_ethnicity: {
    Label: "Input Label",
    AttributeType: "",
    MaxLength: 100,
    Required: "None",
    order: 0,
    hidden: false,
    width: "100%",
    caption: "",
  },
  py3_currentgrade: {
    Label: "Current Grade",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 0,
    hidden: false,
    width: "100%",
    caption: "",
  },
  py3_insertnhsnetemailaddress: {
    Label: "Email Address",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 0,
    hidden: false,
    width: "100%",
    caption: "",
  },
  py3_otherregulatorybodyreference: {
    Label: "Input Lapbel",
    AttributeType: "",
    MaxLength: 100,
    Required: "None",
    order: 0,
    hidden: false,
    width: "100%",
    caption: "",
  },
  bad_memberdirectory: {
    Label: "Include my details in the BAD Members` Directory",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: 100,
    hidden: false,
    width: "100%",
    caption: "",
  },
  bad_preferredmailingaddress: {
    Label: "Preferred mailing option",
    AttributeType: "",
    Choices: [
      { value: 810170000, Label: "Main Hospital" },
      { value: 810170001, Label: "Home" },
    ],
    MaxLength: 102,
    Required: "None",
    order: -58,
    hidden: false,
    width: "100%",
    caption: "",
  },
  bad_readpolicydocument: {
    Label: "Please confirm you have read the policy document",
    AttributeType: "",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: 102,
    hidden: false,
    width: "100%",
    caption: "",
    Link: "/privacy-policy",
  },
  bad_newhospitaladded: {
    Label: "Hospital / Medical School not listed",
    AttributeType: "Boolean",
    MaxLength: 100,
    Required: "None",
    order: 16,
    hidden: false,
    width: "100%",
    caption: "",
  },
  sky_newhospitaltype: {
    Label: "Select Type",
    AttributeType: "Picklist",
    Choices: [
      { value: "Hospital", Label: "Main Hospital" },
      { value: "Medical School", Label: "Medical School" },
    ],
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: 16,
    hidden: false,
    width: "100%",
    caption: "",
  },
  sky_cvurl: {
    Label: "CV upload",
    AttributeType: "",
    MaxLength: 100,
    Required: "None",
    order: -57,
    hidden: false,
    width: "100%",
    caption: "",
  },
  sky_profilepicture: {
    Label: "Profile Picture",
    AttributeType: "",
    MaxLength: 100,
    Required: "None",
    order: 0,
    hidden: false,
    width: "100%",
    caption: "",
  },
  sky_newhospitalname: {
    Label: "New Hospital Name",
    AttributeType: "String",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: 0,
    hidden: false,
    width: "100%",
    caption: "",
  },
  py3_speciality: {
    Label: "Specialist Interest",
    AttributeType: "Memo",
    MaxLength: 2000,
    Required: "None",
    order: 0,
    hidden: false,
    width: "100%",
    caption: "",
  },
  py3_whatukbasedroleareyou: {
    Label: "UK / Overseas role",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 0,
    hidden: false,
    width: "100%",
    caption: "",
  },
  bad_mainareaofinterest: {
    Label: "Main area of Interest",
    AttributeType: "Picklist",
    MaxLength: 100,
    Required: "None",
    order: 0,
    hidden: false,
    width: "100%",
    caption: "",
  },
  bad_isbadmember: {
    Label: "Are you a BAD member?",
    AttributeType: "Boolean",
    MaxLength: 100,
    Required: "None",
    order: -57,
    hidden: false,
    width: "100%",
    caption: "",
  },
  bad_includeinthebssciiemaildiscussionforum: {
    Label: "Include in the BSSCII email discussion forum",
    AttributeType: "Boolean",
    MaxLength: 100,
    Required: "None",
    order: 100,
    hidden: false,
    width: "100%",
    caption:
      "Do you want to be included in the BSSCII discussion forum? If yes, please tick and add your NHS address below:",
  },
  py3_constitutionagreement: {
    Label: "Constitution Agreement",
    AttributeType: "Boolean",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: 101,
    hidden: false,
    width: "100%",
    caption: "",
    Link: "/about-the-bad/bad-constitution/",
  },
  bad_otherjointclinics: {
    Label: "Do you do joint clinics with any other specialties?",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 0,
    hidden: false,
    width: "100%",
    caption: "",
  },
  py3_title: {
    Label: "Title",
    AttributeType: "String",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: -77,
    hidden: false,
    width: "100%",
    caption: "",
  },
  py3_firstname: {
    Label: "First Name",
    AttributeType: "String",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: -76,
    hidden: false,
    width: "100%",
    caption: "",
  },
  py3_initials: {
    Label: "Initials",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: -75,
    hidden: false,
    width: "100%",
    caption: "",
  },
  py3_lastname: {
    Label: "Last Name",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: -74,
    hidden: false,
    width: "100%",
    caption: "",
  },
  py3_alternativelastname: {
    Label: "Alternative Last Name",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: -73,
    hidden: false,
    width: "100%",
    caption: "",
  },
  py3_gender: {
    Label: "Gender",
    AttributeType: "Picklist",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: -72,
    hidden: false,
    width: "100%",
    caption: "",
  },
  py3_dateofbirth: {
    Label: "Date of Birth",
    AttributeType: "DateTime",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: -71,
    hidden: false,
    width: "100%",
    caption: "",
  },
  py3_email: {
    Label: "Email",
    AttributeType: "String",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: -70,
    hidden: false,
    width: "100%",
    caption: "",
  },
  py3_mobilephone: {
    Label: "Mobile Phone",
    AttributeType: "String",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: -69,
    hidden: false,
    width: "100%",
    caption: "",
  },
  py3_gmcnumber: {
    Label: "GMC / IMC number",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: -54,
    hidden: false,
    width: "100%",
    caption: "",
  },
  py3_ntnno: {
    Label:
      "NTN Number (if NTN is not applicable, please state current trainee route)",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 0,
    hidden: false,
    width: "100%",
    caption: "",
  },
  bad_currentpost: {
    Label: "Post / Job Title details",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: -61,
    hidden: false,
    width: "100%",
    caption: "",
  },
  py3_hospitalid: {
    Label: "Main Hospital / Place of Work / Medical School details",
    AttributeType: "Lookup",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: -60,
    hidden: false,
    width: "100%",
    caption: "",
  },
  bad_proposer1: {
    Label: "Supporting Member 1",
    AttributeType: "String",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: -59,
    hidden: false,
    width: "100%",
    caption: "",
  },
  bad_proposer2: {
    Label: "Supporting Member 2",
    AttributeType: "String",
    MaxLength: 101,
    Required: "ApplicationRequired",
    order: -59,
    hidden: false,
    width: "100%",
    caption: "",
  },
  bad_interestinfieldquestion: {
    Label: "Describe your interest",
    AttributeType: "Memo",
    MaxLength: 2000,
    Required: "None",
    order: -56,
    hidden: false,
    width: "100%",
    caption: "",
  },
  bad_mrpcqualified: {
    Label: "MRCP Qualified",
    AttributeType: "Boolean",
    MaxLength: 100,
    Required: "None",
    order: 0,
    hidden: false,
    width: "100%",
    caption: "",
  },
  bad_hasmedicallicence: {
    Label: "License to practice medicine (Y/N)",
    AttributeType: "Boolean",
    MaxLength: 100,
    Required: "None",
    order: 0,
    hidden: false,
    width: "100%",
    caption: "",
  },
  bad_existingsubscriptionid: {
    Label: "Existing Category",
    AttributeType: "Lookup",
    MaxLength: 100,
    Required: "None",
    order: 0,
    hidden: false,
    width: "100%",
    caption: "",
  },
  core_membershipsubscriptionplanid: {
    Label: "New Category",
    AttributeType: "Lookup",
    MaxLength: 100,
    Required: "None",
    order: 0,
    hidden: false,
    width: "100%",
    caption: "",
  },
  bad_newcategorydate: {
    Label: "New Category Date",
    AttributeType: "DateTime",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: 0,
    hidden: false,
    width: "100%",
    caption: "",
  },
  py3_nationality: {
    Label: "Nationality",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 0,
    hidden: false,
    width: "100%",
    caption: "",
  },
  bad_sigapprovalrequestdate: {
    Label: "SIG  Approval Request Date",
    AttributeType: "DateTime",
    MaxLength: 100,
    Required: "None",
    order: 0,
    hidden: false,
    width: "100%",
    caption: "",
  },
  bad_noofdayswithsig: {
    Label: "No of Days with SIG",
    AttributeType: "Integer",
    MaxLength: 100,
    Required: "None",
    order: 0,
    hidden: false,
    width: "100%",
    caption: "",
  },
  py3_address1ine1: {
    Label: "Home Address",
    AttributeType: "String",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: -68,
    hidden: false,
    width: "100%",
    caption: "",
  },
  py3_addressline2: {
    Label: "",
    Placeholder: "Address Line 2",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: -67,
    hidden: false,
    width: "100%",
    caption: "",
  },
  py3_addresstowncity: {
    Label: "",
    Placeholder: "Address Town/City",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: -66,
    hidden: false,
    width: "100%",
    caption: "",
  },
  py3_addressline3: {
    Label: "",
    Placeholder: "Address Line 3",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: -65,
    hidden: false,
    width: "100%",
    caption: "",
  },
  py3_addresscountystate: {
    Label: "",
    Placeholder: "Address County/State",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: -64,
    hidden: false,
    width: "100%",
    caption: "",
  },
  py3_addresszippostalcode: {
    Label: "",
    Placeholder: "Address Zip/Postal Code",
    AttributeType: "String",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: -63,
    hidden: false,
    width: "100%",
    caption: "",
  },
  py3_addresscountry: {
    Label: "",
    Placeholder: "Address Country",
    AttributeType: "String",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: -62,
    hidden: false,
    width: "100%",
    caption: "",
  },
  bad_expectedyearofqualification: {
    Label: "Expected Year of Qualification",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: 0,
    hidden: false,
    width: "100%",
    caption: "",
  },
  bad_qualifications: {
    Label: "Qualifications",
    AttributeType: "Memo",
    MaxLength: 500,
    Required: "None",
    order: -55,
    hidden: false,
    width: "100%",
    caption: "",
  },
  core_accountid: {
    Label: "SIG",
    AttributeType: "Lookup",
    MaxLength: 100,
    Required: "None",
    order: 0,
    hidden: false,
    width: "100%",
    caption: "",
  },
  bad_organisedfor: {
    Label: "Organised For",
    AttributeType: "Picklist",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: 0,
    hidden: false,
    width: "100%",
    caption: "",
  },
  bad_applicationfor: {
    Label: "Application for",
    AttributeType: "Picklist",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: 0,
    hidden: false,
    width: "100%",
    caption: "",
  },
  transactioncurrencyid: {
    Label: "Currency",
    AttributeType: "Lookup",
    MaxLength: 100,
    Required: "None",
    order: 0,
    hidden: false,
    width: "100%",
    caption: "",
  },
  bad_psychodermatologycategory: {
    Label: "Membership Category Type",
    AttributeType: "Picklist",
    MaxLength: 100,
    Required: "None",
    order: 0,
    hidden: false,
    width: "100%",
    caption: "",
  },
  formus_clinicalspecialtysofpractice: {
    Label: "Clinical Specialty(s) of practice",
    AttributeType: "Virtual",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: -54,
    hidden: false,
    width: "100%",
    caption: "",
  },
  formus_fixedtermtemporaryreasonforemploymentcont: {
    Label: "Fixed term/temporary reason for employment contract",
    AttributeType: "Picklist",
    MaxLength: 100,
    Required: "None",
    order: -51,
    hidden: false,
    width: "100%",
    caption: "",
  },
  formus_jobrole: {
    Label: "Job Role",
    AttributeType: "Picklist",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: -61,
    hidden: false,
    width: "100%",
    caption: "",
  },
  formus_mainspecialtyqualification: {
    Label: "Main Specialty Qualification",
    AttributeType: "Virtual",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: -55,
    hidden: false,
    width: "100%",
    caption: "",
  },
  formus_othermainspecialtyqualification: {
    Label: "Other Main Specialty Qualification",
    AttributeType: "String",
    MaxLength: 200,
    Required: "None",
    order: 20,
    hidden: false,
    width: "100%",
    caption: "",
  },
  formus_otherreasonformovingccstdate: {
    Label: "Other Reason for moving CCST date",
    AttributeType: "String",
    MaxLength: 200,
    Required: "None",
    order: -55,
    hidden: false,
    width: "100%",
    caption: "",
  },
  formus_privatepracticeorganisation: {
    Label: "Private Practice Organisation",
    AttributeType: "Picklist",
    MaxLength: 100,
    Required: "None",
    order: -48,
    hidden: false,
    width: "100%",
    caption: "",
  },
  formus_professionalregistrationbody: {
    Label: "Professional Registration Body",
    AttributeType: "Picklist",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: -59,
    hidden: false,
    width: "100%",
    caption: "",
  },
  formus_professionalregistrationstatus: {
    Label: "Professional Registration Status",
    AttributeType: "Picklist",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: -58,
    hidden: false,
    width: "100%",
    caption: "",
  },
  formus_qualificationtype: {
    Label: "Qualification Type",
    AttributeType: "Picklist",
    MaxLength: 100,
    Required: "None",
    order: -56,
    hidden: false,
    width: "100%",
    caption: "",
  },
  formus_reasonformovingccstdate: {
    Label: "Reason for moving CCST date",
    AttributeType: "Picklist",
    MaxLength: 100,
    Required: "None",
    order: -47,
    hidden: false,
    width: "100%",
    caption: "",
  },
  formus_residencystatus: {
    Label: "Residency Status",
    AttributeType: "Picklist",
    MaxLength: 100,
    Required: "None",
    order: -57,
    hidden: false,
    width: "100%",
    caption: "",
  },
  formus_rotapattern: {
    Label: "Rota Pattern",
    AttributeType: "Picklist",
    MaxLength: 100,
    Required: "None",
    order: -50,
    hidden: false,
    width: "100%",
    caption: "",
  },
  formus_specialiseddermatologyareasofpractice: {
    Label: "Specialised Dermatology Areas of practice",
    AttributeType: "Virtual",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: -53,
    hidden: false,
    width: "100%",
    caption: "",
  },
  formus_staffgroupcategory: {
    Label: "Staff Group Category",
    AttributeType: "Picklist",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: -62,
    hidden: false,
    width: "100%",
    caption: "",
  },
  formus_typeofcontract: {
    Label: "Type of Contract",
    AttributeType: "Picklist",
    MaxLength: 100,
    Required: "ApplicationRequired",
    order: -52,
    hidden: false,
    width: "100%",
    caption: "",
  },
  formus_typeofpractice: {
    Label: "Type of Practice",
    AttributeType: "Picklist",
    MaxLength: 100,
    Required: "None",
    order: -49,
    hidden: false,
    width: "100%",
    caption: "",
  },
  formus_otherqualificationtype: {
    Label: "Other Qualification Type",
    AttributeType: "String",
    MaxLength: 100,
    Required: "None",
    order: -56,
    hidden: false,
    width: "100%",
    caption: "",
  },
};

export const BAD_STEP_ONE_FORM_CONFIG = {};
export const BAD_STEP_TWO_FORM_CONFIG = {};
export const BAD_STEP_THREE_FORM_CONFIG = {
  py3_title: {},
  py3_firstname: {},
  py3_lastname: {},
  py3_gender: {},
  py3_dateofbirth: {},
  py3_email: {},
  py3_mobilephone: {},
  py3_address1ine1: {},
  py3_addressline2: {},
  py3_addresscountystate: {},
  py3_addresszippostalcode: {},
  py3_addresscountry: {},
};
export const BAD_STEP_FOUR_FORM_CONFIG = {
  formus_staffgroupcategory: {},
  formus_jobrole: {},
  py3_hospitalid: {},
  sky_newhospitaltype: {},
  bad_newhospitaladded: {},
  sky_newhospitalname: {},
  formus_professionalregistrationbody: {},
  formus_professionalregistrationstatus: {},
  formus_residencystatus: {},
  formus_qualificationtype: {},
  formus_otherqualificationtype: {}, // 👉 conditional field
  formus_otherreasonformovingccstdate: {}, // 👉 conditional field (Trainee only)
  formus_mainspecialtyqualification: {}, // 👉 conditional field & 👉 multi picker
  formus_clinicalspecialtysofpractice: {}, // 👈 multi picker
  formus_specialiseddermatologyareasofpractice: {}, // 👈 multi picker
  formus_typeofcontract: {},
  formus_fixedtermtemporaryreasonforemploymentcont: {},
  formus_rotapattern: {},
  formus_typeofpractice: {},
  formus_privatepracticeorganisation: {},
  formus_reasonformovingccstdate: {},
};

export const BAD_STEP_FIVE_FORM_CONFIG = {
  bad_proposer1: {},
  bad_proposer2: {},
  bad_preferredmailingaddress: {},
  sky_cvurl: {},
  bad_memberdirectory: {},
  py3_constitutionagreement: {},
  bad_readpolicydocument: {},
};

export const colors = {
  primary: "#1F335E",
  secondary: "#34BE82",
  blue: "#3882CD",
  ocean: "#3882CD",
  yellow: "#F2F013",
  white: "#FFFF",
  darkGrey: "#404040",
  trueBlack: "#000",
  black: "#000000",
  softBlack: "#454545",
  danger: "#EF476F",
  silver: "#ced4da",
  lightSilver: "#F0F1F4",
  darkSilver: "#A2A2A2",
  silverFillOne: "#F5F6F7",
  silverFillTwo: "#E3E7EA",
  textSoftBlack: "#707070",
  textBlack: "#171717",
  shade: "rgba(0, 0, 0, 0.25)",
  shadeIntense: "rgba(0, 0, 0, 0.5)",
  footer: "#292929",
  disabled: "#e9ecef",
  // background colours
  bgLight: "rgb(230,230,230, 0.7)",
  bgNavy: "#EFF7F9",
  bgPink: "#FCEFF0",
  // app Colours
  maroon: "#842057",
  pink: "#EF476F",
  orange: "#EF7D21",
  turquoise: "#17A2B8",
  red: "#DC3545",
  yellow: "#FFC107",
  navy: "#1E335D",
  green: "#80b918",
  darkGreen: "#29A74C",
};

export const group_810170000 = [
  "Associate Postgraduate Dean",
  "Associate Specialist (Closed to new entrants)",
  "Clinical Assistant (Closed to new entrants)",
  "Clinical Director - Medical",
  "Clinical Medical Officer (Closed to new entrants)",
  "Consultant",
  "Foundation Year 1",
  "Foundation Year 2",
  "General Medical Practitioner",
  "Hospital Practitioner (Closed to new entrants)",
  "Medical Director",
  "Professor",
  "Senior Lecturer",
  "Specialist",
  "Specialty Doctor",
  "Specialty Registrar",
  "Staff Grade (Closed to new entrants)",
  "Trust Grade Doctor - Career Grade level",
  "Trust Grade Doctor - Foundation Level",
  "Trust Grade Doctor - Specialty Registrar",
];

export const group_810170001 = [
  "Medical Student",
  "Student Physiotherapist",
  "Student Practice Nurse",
  "Student Psychotherapist",
];

export const group_810170002 = [
  "Advanced Practitioner",
  "Community Nurse",
  "Community Practitioner",
  "Director of Nursing",
  "Enrolled Nurse",
  "Extended Role Practice Nurse",
  "Nurse - Advanced Practitioner",
  "Nurse Consultant",
  "Nurse Manager",
  "Practice Research Nurse",
  "Sister/Charge Nurse",
  "Trainee Advanced Practitioner",
];

export const group_810170003 = [
  "Advanced Practitioner",
  "Chiropodist/Podiatrist",
  "Chiropodist/Podiatrist Advanced Practitioner",
  "Chiropodist/Podiatrist Consultant",
  "Chiropodist/Podiatrist Specialist Practitioner",
  "Physiotherapist Advanced Practitioner",
  "Physiotherapist Consultant",
  "Physiotherapist Manager",
  "Physiotherapist Specialist Practitioner",
  "Prosthetist",
  "Prosthetist Advanced Practitioner",
  "Prosthetist Consultant",
  "Prosthetist Manager",
  "Prosthetist Specialist Practitioner",
];

export const group_810170004 = [
  "Advanced Practitioner",
  "Applied Psychologist – Clinical",
  "Applied Psychologist – Counselling",
  "Applied Psychologist – Educational",
  "Applied Psychologist – Forensic",
  "Applied Psychologist – Health",
  "Applied Psychologist – Neuropsychologist",
  "Applied Psychologist – Occupational",
  "Applied Psychologist – Sport and Exercise",
  "Approved Mental Health Professional",
  "Pharmacist",
  "Physician Associate",
  "Play Therapist",
  "Practitioner",
  "Psychotherapist",
  "Trainee Advanced Practitioner",
  "Trainee Clinical Psychologist",
  "Trainee Counselling Psychologist",
  "Trainee Health Psychologist",
  "Trainee High Intensity Therapist",
  "Trainee Other Applied Psychologist",
];

export const group_810170005 = [
  "Consultant Healthcare Scientist",
  "Healthcare Science Practitioner Advanced Practitioner",
  "Healthcare Science Practitioner",
  "Healthcare Scientist Advanced Practitioner",
  "Healthcare Scientist",
  "Manager",
  "Health Care Support Worker",
  "Healthcare Assistant",
  "Healthcare Cadet",
  "Healthcare Science Assistant",
  "Healthcare Science Associate",
  "Phlebotomist",
  "Play Specialist",
  "Play Therapist",
  "Pre-reg Pharmacist",
  "Psychological Wellbeing Practitioner",
  "Trainee Healthcare Science Associate",
  "Trainee Healthcare Science Practitioner",
  "Trainee Healthcare Scientist",
  "Trainee Nursing Associate",
  "Trainee Pharmacist",
  "Trainee Practitioner",
  "Trainee Psychological Wellbeing Practitioner",
  "Trainee Scientist",
];

export const group_810170006 = ["GPwER", "GPwSI"];
