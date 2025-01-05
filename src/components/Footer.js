import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <hr className="border-gray-200 sm:mx-auto dark:border-gray-700 md:my-8" />
          <div className="flex flex-col md:flex-row items-center gap-y-4 pt-4  flex-wrap md:justify-between">
            <div className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © {currentYear} <span>ashaTai</span>. All Rights Reserved.
            </div>

            <div className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              made with ❤️ by @
              <Link
                target="_blank"
                to="https://www.github.com/vaibhav25-mnnit/"
                className="hover:underline"
              >
                vaibhav
              </Link>
              .
            </div>

            <div className="flex mt-4 sm:justify-center sm:mt-0">
              <Link
                target="_blank"
                to="https://www.github.com/vaibhav25-mnnit/"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className="sr-only">GitHub account</span>
              </Link>

              <Link
                target="_blank"
                to="https://www.linkedin.com/in/vaibhav-bagate/"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill="evenodd"
                    d="M21,21H17V14.25C17,13.19 15.81,12.31 14.75,12.31C13.69,12.31 13,13.19 13,14.25V21H9V9H13V11C13.66,9.93 15.36,9.24 16.5,9.24C19,9.24 21,11.28 21,13.75V21M7,21H3V9H7V21M5,3A2,2 0 0,1 7,5A2,2 0 0,1 5,7A2,2 0 0,1 3,5A2,2 0 0,1 5,3Z"
                  />
                </svg>
                <span className="sr-only">Linkedin account</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
