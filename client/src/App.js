import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// Auth Pages
import Register from "./pages/profile/Register";
import Login from "./pages/profile/Login";
import ForgotPassword from "./pages/profile/ForgotPassword";
import ConfirmActivation from "./pages/profile/ConfirmActivation";
import ResetPassword from "./pages/profile/ResetPassword";
import VerifyPasswordCode from "./pages/profile/VerifyPasswordCode";

// Components
import SidebarLayout from "./components/SidebarLayout";
import Footer from "./components/Footer";

// User Management
import UserProfile from "./pages/profile/UserProfile";
import AllUsers from "./pages/profile/AllUsers";
import UserDetail from "./pages/profile/UserDetail";
import SearchUser from "./pages/profile/SearchUser";
import ChangeUserStatus from "./pages/profile/ChangeUserStatus";
import Roles from "./pages/profile/Roles";

// Exam Management
import AllExams from "./pages/exam/AllExams";
import ExamDetails from "./pages/exam/ExamDetails";
import MyRegisteredExams from "./pages/exam/MyRegisteredExams";
import CreateExam from "./pages/exam/CreateExam";
import EditExam from "./pages/exam/EditExam";
import StartExam from "./pages/exam/StartExam";
import SubmitAnswers from "./pages/exam/SubmitAnswers";
import ExamLevels from "./pages/exam/ExamLevels";
import ExamBySubject from "./pages/exam/ExamBySubject";
import RegisteredParticipantExam from "./pages/exam/RegisteredParticipantExam";
import RegisterExam from "./pages/exam/RegisterExam";

// Exam Questions
import ExamQuestions from "./pages/exam/ExamQuestions";
import SingleQuestion from "./pages/exam/SingleQuestion";
import CreateQuestion from "./pages/exam/CreateQuestion";
import EditQuestion from "./pages/exam/EditQuestion";
import ViewExamQuestion from "./pages/exam/ViewExamQuestion";
import EditAnswer from "./pages/exam/EditAnswer";

// Subjects
import AllSubjects from "./pages/exam/AllSubject";
import MySubjects from "./pages/exam/MySubject";
import SingleSubject from "./pages/exam/SingleSubject";
import CreateSubject from "./pages/exam/CreateSubject";
import EditSubject from "./pages/exam/EditSubject";
import SubjectSummary from "./pages/exam/SubjectSummary";
import MySubjectCount from "./pages/exam/MySubjectCount";

// Institutions
import AllInstitutions from "./pages/institution/AllInstitutions";
import SingleInstitution from "./pages/institution/SingleInstitution";
import CreateInstitution from "./pages/institution/CreateInstitution";
import EditInstitution from "./pages/institution/EditInstitution";
import AddInstitution from "./pages/institution/AddInstitution";

// Wallet
import RequestCardPage from "./pages/wallet/RequestCard";
import CardDenominations from "./pages/wallet/CardDenominations";
import MyCardRequests from "./pages/wallet/MyCardRequests";
import CardRequestDetails from "./pages/wallet/CardRequestDetails";
import CardsByRequest from "./pages/wallet/CardsByRequest";
import MyWallet from "./pages/wallet/MyWallet";
import LoadFundRequest from "./pages/wallet/LoadFundRequest";
import ApproveFundRequest from "./pages/wallet/ApproveFundRequest";
import VerifyCard from "./pages/wallet/VerifyCard";
import WalletTransactions from "./pages/payment/WalletTransactions";
import LogFundRequest from "./pages/wallet/LogFundRequest";
import CreateScheme from "./pages/wallet/CreateScheme";
import AllSchemes from "./pages/wallet/AllSchemes";

// Payment
import InitializePayment from "./pages/payment/InitializePayment";
import VerifyTransaction from "./pages/payment/VerifyTransaction";

// Subscriptions
import AllSubscriptions from "./pages/subscription/AllSubscriptions";
import SubscribePlan from "./pages/subscription/SubscribePlan";
import MySubscriptions from "./pages/subscription/MySubscriptions";
import ExpireSubscriptions from "./pages/subscription/ExpireSubscriptions";
import CheckSubscriptionStatus from "./pages/subscription/CheckSubscription";
import SubscriptionList from "./pages/subscription/SubscriptionList";

// Dashboard
import Dashboard from "./pages/Dashboard";

