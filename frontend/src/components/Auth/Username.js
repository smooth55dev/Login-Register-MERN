import React from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../assets/profile.png";
import logo from "../../assets/logo.png";
import { user_name } from "../../config/AppConfig";
import styles from "../../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { usernameValidate } from "../../helper/validate";
import { useDispatch } from "react-redux";
import { setUserName } from "../../store/authSlice";

const Username = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      dispatch(setUserName(values.username));
      navigate("/password");
    },
    
  });
  return (
    <div className="container mx-auto">
      <Toaster position="top center" reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center  h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">
              <div className="flex">
                ミル
                <img className={styles.logo_img} src={logo} alt="avatar" />
                コマ
              </div>
            </h4>
            <span className="py-4 text-xl w-2/3 text-center grey-500">
              {user_name.content}
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img className={styles.profile_img} src={avatar} alt="avatar" />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("username")}
                className={styles.textbox}
                type="text"
                placeholder={user_name.username_placeholder}
              />
              <button className={styles.btn} type="submit">
              {user_name.next}
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
              {user_name.noMember}
                <Link className={styles.link} to="/register">
                {user_name.register}
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Username;
