import React, { useEffect, useState } from "react";
import Highlight from "react-highlight";
import plusBtn from "../../assets/plsu.svg";
import Form from "../Form/Form";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import loader from "../../loader.svg";
import { setFormSubmission } from "../../actions";

function Home() {
  const [showModal, setShowModal] = React.useState(false);
  const [codeSnippets, setCodeSnippets] = useState([]);
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
    });
  }, []);

  const formData = useSelector((formData) => formData);
  console.log(formData, "formData");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(setFormSubmission(true));
    axios
      .post("https://code-memoirs-backend.herokuapp.com/addSnip", formData)
      .then((res) => {
        setCodeSnippets([...codeSnippets, formData]);
        dispatch(setFormSubmission(false));
        setShowModal(false);
      });
  };
  const copyText = () => {
    const text = document.querySelector(".code-snippet").innerText;

    var element = document.createElement("textarea");
    document.body.appendChild(element);
    element.value = text;

    element.select();
    document.execCommand("copy");

    document.body.removeChild(element);
    console.log(text);
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
          {!!formData.tags.length &&
            formData.tags.map((tag, index) => {
              return (
                <span
                  className={`inline-flex m-2 ${getRandomColors(
                    bgColors
                  )} text-gray-500 text-xs rounded-full h-6 px-3 justify-center items-center`}
                  key={`tag_${index}`}
                >
                  #{tag}
                </span>
              );
            })}
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
                  <div className="notes capitalize italic text-yellow-400">
                    {" "}
                    {snippet.notes ? `Note: ${snippet.notes}` : ""}
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
                          onClick={copyText}
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
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
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
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Home;
