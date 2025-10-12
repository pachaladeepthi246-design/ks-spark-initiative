export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_conversations: {
        Row: {
          created_at: string | null
          id: string
          message: string
          model: string | null
          response: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          model?: string | null
          response: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          model?: string | null
          response?: string
          user_id?: string | null
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_read: boolean | null
          message: string
          name: string
          replied_at: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          is_read?: boolean | null
          message: string
          name: string
          replied_at?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_read?: boolean | null
          message?: string
          name?: string
          replied_at?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      donations: {
        Row: {
          amount: number
          created_at: string | null
          donor_email: string | null
          donor_name: string | null
          id: string
          is_anonymous: boolean | null
          message: string | null
          payment_method: string | null
          status: string | null
          transaction_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          donor_email?: string | null
          donor_name?: string | null
          id?: string
          is_anonymous?: boolean | null
          message?: string | null
          payment_method?: string | null
          status?: string | null
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          donor_email?: string | null
          donor_name?: string | null
          id?: string
          is_anonymous?: boolean | null
          message?: string | null
          payment_method?: string | null
          status?: string | null
          transaction_id?: string | null
        }
        Relationships: []
      }
      innovations: {
        Row: {
          ai_generated: boolean | null
          category: string | null
          created_at: string | null
          description: string
          generation_prompt: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          published_at: string | null
          title: string
        }
        Insert: {
          ai_generated?: boolean | null
          category?: string | null
          created_at?: string | null
          description: string
          generation_prompt?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          published_at?: string | null
          title: string
        }
        Update: {
          ai_generated?: boolean | null
          category?: string | null
          created_at?: string | null
          description?: string
          generation_prompt?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          published_at?: string | null
          title?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          is_active: boolean | null
          name: string | null
          subscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean | null
          name?: string | null
          subscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean | null
          name?: string | null
          subscribed_at?: string | null
        }
        Relationships: []
      }
      payment_transactions: {
        Row: {
          amount: number
          created_at: string | null
          donation_id: string | null
          id: string
          payment_gateway_response: Json | null
          payment_method: string
          status: string | null
          transaction_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          donation_id?: string | null
          id?: string
          payment_gateway_response?: Json | null
          payment_method: string
          status?: string | null
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          donation_id?: string | null
          id?: string
          payment_gateway_response?: Json | null
          payment_method?: string
          status?: string | null
          transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_transactions_donation_id_fkey"
            columns: ["donation_id"]
            isOneToOne: false
            referencedRelation: "donations"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string | null
          created_at: string | null
          demo_url: string | null
          description: string
          id: string
          image_url: string | null
          is_available: boolean | null
          price: number | null
          technologies: string[] | null
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          demo_url?: string | null
          description: string
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          price?: number | null
          technologies?: string[] | null
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          demo_url?: string | null
          description?: string
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          price?: number | null
          technologies?: string[] | null
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          category: string
          created_at: string | null
          demo_url: string | null
          description: string
          end_date: string | null
          github_url: string | null
          id: string
          image_url: string | null
          revenue_generated: number | null
          start_date: string | null
          status: string | null
          student_ids: string[] | null
          technologies: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          demo_url?: string | null
          description: string
          end_date?: string | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          revenue_generated?: number | null
          start_date?: string | null
          status?: string | null
          student_ids?: string[] | null
          technologies?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          demo_url?: string | null
          description?: string
          end_date?: string | null
          github_url?: string | null
          id?: string
          image_url?: string | null
          revenue_generated?: number | null
          start_date?: string | null
          status?: string | null
          student_ids?: string[] | null
          technologies?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_featured: boolean | null
          name: string
          photo_url: string | null
          rating: number | null
          role: string | null
          student_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          name: string
          photo_url?: string | null
          rating?: number | null
          role?: string | null
          student_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_featured?: boolean | null
          name?: string
          photo_url?: string | null
          rating?: number | null
          role?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string | null
          description: string
          features: string[] | null
          icon: string | null
          id: string
          is_active: boolean | null
          order_index: number | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description: string
          features?: string[] | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string
          features?: string[] | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          title?: string
        }
        Relationships: []
      }
      student_registrations: {
        Row: {
          education: string
          email: string
          full_name: string
          id: string
          phone: string
          resume_url: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          specialization: string | null
          status: string | null
          submitted_at: string | null
          why_join: string | null
        }
        Insert: {
          education: string
          email: string
          full_name: string
          id?: string
          phone: string
          resume_url?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          specialization?: string | null
          status?: string | null
          submitted_at?: string | null
          why_join?: string | null
        }
        Update: {
          education?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string
          resume_url?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          specialization?: string | null
          status?: string | null
          submitted_at?: string | null
          why_join?: string | null
        }
        Relationships: []
      }
      students: {
        Row: {
          batch: string | null
          bio: string | null
          created_at: string | null
          email: string
          full_name: string
          github_url: string | null
          id: string
          joined_at: string | null
          linkedin_url: string | null
          phone: string | null
          photo_url: string | null
          portfolio_url: string | null
          skills: string[] | null
          specialization: string | null
          status: string | null
          student_id: string
          updated_at: string | null
        }
        Insert: {
          batch?: string | null
          bio?: string | null
          created_at?: string | null
          email: string
          full_name: string
          github_url?: string | null
          id?: string
          joined_at?: string | null
          linkedin_url?: string | null
          phone?: string | null
          photo_url?: string | null
          portfolio_url?: string | null
          skills?: string[] | null
          specialization?: string | null
          status?: string | null
          student_id: string
          updated_at?: string | null
        }
        Update: {
          batch?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          github_url?: string | null
          id?: string
          joined_at?: string | null
          linkedin_url?: string | null
          phone?: string | null
          photo_url?: string | null
          portfolio_url?: string | null
          skills?: string[] | null
          specialization?: string | null
          status?: string | null
          student_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      voice_recordings: {
        Row: {
          audio_url: string
          created_at: string | null
          duration_seconds: number | null
          id: string
          transcription: string | null
          user_id: string | null
        }
        Insert: {
          audio_url: string
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          transcription?: string | null
          user_id?: string | null
        }
        Update: {
          audio_url?: string
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          transcription?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "student" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "student", "user"],
    },
  },
} as const
