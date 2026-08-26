import { env } from './env';

/**
 * Helper pemanggil API BE.
 *
 * PENTING (README boundary nomor 4): JANGAN nambah tipe response di file ini
 * untuk endpoint yang belum ada kontraknya di BE. Bikin `LoginResponse`,
 * `UserProfile`, dsb. duluan = ngarang shape data.
 *
 * Alurnya: BE rilis kontrak → catat di integrations/backend-api-contract.md →
 * baru tulis tipenya di sini.
 *
 * Per 2026-08-26, satu-satunya endpoint BE yang sudah ada adalah
 * GET /api/v1/health (lihat BackEnd-BKUI2026 ARCH-0002).
 */

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    ...init,
    // Dibutuhkan flow auth berbasis cookie dari BE. Sisi BE sudah menyalakan
    // CORS `credentials: true` dan mendaftarkan origin FE.
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(
      `Request ke ${path} gagal (${response.status})`,
      response.status,
    );
  }

  return response.json() as Promise<T>;
}

// ---------------------------------------------------------------------------
// Health-check — satu-satunya endpoint BE yang kontraknya sudah pasti.
// Shape disalin dari BackEnd-BKUI2026 ARCH-0002, bukan karangan.
// ---------------------------------------------------------------------------

export interface HealthCheckResponse {
  status: 'ok' | 'degraded';
  timestamp: string;
  /** Detik sejak proses BE start. */
  uptime: number;
  database: 'up' | 'down';
}

export function getHealth(): Promise<HealthCheckResponse> {
  return apiFetch<HealthCheckResponse>('/health');
}
