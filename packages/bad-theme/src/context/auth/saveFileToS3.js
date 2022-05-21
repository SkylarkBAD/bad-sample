import { v4 as uuidv4 } from "uuid";
import { setFetchAction, fetchDataHandler } from "../index";

export const sendFileToS3Action = async ({ state, dispatch, attachments }) => {
  console.log("sendFileToS3Action triggered");

  setFetchAction({ dispatch, isFetching: true });
  const path = state.auth.APP_HOST + `/s3/profile/image`;

  // extract file extension name from attachment
  const fileExtension = attachments.name.split(".").pop();
  // const uniqueName = uuidv4(); // generate unique name for file
  let name = attachments.name.split(".").slice(0, -1).join(".");
  // if name is empty string set to unique name
  if (name === "") name = uuidv4();
  // const uniqueName = attachments.name;
  let fileName = name + "." + fileExtension;
  // if (isNoFileExtention) fileName = uniqueName; // 📌 dont add extension to picture files

  const form = new FormData(); // create form object to sent email content & attachments
  form.append("profile", attachments, fileName); // append file to form object

  const requestOptions = {
    method: "PUT",
    body: form,
    credentials: "include",
  };

  try {
    const response = await fetch(path, requestOptions);
    const data = await response.json();
    if (data.success) {
      console.log("🐞 S3 IMAGE URL ", data.data); // debug

      return data.data;
    }
  } catch (error) {
    // console.log("error", error);
  } finally {
    setFetchAction({ dispatch, isFetching: false });
  }

  // try {
  //   const response = await fetchDataHandler({
  //     path,
  //     method: "PUT",
  //     body: form,
  //     state,
  //     // 📌 pass headers as multipart/form-data
  //     headers: {
  //       "Content-Type": "multipart/form-data;",
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       "Content-Type": "application/json; charset=utf-8",
  //     },
  //   });
  //   const data = await response.json();

  //   if (data.success) {
  //     return data.data;
  //   }
  // } catch (error) {
  //   // console.log("error", error);
  // } finally {
  //   setFetchAction({ dispatch, isFetching: false });
  // }
};
