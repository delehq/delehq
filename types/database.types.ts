// Hand-written to match supabase/migrations/0001_init.sql.
// Once the Supabase project exists, regenerate with:
//   supabase gen types typescript --project-id <ref> > types/database.types.ts

export type SocialLink = {
  platform: string;
  url: string;
};

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

type NoRelationships = { Relationships: [] };

export interface Database {
  public: {
    Tables: {
      profile: {
        Row: {
          id: string;
          full_name: string;
          tagline: string;
          bio: string;
          headshot_path: string | null;
          resume_path: string | null;
          footer_headline: string | null;
          location: string | null;
          contact_email: string | null;
          social_links: SocialLink[];
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["profile"]["Row"]> & {
          id: string;
          full_name: string;
          tagline: string;
          bio: string;
        };
        Update: Partial<Database["public"]["Tables"]["profile"]["Row"]>;
      } & NoRelationships;
      experience: {
        Row: {
          id: string;
          company: string;
          role: string;
          location: string | null;
          start_date: string;
          end_date: string | null;
          description: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["experience"]["Row"]> & {
          company: string;
          role: string;
          start_date: string;
        };
        Update: Partial<Database["public"]["Tables"]["experience"]["Row"]>;
      } & NoRelationships;
      education: {
        Row: {
          id: string;
          institution: string;
          credential: string;
          start_date: string | null;
          end_date: string | null;
          description: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["education"]["Row"]> & {
          institution: string;
          credential: string;
        };
        Update: Partial<Database["public"]["Tables"]["education"]["Row"]>;
      } & NoRelationships;
      certifications: {
        Row: {
          id: string;
          name: string;
          issuer: string;
          issue_date: string | null;
          credential_url: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["certifications"]["Row"]> & {
          name: string;
          issuer: string;
        };
        Update: Partial<Database["public"]["Tables"]["certifications"]["Row"]>;
      } & NoRelationships;
      skills: {
        Row: {
          id: string;
          category: string;
          name: string;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["skills"]["Row"]> & {
          category: string;
          name: string;
        };
        Update: Partial<Database["public"]["Tables"]["skills"]["Row"]>;
      } & NoRelationships;
      services: {
        Row: {
          id: string;
          title: string;
          description: string;
          icon: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["services"]["Row"]> & {
          title: string;
          description: string;
        };
        Update: Partial<Database["public"]["Tables"]["services"]["Row"]>;
      } & NoRelationships;
      projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          category: string;
          year: number;
          summary: string;
          content: string | null;
          cover_image_path: string | null;
          project_url: string | null;
          repo_url: string | null;
          is_published: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["projects"]["Row"]> & {
          slug: string;
          title: string;
          category: string;
          year: number;
          summary: string;
        };
        Update: Partial<Database["public"]["Tables"]["projects"]["Row"]>;
      } & NoRelationships;
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          summary: string;
          body: string;
          cover_image_path: string | null;
          read_time_minutes: number | null;
          faqs: { question: string; answer: string }[] | null;
          published_at: string | null;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["blog_posts"]["Row"]> & {
          slug: string;
          title: string;
          summary: string;
          body: string;
        };
        Update: Partial<Database["public"]["Tables"]["blog_posts"]["Row"]>;
      } & NoRelationships;
      testimonials: {
        Row: {
          id: string;
          author_name: string;
          author_role: string | null;
          author_company: string | null;
          quote: string;
          back_content: string | null;
          avatar_path: string | null;
          is_published: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["testimonials"]["Row"]> & {
          author_name: string;
          quote: string;
        };
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Row"]>;
      } & NoRelationships;
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          created_at: string;
          is_read: boolean;
        };
        Insert: {
          name: string;
          email: string;
          message: string;
        };
        Update: Partial<
          Pick<Database["public"]["Tables"]["contact_submissions"]["Row"], "is_read">
        >;
      } & NoRelationships;
      page_views: {
        Row: {
          id: number;
          path: string;
          country: string | null;
          region: string | null;
          city: string | null;
          created_at: string;
        };
        Insert: {
          path: string;
          country?: string | null;
          region?: string | null;
          city?: string | null;
        };
        Update: never;
      } & NoRelationships;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
