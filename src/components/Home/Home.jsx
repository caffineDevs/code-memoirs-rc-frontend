import React, { useEffect, useState } from "react";
import Highlight from "react-highlight";
import plusBtn from "../../assets/plsu.svg";
import deleteIcon from "../../assets/delete.svg";
import Form from "../Form/Form";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import loader from "../../loader.svg";
import { setFormSubmission } from "../../actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [showModal, setShowModal] = React.useState(false);
  const [codeSnippets, setCodeSnippets] = useState([]);
  const [tags, setTags] = useState([]);
  const bgColors = [
    "bg-pink-100",
    "bg-red-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
  ];
  const getRandomColors = (colorsPallete) => {
    let index = Math.floor(Math.random() * colorsPallete.length);
    return colorsPallete[index];
  };
  useEffect(() => {
    axios.get("https://code-memoirs-backend.herokuapp.com/get").then((res) => {
      setCodeSnippets(res.data.snippets);
      setTags(res.data.tags);
    });
  }, []);

  const formData = useSelector((formData) => formData);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(setFormSubmission(true));
    axios
      .post("https://code-memoirs-backend.herokuapp.com/addSnip", formData)
      .then((res) => {
        setCodeSnippets([...codeSnippets, formData]);
        dispatch(setFormSubmission(false));
        setShowModal(false);
        setTags((prevTags) => {
          formData._id = res.data.snippetId;
          const tagsTemp = prevTags.concat(formData.tags);
          return Array.from(new Set(tagsTemp));
        });
        notify("Snippet Added");
      });
  };
  const copyText = (index) => {
    const text = document.querySelectorAll(".code-snippet")[index].innerText;

    var element = document.createElement("textarea");
    document.body.appendChild(element);
    element.value = text;

    element.select();
    document.execCommand("copy");

    document.body.removeChild(element);
  };
  const notify = (msg) => toast.success(msg);

  const handleDeletion = (index) => {
    const id = codeSnippets[index]._id;
    axios
      .delete(`https://code-memoirs-backend.herokuapp.com/delSnip/${id}`)
      .then((res) => {
        setCodeSnippets(codeSnippets.filter((snippet) => snippet._id != id));
      });
  };
  return (
    <>
      <div className="add-snippet-btn">
        <img
          src={plusBtn}
          width="50px"
          className="cursor-pointer"
          onClick={() => setShowModal(true)}
        />
      </div>
      <div className="w-screen grid grid-cols-12">
        <div className="lhs-navigationasdasfas col-span-3 p-5">
          <div className="fixed tags-width">
            <div className="flex flex-wrap">
              {!!tags.length &&
                tags.map((tag, index) => {
                  return (
                    <span
                      className={`text-lowercase inline-flex m-2 ${getRandomColors(
                        bgColors
                      )} text-gray-500 text-xs rounded-full h-6 px-3 justify-center items-center`}
                      key={`tag_${index}`}
                    >
                      #{tag}
                    </span>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="col-span-6">
          {codeSnippets && codeSnippets?.length ? (
            codeSnippets.map((snippet, index) => {
              return (
                <div key={`code_clip_${index}`} className="my-5">
                  <h2 className="heading text-3xl capitalize">
                    {snippet.heading}
                  </h2>
                  <h3 className="sub-heading text-md capitalize">
                    {snippet.subHeading}
                  </h3>
                  <div className="notes capitalize italic text-yellow-400 mt-2 mb-4">
                    {" "}
                    {snippet.notes ? `Note :  ${snippet.notes}` : ""}
                  </div>
                  {snippet.snippet && (
                    <div className="code-card relative">
                      <Highlight className="javascript border p-5 text-sm bg-white rounded my-3 code-snippet">
                        {snippet.snippet}
                      </Highlight>
                      {snippet.snippet && (
                        <svg
                          style={{
                            height: "20px",
                            top: "10px",
                            right: "10px",
                          }}
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fad"
                          data-icon="paste"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          className="absolute cursor-pointer"
                          onClick={() => copyText(index)}
                        >
                          <g>
                            <path
                              fill="#62738d"
                              d="M320 264V160H184a24 24 0 0 0-24 24v304a24 24 0 0 0 24 24h240a24 24 0 0 0 24-24V288H344a24.07 24.07 0 0 1-24-24zm121-31l-66-66a24 24 0 0 0-17-7h-6v96h96v-6.06a24 24 0 0 0-7-16.94z"
                            />
                            <path
                              fill="#62738d"
                              d="M296 32h-80.61a63.94 63.94 0 0 0-110.78 0H24A24 24 0 0 0 0 56v336a24 24 0 0 0 24 24h104V184a56.06 56.06 0 0 1 56-56h136V56a24 24 0 0 0-24-24zM160 88a24 24 0 1 1 24-24 24 24 0 0 1-24 24z"
                            />
                          </g>
                        </svg>
                      )}
                      <img
                        src={deleteIcon}
                        alt="delete-icon"
                        className="deleteIcon"
                        onClick={() => handleDeletion(index)}
                      />
                    </div>
                  )}
                  <div className="images">
                    <img src={snippet.images} />
                  </div>
                </div>
              );
            })
          ) : (
            <img className="vc" src={loader} />
          )}

          {/* <div className="add-snippet-btn">
            <img
              src={plusBtn}
              width="50px"
              className="cursor-pointer"
              onClick={() => setShowModal(true)}
            />
          </div> */}
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none modals-body">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="relative p-6 flex-auto">
                      <Form />
                    </div>

                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                      <button
                        className="bg-red-100 text-red-600 active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mr-4"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-blue-100 text-blue-600 active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={handleSubmit}
                      >
                        Add Snippet
                      </button>
                    </div>
                  </div>
                </div>
                {formData.isSubmitting && <img className="vc" src={loader} />}
              </div>
              <div
                className="opacity-25 fixed inset-0 z-40 bg-black"
                onClick={(e) => {
                  setShowModal(false);
                }}
              ></div>
            </>
          ) : null}
        </div>
      </div>

      {/* <div className="toastr">
        <div className="space-x-2 bg-green-50 p-4 rounded flex items-center text-green-600 mb-4 shadow-lg mx-auto max-w-2xl">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current w-5 pt-1"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z" />
            </svg>
          </div>
          <h3 className="text-green-800 tracking-wider flex-1">
            Successfull operation
          </h3>
          <button className="inline-flex items-center hover:bg-green-100 border border-green-50 hover:border-green-300 hover:text-green-900 focus:outline-none rounded-full p-2 hover:cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current w-4 h-4 pt-1"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
            </svg>
          </button>
        </div>
      </div> */}

      <ToastContainer />
    </>
  );
}

export default Home;
