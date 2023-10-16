import React from "react";
import styles from "../../styles/Username.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordValidation } from "../../helper/validate";
import { resetPassword } from "../../helper/helper";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { reset_page } from "../../config/AuthConfig";

const Reset = () => {
  const { username } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();
  const [{ isLoading, apiData, status, serverError }] =
    useFetch("createResetSession");

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_pwd: "",
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let resetPromise = resetPassword({ username, password: values.password });

      toast.promise(resetPromise, {
        loading: "Updating...",
        success: <b> {reset_page.resetSuccess} </b>,
        error: <b> {reset_page.error} </b>,
      });

      resetPromise.then(function () {
        navigate("/password");
      });
    },
  });

  if (isLoading) return <h1 className="text-2xl font-bold">{reset_page.isLoading}</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
  if (status && status !== 201)
    return <Navigate to={"/password"} replace={true}></Navigate>;

  return (
    <div className="container mx-auto">
      <Toaster position="top center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center  h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">{reset_page.reset}</h4>
            <span className="py-4 text-xl w-2/3 text-center grey-500">
              {reset_page.enterNewPassword}
            </span>
          </div>

          <form className="pt-20" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="text"
                placeholder = {reset_page.newPassword}
              />
              <input
                {...formik.getFieldProps("confirm_pwd")}
                className={styles.textbox}
                type="text"
                placeholder = {reset_page.confirmPassword}
              />
              <button className={styles.btn} type="submit">
                {reset_page.signin}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
