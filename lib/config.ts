// Configuration for external Google Form and Google Sheets webhook integration.
// Leave as empty string or configure URL directly here or in .env.local.

export const GOOGLE_FORM_URL: string =
  process.env.NEXT_PUBLIC_GOOGLE_FORM_URL || '';

export const GOOGLE_SHEETS_WEBHOOK_URL: string =
  process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL || '';

export const QR_CODE_IMAGE_PATH: string =
  process.env.NEXT_PUBLIC_QR_CODE_IMAGE_PATH || '/assets/img/qr-ilead-workshop.webp';

// "Đăng ký ngay" button link — form Tally chính thức.
export const REGISTER_URL: string =
  process.env.NEXT_PUBLIC_REGISTER_URL || 'https://tally.so/r/LZrpGp';

// Fanpage chính thức của CLB iSupport.
export const FANPAGE_URL: string =
  'https://www.facebook.com/iSupportClub.VNUIS';

// Link đăng ký Workshop "Igniting Potential, Forging the Elite" (QR đăng ký workshop).
export const WORKSHOP_REGISTER_URL: string = 'https://tally.so/r/yPQRz0';

// Mốc thời gian đếm ngược — 0h ngày 25/09/2026 (giờ Việt Nam).
export const EVENT_DEADLINE: string = '2026-09-25T00:00:00+07:00';
