const baseUrl = "https://icircles.app";

const purchaseUrl = `${baseUrl}/api/qrdrive/ordervault`;

const vaultDetailsUrl = `${baseUrl}/api/qrdrive/vault`;
const userCheckUrl = `${baseUrl}/api/auth/users/usercheck`;
const registerUrl = `${baseUrl}/api/auth/register`;
const createVoltUrl = `${baseUrl}/api/qrdrive/vault`;
const updateVoltUrl = `${baseUrl}/api/qrdrive/vaultupdate`;
const checkActivationCodeUrl = `${baseUrl}/api/qrdrive/activate`;
const sentOtpUrl = `${baseUrl}/api/qrdrive/validateotp`;
const validateOtpUrl = `${baseUrl}/api/qrdrive/validateotp`;
const checkPassCodeUrl = `${baseUrl}/api/qrdrive/passcodevalidate`;

const folderUrl = `${baseUrl}/api/qrdrive/myvault`;
const addMediaUrl = `${baseUrl}/api/qrdrive/media`;
const deleteMediaUrl = `${baseUrl}/api/qrdrive/media`;
const sentEmailUrl = `${baseUrl}/api/qrdrive/emailmedia`;
const editMediaUrl = `${baseUrl}/api/qrdrive/editmedia`;
const editMediaFolderUrl = `${baseUrl}/api/qrdrive/editfolder`;
const deleteFolderUrl = `${baseUrl}/api/qrdrive/deletefolder`;

const createJournalUrl = `${baseUrl}/api/qrdrive/selfjournal`;
const getJournalsUrl = `${baseUrl}/api/qrdrive/selfjournal`;
const deleteJournalUrl = `${baseUrl}/api/qrdrive/selfjournal`;

const createNoteUrl = `${baseUrl}/api/qrdrive/VaultNotes`;

const vaultAdvertisement = `${baseUrl}/api/common/vaultadvertisement`;
const singleMicrositeDetailsUrl = `${baseUrl}/api/microsite/single`;

const addNomineeUrl = `${baseUrl}/api/qrdrive/nominee`
const qrdriveAll = `${baseUrl}/api/qrdrive/all`

const vaultToVaultCopyUrl = `${baseUrl}/api/qrdrive/vaulttovaultcopysinglefile`
const vaultToVaultCopyFolderUrl = `${baseUrl}/api/qrdrive/vaulttovaultcopyfolder`

export {
  baseUrl,
  vaultDetailsUrl,
  userCheckUrl,
  registerUrl,
  createVoltUrl,
  checkActivationCodeUrl,
  sentOtpUrl,
  validateOtpUrl,
  checkPassCodeUrl,
  folderUrl,
  addMediaUrl,
  sentEmailUrl,
  editMediaUrl,
  editMediaFolderUrl,
  deleteFolderUrl,
  deleteMediaUrl,
  createJournalUrl,
  getJournalsUrl,
  deleteJournalUrl,
  purchaseUrl,
  updateVoltUrl,
  vaultAdvertisement,
  createNoteUrl,
  singleMicrositeDetailsUrl,
  addNomineeUrl,
  qrdriveAll,
  vaultToVaultCopyUrl, 

  vaultToVaultCopyFolderUrl
};
