import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import styles from "../../styles/Username.module.css";
import { generateOTP, verifyOTP } from "../../helper/helper";
import { useNavigate } from "react-router-dom";
import { recovery_page } from "../../config/AuthConfig";

export default function Recovery() {
  const { username } = useSelector((state) => state.authSlice);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      console.log(OTP);
      if (OTP) return toast.success( recovery_page.otpMsgSuccess );
      return toast.error(  recovery_page.otpMsgError);
    });
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code: OTP });
      if (status === 201) {
        toast.success( recovery_page.otpConfirmSuccess );
        return navigate("/reset");
      }
    } catch (error) {
      return toast.error( recovery_page.optConfirmError );
    }
  }

  // handler of resend OTP
  function resendOTP() {
    let sentPromise = generateOTP(username);

    toast.promise(sentPromise, {
      loading: recovery_page.sendingLabel,
      success: <b>{ recovery_page.otpMsgSuccess }</b>,
      error: <b>{ recovery_page.otpCouldnotSend }</b>,
    });

    sentPromise.then((OTP) => {
      //console.log(OTP);
    });
  }

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">{ recovery_page.recoveryLabel }</h4>
            <span className="py-4 text-xl w-2/3 text-center">
              {recovery_page.otpInputLabel}
            </span>
          </div>

          <form className="pt-20" onSubmit={onSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-x w-2/3 text-center">
                  {recovery_page.otpEnterComment}
                </span>
              </div>
              <input
                onChange={(e) => setOTP(e.target.value)}
                className={styles.textbox}
                type="text"
                placeholder="OTP"
              />

              <button className={styles.btn} type="submit">
                {recovery_page.recoveryLabel}
              </button>
            </div>
          </form>

          <div className="text-center py-4">
            <span className="text-gray-500">
              {recovery_page.otpResendComment}{" "}
              <button onClick={resendOTP} className={styles.link}>
                {recovery_page.otpResendLabel}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
