import {
  SET_HEADING,
  SET_SUB_HEADING,
  SET_DESCRIPTION,
  SET_NOTES,
  SET_IMAGES,
  SET_SUBMISSION,
  SET_TAGS,
  SET_SNIPPET,
} from "./actions";

const formIntialState = {
  heading: "",
  subHeading: "",
  notes: "",
  description: "",
  images: "",
  isSubmitting: false,
  tags: [],
  snippet: "",
};

const reducer = (state = formIntialState, action) => {
  switch (action.type) {
    case SET_HEADING:
      return {
        ...state,
        heading: action.heading,
      };

    case SET_SUB_HEADING:
      return {
        ...state,
        subHeading: action.subHeading,
      };

    case SET_DESCRIPTION:
      return {
        ...state,
        description: action.description,
      };

    case SET_NOTES:
      return {
        ...state,
        notes: action.notes,
      };

    case SET_IMAGES:
      return {
        ...state,
        images: action.images,
      };

    case SET_SUBMISSION:
      return {
        ...state,
        isSubmitting: action.isSubmitting,
      };

    case SET_TAGS:
      return {
        ...state,
        tags: action.tags.map((tag) => `${tag}`),
      };

    case SET_SNIPPET:
      return {
        ...state,
        snippet: action.snippet,
      };

    default:
      return state;
  }
};

export default reducer;
