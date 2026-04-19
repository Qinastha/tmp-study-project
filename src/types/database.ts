export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      source_documents: {
        Row: {
          id: string;
          title: string;
          source_path: string;
          source_sha256: string;
          content_sha256: string;
          revision_date: string | null;
          metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          source_path: string;
          source_sha256: string;
          content_sha256: string;
          revision_date?: string | null;
          metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["source_documents"]["Insert"]>;
        Relationships: [];
      };
      themes: {
        Row: {
          id: string;
          source_document_id: string;
          theme_key: string;
          slug: string;
          title: string;
          sort_order: number;
          content_hash: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          source_document_id: string;
          theme_key: string;
          slug: string;
          title: string;
          sort_order: number;
          content_hash: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["themes"]["Insert"]>;
        Relationships: [];
      };
      theme_content_blocks: {
        Row: {
          id: string;
          theme_id: string;
          block_key: string;
          kind: "heading" | "paragraph" | "bullet";
          heading_level: number | null;
          text: string;
          sort_order: number;
          content_hash: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          theme_id: string;
          block_key: string;
          kind: "heading" | "paragraph" | "bullet";
          heading_level?: number | null;
          text: string;
          sort_order: number;
          content_hash: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["theme_content_blocks"]["Insert"]>;
        Relationships: [];
      };
      comments: {
        Row: {
          id: string;
          theme_id: string;
          theme_content_block_id: string | null;
          target_type: "theme" | "block";
          author_name: string;
          body: string;
          status: "visible" | "hidden";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          theme_id: string;
          theme_content_block_id?: string | null;
          target_type: "theme" | "block";
          author_name: string;
          body: string;
          status?: "visible" | "hidden";
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["comments"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      create_comment: {
        Args: {
          p_theme_id: string;
          p_theme_content_block_id: string | null;
          p_target_type: "theme" | "block";
          p_author_name: string;
          p_body: string;
        };
        Returns: Database["public"]["Tables"]["comments"]["Row"];
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type ThemeRow = Database["public"]["Tables"]["themes"]["Row"];
export type ContentBlockRow = Database["public"]["Tables"]["theme_content_blocks"]["Row"];
export type CommentRow = Database["public"]["Tables"]["comments"]["Row"];
