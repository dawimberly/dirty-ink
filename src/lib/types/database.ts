export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      shops: {
        Row: {
          id: string;
          name: string;
          area: string | null;
          contact_person: string | null;
          instagram: string | null;
          website: string | null;
          email_phone: string | null;
          type: string | null;
          date_contacted: string | null;
          status: string;
          follow_up_date: string | null;
          portfolio_sent: boolean;
          rate_terms: string | null;
          notes: string | null;
          priority: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          area?: string | null;
          contact_person?: string | null;
          instagram?: string | null;
          website?: string | null;
          email_phone?: string | null;
          type?: string | null;
          date_contacted?: string | null;
          status?: string;
          follow_up_date?: string | null;
          portfolio_sent?: boolean;
          rate_terms?: string | null;
          notes?: string | null;
          priority?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          area?: string | null;
          contact_person?: string | null;
          instagram?: string | null;
          website?: string | null;
          email_phone?: string | null;
          type?: string | null;
          date_contacted?: string | null;
          status?: string;
          follow_up_date?: string | null;
          portfolio_sent?: boolean;
          rate_terms?: string | null;
          notes?: string | null;
          priority?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      appointment_requests: {
        Row: {
          id: string;
          client_name: string;
          email: string | null;
          phone: string | null;
          instagram: string | null;
          preferred_dates: string | null;
          placement: string | null;
          size_estimate: string | null;
          style_notes: string | null;
          description: string;
          budget: string | null;
          status: string;
          artist_notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          client_name: string;
          email?: string | null;
          phone?: string | null;
          instagram?: string | null;
          preferred_dates?: string | null;
          placement?: string | null;
          size_estimate?: string | null;
          style_notes?: string | null;
          description: string;
          budget?: string | null;
          status?: string;
          artist_notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          client_name?: string;
          email?: string | null;
          phone?: string | null;
          instagram?: string | null;
          preferred_dates?: string | null;
          placement?: string | null;
          size_estimate?: string | null;
          style_notes?: string | null;
          description?: string;
          budget?: string | null;
          status?: string;
          artist_notes?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
