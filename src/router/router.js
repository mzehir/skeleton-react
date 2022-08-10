import { Routes, Route } from "react-router-dom";
import {
  REGISTER_PAGE,
  LOGIN_PAGE,
  FORGOT_PASSWORD_PAGE,
  VERIFY_ACCOUNT_PAGE,
  VERIFY_PASSWORD_PAGE,
  DASHBOARD_PAGE,
  GUEST_PAGE,
  ONE_PAGE,
  TWO_PAGE_A,
  TWO_PAGE_B,
} from "../utils/constants/router-constants";

import Guard from "../guard/guard";
import AuthLayout from "../layouts/auth-layout";
import GuardLayout from "../layouts/guard-layout";
import GuestLayout from "../layouts/guest-layout";

import RegisterPage from "../pages/auth-page/register-page";
import LoginPage from "../pages/auth-page/login-page";
import ForgotPasswordPage from "../pages/auth-page/forgot-password-page";
import VerifyAccountPage from "../pages/auth-page/redirected-pages/verify-account-page";
import VerifyPasswordPage from "../pages/auth-page/redirected-pages/verify-password-page";
import NoMatchPage from "../pages/no-match-page/no-match-page";

import GuestPage from "../pages/guest-page/guest-page";
import DashboardPage from "../pages/dashboard-page/dashboard-page";
import OnePage from "../pages/one-page/one-page";
import TwoPageA from "../pages/two-page-a/two-page-a";
import TwoPageB from "../pages/two-page-b/two-page-b";

export const Router = () => {
  return (
    <Routes>
      <Route path="*" element={<NoMatchPage />} />

      <Route
        path={REGISTER_PAGE.path}
        element={
          <AuthLayout>
            <RegisterPage />
          </AuthLayout>
        }
      />

      <Route
        path={LOGIN_PAGE.path}
        element={
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        }
      />

      <Route
        path={FORGOT_PASSWORD_PAGE.path}
        element={
          <AuthLayout>
            <ForgotPasswordPage />
          </AuthLayout>
        }
      />

      <Route
        path={VERIFY_ACCOUNT_PAGE.path}
        element={
          <AuthLayout>
            <VerifyAccountPage />
          </AuthLayout>
        }
      />

      <Route
        path={VERIFY_PASSWORD_PAGE.path}
        element={
          <AuthLayout>
            <VerifyPasswordPage />
          </AuthLayout>
        }
      />

      <Route
        path={GUEST_PAGE.path}
        element={
          <GuestLayout>
            <GuestPage />
          </GuestLayout>
        }
      />

      <Route
        path={DASHBOARD_PAGE.path}
        element={
          <Guard>
            <GuardLayout>
              <DashboardPage />
            </GuardLayout>
          </Guard>
        }
      />
      <Route
        path={ONE_PAGE.path}
        element={
          <Guard>
            <GuardLayout>
              <OnePage />
            </GuardLayout>
          </Guard>
        }
      />
      <Route
        path={TWO_PAGE_A.path}
        element={
          <Guard>
            <GuardLayout>
              <TwoPageA />
            </GuardLayout>
          </Guard>
        }
      />
      <Route
        path={TWO_PAGE_B.path}
        element={
          <Guard>
            <GuardLayout>
              <TwoPageB />
            </GuardLayout>
          </Guard>
        }
      />
    </Routes>
  );
};
