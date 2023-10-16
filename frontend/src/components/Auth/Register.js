import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../assets/profile.png";
import styles from "../../styles/Register.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidation } from "../../helper/validate";
import convertToBase64 from "../../helper/convert";
import { registerUser } from "../../helper/helper";
import { register_page } from "../../config/AuthConfig";

const Register = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = Object.assign(values, { profile: file || "" });
      let registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: register_page.creating,
        success: <b>{register_page.registerSuccess}</b>,
        error: <b>{register_page.registerError}</b>,
      });

      registerPromise.then(function () {
        navigate("/");
      });
    },
  });

  // formik doesn't support file upload so we need to create this handler

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center  h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">{register_page.register}</h4>
            <span className="py-4 text-xl w-2/3 text-center grey-500">
              {register_page.registerComment}
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  className={styles.profile_img}
                  src={file || avatar}
                  alt="avatar"
                />
              </label>
              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profle"
              />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("email")}
                className={styles.textbox}
                type="text"
                placeholder = {register_page.email}
              />
              <input
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type="text"
                placeholder = {register_page.username}
              />
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="text"
                placeholder = {register_page.password}
              />
              <button className={styles.btn} type="submit">
              {register_page.register}
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                {register_page.alreadyRegister}
                <Link className={styles.link} to="/">
                  {register_page.loginNow}
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
