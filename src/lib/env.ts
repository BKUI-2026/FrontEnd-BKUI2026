/**
 * Satu-satunya tempat membaca env di FE. Modul lain impor dari sini, jangan
 * akses `process.env` langsung — biar ketahuan env apa saja yang dipakai.
 *
 * Catatan: semua nilai di sini ber-prefix NEXT_PUBLIC_, artinya ikut ter-bundle
 * ke browser. Tidak boleh ada secret. Google Client Secret ada di BE.
 */

export const env = {
  /** Base URL API BE, sudah termasuk prefix /api/v1. */
  apiBaseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api/v1',

  /** Client ID Google SSO. Kosong selama belum didaftarkan — lihat integrations/google-sso-client.md */
  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '',

  /**
   * URL Yesplis untuk CTA keluar. Masih TBD.
   * Ini murni tujuan redirect — TIDAK ADA checkout/cart/payment di FE.
   */
  yesplisTicketUrl: process.env.NEXT_PUBLIC_YESPLIS_TICKET_URL ?? '',
  yesplisMerchUrl: process.env.NEXT_PUBLIC_YESPLIS_MERCH_URL ?? '',
} as const;
