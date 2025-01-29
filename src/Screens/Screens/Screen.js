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
    <WebViewScreen title="Contact Us" uri={`${baseApiurl}/${Config.Contact}`} />
  )
}

export const HowToPlayScreen = () => {
  return(
  <WebViewScreen title="How To Play" uri={`${baseApiurl}/${Config.HowToPlay}`} />
  )
}

export const RefundPolicyScreen = () => {
  return(
    <WebViewScreen title="Refund Policy" uri={`${baseApiurl}/${Config.Refund}`} />
  )
}

export const TCScreen = () => {
  return(
    <WebViewScreen title="Terms & Condition" uri={`${baseApiurl}/${Config.TermCondition}`} />
  )
}

export const SupportScreen = () => {
  return(
    <WebViewScreen title="Support" uri={`${baseApiurl}/${Config.Support}`} />
  )
}
