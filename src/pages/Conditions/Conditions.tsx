import "./Conditions.scss"
const conditionsArray = [
  {
    title: "1. Acceptance of Terms",
    details: "By accessing or using Language Learn, you confirm that you have read, understood, and agreed to these Terms and Conditions. If you do not agree, please refrain from using our application."
  },
  {
    title: "2. User Accounts and Security",
    details: "To access certain features of the application, you must create an account using a valid email and secure password. You are responsible for maintaining the confidentiality of your login credentials and for all activities associated with your account."
  },
  {
    title: "3. Use of the Application",
    details: "Language Learn provides tools to assist users in learning new words through notifications and quizzes. The application is intended solely for personal, non-commercial use."
  },
  {
    title: "4. Privacy and Data Protection",
    details: "We take user privacy seriously. Your personal information, such as your email address and encrypted password, is securely stored. We do not share your data with third parties, except as required by law."
  },
  {
    title: "5. Intellectual Property",
    details: "All content within the application, including but not limited to software, design, logos, and quizzes, is the intellectual property of Language Learn and is protected under applicable copyright laws."
  },
  {
    title: "6. Limitation of Liability",
    details: "We strive to provide accurate and efficient language learning tools; however, we do not guarantee that the application will be error-free or uninterrupted. We are not liable for any issues arising from the use or inability to use the app."
  },
  {
    title: "7. Changes to Terms",
    details: "We reserve the right to update or modify these Terms and Conditions at any time. Significant changes will be communicated to users through appropriate channels within the app."
  },
  {
    title: "8. Termination of Service",
    details: "We reserve the right to suspend or terminate user accounts that violate these terms, engage in fraudulent activity, or misuse the application."
  },
  {
    title: "9. Governing Law",
    details: "These Terms and Conditions are governed by and interpreted in accordance with the laws of Azerbaijan."
  },
  {
    title: "10. Contact Information",
    details: "For any questions or concerns regarding these Terms and Conditions, please contact us at:\nEmail: info@languagelearn.com"
  }
];

const Conditions = () => {
  return (
    <div>
      {conditionsArray.map((condition, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h3 className="conditions_tittle" >{condition.title}</h3>
      
          <p>{condition.details}</p>
        </div>
      ))}
    </div>
  );
};

export default Conditions;