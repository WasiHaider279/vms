"use client"
import React from "react";
import { useResendVerificationEmailMutation } from "@/redux/services/authApi";
import { success,failure } from "@/utils/notifications";

const Step4 = ({email}:any) => {
  const [resendVerificationEmail] = useResendVerificationEmailMutation();
  
  return (
    <div className="flex flex-col gap-4">
    <div className="flex flex-row justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
  <path d="M21.192 9.87819L20.294 8.97919C20.104 8.79019 20 8.53819 20 8.27119V6.99919C20 5.34519 18.654 3.99919 17 3.99919H15.728C15.465 3.99919 15.207 3.89219 15.021 3.70619L14.122 2.80719C12.952 1.63719 11.05 1.63719 9.87996 2.80719L8.97896 3.70619C8.79296 3.89219 8.53496 3.99919 8.27196 3.99919H6.99996C5.34596 3.99919 3.99996 5.34519 3.99996 6.99919V8.27119C3.99996 8.53819 3.89596 8.79019 3.70696 8.97919L2.80796 9.87719C2.24096 10.4442 1.92896 11.1982 1.92896 11.9992C1.92896 12.8002 2.24196 13.5542 2.80796 14.1202L3.70596 15.0192C3.89596 15.2082 3.99996 15.4602 3.99996 15.7272V16.9992C3.99996 18.6532 5.34596 19.9992 6.99996 19.9992H8.27196C8.53496 19.9992 8.79296 20.1062 8.97896 20.2922L9.87796 21.1922C10.463 21.7762 11.231 22.0682 11.999 22.0682C12.767 22.0682 13.535 21.7762 14.12 21.1912L15.019 20.2922C15.207 20.1062 15.465 19.9992 15.728 19.9992H17C18.654 19.9992 20 18.6532 20 16.9992V15.7272C20 15.4602 20.104 15.2082 20.294 15.0192L21.192 14.1212C21.758 13.5542 22.071 12.8012 22.071 11.9992C22.071 11.1972 21.759 10.4442 21.192 9.87819ZM16.555 10.8312L10.555 14.8312C10.386 14.9442 10.192 14.9992 9.99996 14.9992C9.74196 14.9992 9.48596 14.8992 9.29296 14.7062L7.29296 12.7062C6.90196 12.3152 6.90196 11.6832 7.29296 11.2922C7.68396 10.9012 8.31596 10.9012 8.70695 11.2922L10.127 12.7122L15.445 9.16719C15.906 8.86019 16.526 8.98419 16.832 9.44419C17.139 9.90419 17.015 10.5252 16.555 10.8312Z" fill="#07D38F"/>
</svg>
      <p
        className="text-center  text-2xl font-['Inter'] text-20 font-semibold"
        style={{ color: "var(--Label-Off-Green, #07D38F)" }}
      >
        Thank you for signing up!
      </p>
    </div>
    <p className="text-center font-['Inter'] text-gray-500 text-xl font-medium ">
        Your account has been created successfully. Please check your inbox and verify the email address.
    
    </p>
    <p className="text-center font-['Inter'] text-gray-500 text-xl font-medium ">
        Didn't receive the email? Check your spam folder or click here to <button  
        onClick={() => {
          try {
            resendVerificationEmail(email).unwrap();
            success("Email Sent Successfully, Check your inbox.");
          } catch (error) {
            failure("Something went wrong. Try again later.");
          }
        }}
        
        
        className="font-bold text-black font-xl "type="submit">Resend Email.</button>
    
    </p>
  </div>

    
  );
};

export default Step4;
