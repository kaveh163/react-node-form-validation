import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useReducer, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../Form.css";

const initialValue = { loading: null, data: null, error: null };
const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
function Form() {
  const [userInput, setUserInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [confirmInput, setConfirmInput] = useState("");
  const [email, setEmail] = useState("");

  const [data, dispatch] = useReducer(reducer, initialValue);
  const [isEye, setIsEye] = useState(true);
  const spanElement = useRef();
  const passElement = useRef();
  const userElement = useRef();
  const confirmElement = useRef();
  const emailElement = useRef();
  console.log("state");
  const handleEyeIcon = () => {
    // console.log('handleEye');
    // console.log(spanElement);
    console.log("befor setEye");
    setIsEye(!isEye);
    console.log("after setEye");
    const iconElement = spanElement.current && spanElement.current.children[0];
    // iconElement.removeAttribute('icon')
    // console.log("passwordElement", passElement);
    // console.log("icon", iconElement);
    if (isEye) {
      passElement.current.setAttribute("type", "text");
    } else {
      passElement.current.setAttribute("type", "password");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submit");
    const userValue = userElement.current.value;
    console.log("user", userValue);
    const passValue = passElement.current.value;
    console.log("pass", passValue);
    const confirmVal = confirmElement.current.value;
    console.log("confirm", confirmVal);
    const emailVal = emailElement.current.value;
    console.log("email", emailVal);

    fetch("/api", {
      method: "POST",
      body: JSON.stringify({
        username: userValue,
        password: passValue,
        confirmPass: confirmVal,
        email: emailVal,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };
  console.log("return");
  return (
    <>
      <section className="row mt-2">
        <section className="col-md-6 offset-md-3" id="formWrapper">
          <form
            action="https://www.google.com/"
            className="row g-3 was-validated"
          >
            <div className="col-12">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <div className="input-group has-validation">
                <span className="input-group-text">@</span>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  ref={userElement}
                  required
                />
                <div id="UsernameFeedback" className="invalid-feedback">
                  Please provide username.
                </div>
                <div className="valid-feedback"></div>
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-group has-validation">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  ref={passElement}
                  required
                />
                <span className="input-group-text" ref={spanElement}>
                  <FontAwesomeIcon
                    icon={isEye ? "eye" : "eye-slash"}
                    onClick={handleEyeIcon}
                  />
                </span>
                <div id="PasswordFeedback" className="invalid-feedback">
                  Password must be minimum 8 characters.
                </div>
                <div className="valid-feedback"></div>
              </div>
            </div>
            <div className="col-12">
              <label htmlFor="passConfirm" className="form-label">
                Confirm password
              </label>
              <input
                type="password"
                className="form-control"
                id="passConfirm"
                name="passConfirm"
                ref={confirmElement}
                required
              />
              <div className="invalid-feedback" id="ConfirmPasswordFeedback">
                confirm password does not match password
              </div>
              <div className="valid-feedback"></div>
            </div>
            <div className="col-12">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                ref={emailElement}
                required
              />
              <div className="invalid-feedback" id="EmailFeedback">
                email must be valid
              </div>
              <div className="valid-feedback"></div>
            </div>

            <div className="col-12">
              <button
                className="btn btn-primary mb-2"
                onClick={handleSubmit}
                type="submit"
              >
                Submit form
              </button>
            </div>
          </form>
        </section>
      </section>
    </>
  );
}

export default Form;
