import {
  authenticateAppAction,
  setFetchAction,
  setEnquireAction,
} from "../index";

export const sendEmailEnquireAction = async ({
  state,
  dispatch,
  formData,
  attachments,
  recipients,
}) => {
  console.log("enquireAction triggered");

  setFetchAction({ dispatch, isFetching: true });
  const URL = state.auth.APP_HOST + `/email`;
  const jwt = await authenticateAppAction({ state });

  try {
    if (!recipients) throw new Error("No Recipients Provided");

    let recipientsArray = [];
    recipients.map((item) => {
      recipientsArray.push(item.email);
    });

    const recipientsList = recipientsArray.toString();

    let fileAttachmentList = null;
    if (attachments) fileAttachmentList = Object.values(attachments); // add attachments to array

    const form = new FormData(); // create form object to sent email content & attachments
    form.append("email", recipientsList);
    form.append("template", "SampleEmailTemplate");
    form.append("data", `${formData}`);
    // map files if attachments are provided
    if (fileAttachmentList)
      fileAttachmentList.map((file) => {
        form.append("attachments", file, file.name);
      });

    const requestOptions = {
      method: "POST",
      headers: { Authorization: `Bearer ${jwt}` },
      body: form,
    };

    const data = await fetch(URL, requestOptions);
    const response = await data.json();
    if (response.success) {
      return response;
    }
  } catch (error) {
    console.log("error", error);
  } finally {
    setFetchAction({ dispatch, isFetching: false });
    setEnquireAction({ dispatch, enquireAction: null });
  }
};
