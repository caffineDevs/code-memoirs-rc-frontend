export const SET_HEADING = "SET_HEADING";
export const SET_SUB_HEADING = "SET_SUB_HEADING";
export const SET_DESCRIPTION = "SET_DESCRIPTION";
export const SET_NOTES = "SET_NOTES";
export const SET_IMAGES = "SET_IMAGES";
export const SET_SUBMISSION = "SET_SUBMISSION";
export const SET_TAGS = "SET_TAGS";
export const SET_SNIPPET = "SET_SNIPPET";

export function setHeading(value) {
  return {
    type: SET_HEADING,
    heading: value,
  };
}

export function setSubHeading(value) {
  return {
    type: SET_SUB_HEADING,
    subHeading: value,
  };
}
export function setDescription(value) {
  return {
    type: SET_DESCRIPTION,
    description: value,
  };
}
export function setNotes(value) {
  return {
    type: SET_NOTES,
    notes: value,
  };
}
export function setImages(value) {
  return {
    type: SET_IMAGES,
    images: value,
  };
}

export function setFormSubmission(value) {
  console.log("got it", value);
  return {
    type: SET_SUBMISSION,
    isSubmitting: value,
  };
}

export function setTags(value) {
  let tags = value.split(",").map((item) => item.trim());
  return {
    type: SET_TAGS,
    tags: tags,
  };
}

export function setSnippet(value) {
  return {
    type: SET_SNIPPET,
    snippet: value,
  };
}
