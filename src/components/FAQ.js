// src/FAQ.js

import React, { useEffect, useState } from "react";
import "./FAQ.css"; 
import Header from "./Header";
import { fetchNotifications } from "../services/allApi";

const FAQ = () => {
  const [faqs, setFaqs] = useState([
    {
      question:
        "How do I add, edit, and delete a sub-training and main training?",
      answer:
        "To add, edit, and delete a sub-training and main training, navigate to the 'Edit Training' section in the Header, fill out the necessary details, and click 'Submit'.",
      open: false,
    },
    {
      question: "How do I add, edit, and delete a company?",
      answer:
        "To add, edit, and delete a company, navigate to the 'Edit Company' section in the Header, fill out the necessary details, and click 'Submit'.",
      open: false,
    },
    {
      question: "How do I add, edit, and delete a project?",
      answer:
        "To add, edit, and delete a project, navigate to the 'Edit Project' section in the Header, fill out the necessary details, and click 'Submit'.",
      open: false,
    },
    {
      question: "How do I add, edit, and delete a Designation?",
      answer:
        "To add, edit, and delete a Designation, navigate to the 'Edit Designation' section in the Header, fill out the necessary details, and click 'Submit'.",
      open: false,
    },
    // {
    //   question: "How do I reset my password?",
    //   answer:
    //     "To reset your password, go to the 'Login' page and click on 'Forgot Password'. Follow the instructions to reset your password.",
    //   open: false,
    // },
    {
      question: "How can I update my profile information?",
      answer:
        "To update your profile information, go to the 'Employee Profile' section and click 'Update'.",
      open: false,
    },

    {
      question:
        "How do I download a PDF with sub-training details from the Employee Profile?",
      answer:
        "To download a PDF containing sub-training details from the Employee Profile, click on the 'Download' button in the profile header. The PDF will include sub-training information that is not displayed on the page by default.",
      open: false,
    },
    {
      question: "What browsers are supported?",
      answer:
        "Our application supports the latest versions of Chrome, Firefox, Safari, and Edge. For the best experience, please ensure your browser is up-to-date.",
      open: false,
    },
  ]);

  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }
        return faq;
      })
    );
  };
  // Notification count
  const [notificationCount, setNotificationCount] = useState(0);
  useEffect(() => {
    getNotificationCount();
  }, []);
  const getNotificationCount = async () => {
    try {
      const notifications = await fetchNotifications();
      setNotificationCount(notifications.length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  return (
    <div>
      <Header notificationCount={notificationCount} />
      <div className="faq">
        <h1>Frequently Asked Questions</h1>
        {faqs.map((faq, i) => (
          <div
            className={"faq-item " + (faq.open ? "open" : "")}
            key={i}
            onClick={() => toggleFAQ(i)}
          >
            <div className="faq-question">{faq.question}</div>
            <div className="faq-answer">{faq.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
