export const setGoToAction = async ({ path, actions, onClick }) => {
  if (onClick) return onClick();
  if (!path || !actions) return null;

  let isExternalLink = true;
  if (path.includes(`http://3.9.193.188`)) isExternalLink = false;
  if (path.includes(`https://badadmin.skylarkdev.co`)) isExternalLink = false;
  if (!path.includes(`http`)) isExternalLink = false;

  console.log("----", isExternalLink, path);
  if (isExternalLink) return window.open(path, "_blank"); // handle external links
  actions.router.set(path);
};