// Auth Guard
function PrivateRoute({ children, allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  if (!user || !token) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;
  return children;
}

// Wrapper to conditionally render the footer
function AppWithFooter() {
  const location = useLocation();
  const hideFooterPaths = ["/login", "/register", "/forgot-password", "/confirm-activation", "/reset-password", "/verify-password-code"];
  const hideFooter = hideFooterPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Routes>
        <Route path="/" element={<Navigate to={localStorage.getItem("token") ? "/dashboard" : "/login"} />} />

        {/* Auth Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/confirm-activation" element={<ConfirmActivation />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-password-code" element={<VerifyPasswordCode />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <SidebarLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="users" element={<AllUsers />} />
          <Route path="user-profile/:userid" element={<UserDetail />} />
          <Route path="search-user" element={<SearchUser />} />
          <Route path="change-user-status" element={<ChangeUserStatus />} />
          <Route path="roles" element={<Roles />} />

          {/* Exams */}
          <Route path="exams" element={<AllExams />} />
          <Route path="exam-details/:examid" element={<ExamDetails />} />
          <Route path="my-registered-exams" element={<MyRegisteredExams />} />
          <Route path="create-exam" element={<CreateExam />} />
          <Route path="edit-exam/:examid" element={<EditExam />} />
          <Route path="start-exam" element={<StartExam />} />
          <Route path="submit-answers" element={<SubmitAnswers />} />
          <Route path="exam-levels" element={<ExamLevels />} />
          <Route path="exam-by-subject" element={<ExamBySubject />} />
          <Route path="participant-exam" element={<RegisteredParticipantExam />} />
          <Route path="register-exam" element={<RegisterExam />} />

          {/* Questions */}
          <Route path="exam-questions/:examid" element={<ExamQuestions />} />
          <Route path="question/:questionid" element={<SingleQuestion />} />
          <Route path="create-question" element={<CreateQuestion />} />
          <Route path="edit-question/:questionid" element={<EditQuestion />} />
          <Route path="view-question/:questionid" element={<ViewExamQuestion />} />
          <Route path="edit-answer/:questionid" element={<EditAnswer />} />

          {/* Subjects */}
          <Route path="subjects" element={<AllSubjects />} />
          <Route path="my-subjects" element={<MySubjects />} />
          <Route path="subject/:SubjectID" element={<SingleSubject />} />
          <Route path="create-subject" element={<CreateSubject />} />
          <Route path="edit-subject" element={<EditSubject />} />
          <Route path="subject-summary" element={<SubjectSummary />} />
          <Route path="my-subject-count" element={<MySubjectCount />} />

          {/* Institutions */}
          <Route path="institutions" element={<AllInstitutions />} />
          <Route path="institution/:InstitutionID" element={<SingleInstitution />} />
          <Route path="create-institution" element={<CreateInstitution />} />
          <Route path="edit-institution/:id" element={<EditInstitution />} />
          <Route path="add-institution" element={<AddInstitution />} />

          {/* Wallet */}
          <Route path="request-card" element={<RequestCardPage />} />
          <Route path="card-denominations" element={<CardDenominations />} />
          <Route path="my-card-requests" element={<MyCardRequests />} />
          <Route path="card-request/:requestid" element={<CardRequestDetails />} />
          <Route path="cards-by-request/:requestid" element={<CardsByRequest />} />
          <Route path="my-wallet" element={<MyWallet />} />
          <Route path="load-fund" element={<LoadFundRequest />} />
          <Route path="approve-fund/:fundrequest_id" element={<ApproveFundRequest />} />
          <Route path="verify-card" element={<VerifyCard />} />
          <Route path="wallet-transactions" element={<WalletTransactions />} />
          <Route path="log-fund-request" element={<LogFundRequest />} />
          <Route path="create-scheme" element={<CreateScheme />} />
          <Route path="schemes" element={<AllSchemes />} />

          {/* Payment */}
          <Route path="initialize-payment" element={<InitializePayment />} />
          <Route path="verify-transaction" element={<VerifyTransaction />} />

          {/* Subscriptions */}
          <Route path="subscriptions" element={<AllSubscriptions />} />
          <Route path="subscribe-plan" element={<SubscribePlan />} />
          <Route path="my-subscriptions" element={<MySubscriptions />} />
          <Route path="expire-subscriptions" element={<ExpireSubscriptions />} />
          <Route path="check-subscription" element={<CheckSubscriptionStatus />} />
          <Route path="subscription-list" element={<SubscriptionList />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {!hideFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWithFooter />
    </Router>
  );
}

export default App;