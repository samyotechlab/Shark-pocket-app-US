import React from 'react';
import WebViewScreen from "../../Components/WebViewScreen"
import { baseApiurl } from "../../Service/AxiosInstance"
import Config from "../../Utilities/Config"

export const FAQScreen = () => {
  return(
    <WebViewScreen title="FAQ" uri={`${baseApiurl}/${Config.HelpSupport}`} />
  )
}

export const ContactScreen = () => {
  return(
    <WebViewScreen title="Contact Us" uri="https://sharkpocket.in/#contact" />
  )
}

export const HowToPlayScreen = () => {
  return(
  <WebViewScreen title="How To Play" uri={`${baseApiurl}/${Config.HowToPlay}`} />
  )
}

export const RefundPolicyScreen = () => {
  return(
    <WebViewScreen title="Refund Policy" uri="https://sharkpocket.in/refund-policy/" />
  )
}

export const TCScreen = () => {
  return(
    <WebViewScreen title="Terms & Condition" uri="https://sharkpocket.in/terms-and-condition/" />
  )
}

export const PrivacyPolicy = () => {
  return(
    <WebViewScreen title="Privacy Policy" uri="https://sharkpocket.in/privacy-policy/" />
  )
}
export const PointsSelection = () => {
  return(
    <WebViewScreen title="Points Selection" uri="https://sharkpocket.in/pointing-system/" />
  )
}

// export const SupportScreen = () => {
//   return(
//     <WebViewScreen title="Support" uri={`${baseApiurl}/${Config.Support}`} />
//   )
// }
