export interface GmailConnectionStatus {
  connected: boolean;
  status: "none" | "pending" | "active" | "failed" | "disconnected";
  google_email: string | null;
  connected_at: string | null;
  trigger_active: boolean;
  last_error?: string | null;
  total_emails_processed: number;
  total_purchases_detected: number;
  pending_categorization: number;
}

export interface ProcessedEmail {
  id: number;
  gmail_message_id: string;
  subject: string;
  sender: string;
  received_at: string | null;
  is_purchase: boolean;
  expense: number | null;
  processing_status: "pending" | "processed" | "skipped" | "error";
  awaiting_categorization: boolean;
  created_at: string;
}

export interface ProcessedEmailsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProcessedEmail[];
}

export interface GmailOAuthUrlResponse {
  auth_url: string;
  connected_account_id?: string;
  already_connected?: boolean;
}
