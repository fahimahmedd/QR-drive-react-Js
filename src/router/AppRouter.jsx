import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import ScanPage from "../pages/authenticated/ScanPage";
import PassCodePage from "../pages/authenticated/PassCodePage";
import HomePage from "../pages/HomePage";

import MyRecycleFilesPage from "../pages/media/RecycleFilesPage";
import MyFilesFolderPage from "../pages/media/FolderPage";
import RegisterPage from "../pages/authenticated/RegisterPage";
import EmailCheckPage from "../pages/authenticated/EmailCheckPage";
import SetVaultDetailsPage from "../pages/authenticated/SetVaultDetailsPage";
import OtpPage from "../pages/authenticated/OtpPage";
import ActivationMatchCodePage from "../pages/authenticated/ActivationMatchCodePage";
import JournalPage from "../pages/JournalPage";
import JournalEditorPage from "../pages/JournalEditorPage";
import SettingPage from "../pages/SettingPage";
import JournalPreviewPage from "../pages/JournalPreviewPage";
import MyRecycleFolderFilesPage from "../pages/media/RecycleFolderPage";
import JournalAdendamEditorPage from "../pages/JournalAdendamEditorPage";
import JournalAdendamPreviewPage from "../pages/JournalAdendamPreviewPage";

import NewUserEmailCheckPage from "../pages/newUserRegistration/NewUserEmailCheckPage";
import NewUserRegisterPage from "../pages/newUserRegistration/NewUserRegisterPage";
import NewUserPurchasePage from "../pages/newUserRegistration/NewUserPurchasePage";
import NotFoundPage from "../pages/NotFoundPage";
import HomeBodyFileTypePage from "../pages/HomeBodyFileTypePage";
import NotesPage from "../pages/NotesPage";
import NoteEditPage from "../pages/NoteEditPage";
import AuthMicrositePage from "../pages/AuthMicrositePage";
import SettingsNomineeAddPage from "../pages/SettingsNomineeAddPage";
import SettingsNomineeUpdatePage from "../pages/SettingsNomineeUpdatePage";
import MyFilesPage from "../pages/media/FilesPage";
import UserVaultPage from "../pages/UserVaultPage";
import UserVaultFolderPage from "../pages/media/UserVaultFolderPage";
import UserSponsorVaultPage from "../pages/UserSponsorVaultPage";
import UpgradePackage from "../pages/UpgradePackage";
import SubscriptionPaymentPage from "../pages/Payment/SubscriptionPaymentPage";
import FoundLostPage from "../pages/authenticated/FoundLostPage";

const AppRouter = () => {
  return (
    <Fragment>
      <Routes>
        <Route exact path="home" element={<HomePage />} />
        <Route exact path="/upgrade-package" element={<UpgradePackage />} />
        <Route exact path="/subscription-payment" element={<SubscriptionPaymentPage />} />

        <Route exact path="/files" element={<MyFilesPage />} />
        <Route exact path="/files-type" element={<HomeBodyFileTypePage />} />

        <Route exact path="/files/:name" element={<MyFilesFolderPage />} />
        <Route exact path="/files-user/:name" element={<UserVaultFolderPage />} />
        
        <Route exact path="/files-recycle" element={<MyRecycleFilesPage />} />
        <Route
          exact
          path="/files-recycle/:name"
          element={<MyRecycleFolderFilesPage />}
        />

        <Route exact path="/" element={<ScanPage />} />
        <Route exact path="/user-vault" element={<UserVaultPage />} />
        <Route exact path="/user-vault-sponsors" element={<UserSponsorVaultPage />} />
        
        <Route exact path="/pass-code" element={<PassCodePage />} />
        <Route exact path="/lost-found" element={<FoundLostPage />} />
        <Route exact path="/email-check" element={<EmailCheckPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route
          exact
          path="/activation-code"
          element={<ActivationMatchCodePage />}
        />
        <Route
          exact
          path="/set-vault-details"
          element={<SetVaultDetailsPage />}
        />
        <Route exact path="/otp" element={<OtpPage />} />
        <Route exact path="/note" element={<NotesPage />} />
        <Route exact path="/note-edit" element={<NoteEditPage />} />
        <Route exact path="/journal" element={<JournalPage />} />
        <Route exact path="/journal-edit" element={<JournalEditorPage />} />
        <Route
          exact
          path="/journal-adendam-edit"
          element={<JournalAdendamEditorPage />}
        />
        <Route exact path="/setting" element={<SettingPage />} />
        <Route exact path="/setting-nominee-add" element={<SettingsNomineeAddPage />} />
        <Route exact path="/setting-nominee-update" element={<SettingsNomineeUpdatePage />} />
        <Route exact path="/journal-preview" element={<JournalPreviewPage />} />
        <Route
          exact
          path="/journal-adendam-preview"
          element={<JournalAdendamPreviewPage />}
        />

        <Route
          exact
          path="/new-user-email-check"
          element={<NewUserEmailCheckPage />}
        />
        <Route
          exact
          path="/new-user-registration"
          element={<NewUserRegisterPage />}
        />
        <Route
          exact
          path="/new-user-purchase"
          element={<NewUserPurchasePage />}
        />
        <Route
          exact
          path="/new-user-purchase-types"
          element={<NewUserPurchasePage />}
        />
        <Route path="/author-microsite" element={<AuthMicrositePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Fragment>
  );
};

export default AppRouter;
