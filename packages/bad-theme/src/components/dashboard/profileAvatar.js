import { connect } from "frontity";
import Image from "@frontity/components/image";
import Avatar from "../../img/svg/profile.svg";
import { colors } from "../../config/colors";

// CONTEXT ----------------------------------------------------------------
import { useAppState, muiQuery } from "../../context";

const ProfileAvatar = ({ state, actions, libraries, isPreview }) => {
  const { sm, md, lg, xl } = muiQuery();
  const { isActiveUser } = useAppState();

  if (!isActiveUser) return null;

  const { bad_listname, bad_profile_photo_url } = isActiveUser;
  const profilePicture = isPreview || bad_profile_photo_url;
  const alt = bad_listname || "Profile Picture";
  let imgWidth = 350;
  if (xl) {
    imgWidth = 200;
  } else {
    imgWidth = 350;
  }

  return (
    <div
      className="flex"
      style={{ justifyContent: !lg ? "flex-end" : "center" }}
    >
      <div
        style={{
          width: imgWidth,
          height: imgWidth,
          borderRadius: `50%`,
          overflow: `hidden`,
          margin: "3em 0 0 0",
          // add border if image set by user
          border: profilePicture ? `1px solid ${colors.silver}` : "none",
        }}
      >
        <Image
          src={profilePicture || Avatar}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {},
};

export default connect(ProfileAvatar);
