import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch } from "react-redux";

import {
  setHeading,
  setSubHeading,
  setDescription,
  setNotes,
  setImages,
  setTags,
  setSnippet,
} from "../../actions";

function Form(props) {
  const [codeSnippet, setcodeSnippet] = useState("");
  const [UploadFile, setUploadFile] = useState({});
  const [UplaodImgBase64, setUplaodImgBase64] = useState("");
  const dispatch = useDispatch();

  const handleCodeSnippetChange = (e) => {
    setcodeSnippet(e.target.value);
    dispatch(setDescription(e.target.value));
  };

  const handleFileUpload = async (files) => {
    setUploadFile(files[0]);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setUplaodImgBase64(reader.result);
      dispatch(setImages(reader.result));
    });
    reader.readAsDataURL(files[0]);
  };

  return (
    <>
      <div className="flex items-center">
        <div className="container mx-auto">
          <div className="max-w-xl mx-auto bg-white">
            <div className="m-7">
              <div>
                <div className="flex space-x-4">
                  <div className="mb-6">
                    <input
                      type="text"
                      onChange={(e) => dispatch(setHeading(e.target.value))}
                      placeholder="Heading"
                      className="w-full text-gray-500 px-3 py-2 placeholder-gray-300 border border-gray-500 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      type="text"
                      onChange={(e) => dispatch(setSubHeading(e.target.value))}
                      placeholder="Sub Heading"
                      className="w-full text-gray-500 px-3 py-2 placeholder-gray-300 border border-gray-500 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    />
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="mb-6">
                    <input
                      type="text"
                      onChange={(e) => dispatch(setNotes(e.target.value))}
                      placeholder="Note"
                      className="w-full text-gray-500 px-3 py-2 placeholder-gray-300 border border-gray-500 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      type="text"
                      onChange={(e) => dispatch(setTags(e.target.value))}
                      placeholder="use commas to separate tags"
                      className="w-full text-gray-500 px-3 py-2 placeholder-gray-300 border border-gray-500 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <textarea
                    rows={3}
                    placeholder="Description"
                    className="w-full text-gray-500 px-3 py-2 placeholder-gray-300 border border-gray-500 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                    value={codeSnippet}
                    onChange={handleCodeSnippetChange}
                  />
                </div>

                <div className="mb-6">
                  <textarea
                    rows={8}
                    onChange={(e) => dispatch(setSnippet(e.target.value))}
                    placeholder="Happy coding !"
                    className="w-full text-gray-500 px-3 py-2 placeholder-gray-300 border border-gray-500 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                </div>

                <div className="flex space-x-4">
                  <div className="mb-6">
                    <div className="fileUpload my-5">
                      <Dropzone onDrop={handleFileUpload}>
                        {({ getRootProps, getInputProps }) => (
                          <section className="w-full">
                            <div
                              {...getRootProps()}
                              className="focus:outline-none"
                            >
                              <input {...getInputProps()} accept="image/*" />
                              <p className="border p-5 rounded cursor-pointer text-gray-300 w-52 text-center border-gray-500">
                                Drag 'n' drop some files here, or click to
                                select files
                              </p>
                            </div>
                          </section>
                        )}
                      </Dropzone>
                    </div>
                  </div>
                  <div className="mb-6">
                    <img
                      onChange={() => dispatch(setImages(UplaodImgBase64))}
                      src={UplaodImgBase64}
                      className={
                        "max-w-full mt-5 rounded h-28 " +
                        (UploadFile ? "block" : "hidden")
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     heading: state.heading,
//     subHeading: state.subHeading,
//     notes: state.notes,
//     description: state.description,
//     images: state.images,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     dispatch: (action) => {
//       dispatch(action);
//     },
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Form);

export default Form;
