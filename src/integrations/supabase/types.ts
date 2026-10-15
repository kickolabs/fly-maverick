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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      destinations: {
        Row: {
          created_at: string
          display_order: number
          experiences: string[]
          id: string
          image_url: string | null
          intro: string
          name: string
          published: boolean
          region: string
          slug: string
          tagline: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          experiences?: string[]
          id?: string
          image_url?: string | null
          intro?: string
          name: string
          published?: boolean
          region?: string
          slug: string
          tagline?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          experiences?: string[]
          id?: string
          image_url?: string | null
          intro?: string
          name?: string
          published?: boolean
          region?: string
          slug?: string
          tagline?: string
        }
        Relationships: []
      }
      enquiries: {
        Row: {
          company_name: string | null
          created_at: string
          destination: string | null
          details: Json
          email: string
          enquiry_type: string
          full_name: string
          id: string
          message: string | null
          mobile: string
          service: string | null
          status: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          destination?: string | null
          details?: Json
          email: string
          enquiry_type: string
          full_name: string
          id?: string
          message?: string | null
          mobile: string
          service?: string | null
          status?: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          destination?: string | null
          details?: Json
          email?: string
          enquiry_type?: string
          full_name?: string
          id?: string
          message?: string | null
          mobile?: string
          service?: string | null
          status?: string
        }
        Relationships: []
      }
      tour_packages: {
        Row: {
          created_at: string
          currency: string | null
          description: string
          destination_id: string | null
          display_order: number
          duration: string
          highlights: string[]
          id: string
          image_url: string | null
          name: string
          price: number | null
          published: boolean
          slug: string
          summary: string
          types: string[]
        }
        Insert: {
          created_at?: string
          currency?: string | null
          description?: string
          destination_id?: string | null
          display_order?: number
          duration?: string
          highlights?: string[]
          id?: string
          image_url?: string | null
          name: string
          price?: number | null
          published?: boolean
          slug: string
          summary?: string
          types?: string[]
        }
        Update: {
          created_at?: string
          currency?: string | null
          description?: string
          destination_id?: string | null
          display_order?: number
          duration?: string
          highlights?: string[]
          id?: string
          image_url?: string | null
          name?: string
          price?: number | null
          published?: boolean
          slug?: string
          summary?: string
          types?: string[]
        }
        Relationships: [
          {
            foreignKeyName: "tour_packages_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      tourist_places: {
        Row: {
          created_at: string
          description: string
          destination_id: string
          display_order: number
          id: string
          image_url: string | null
          name: string
          published: boolean
        }
        Insert: {
          created_at?: string
          description?: string
          destination_id: string
          display_order?: number
          id?: string
          image_url?: string | null
          name: string
          published?: boolean
        }
        Update: {
          created_at?: string
          description?: string
          destination_id?: string
          display_order?: number
          id?: string
          image_url?: string | null
          name?: string
          published?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "tourist_places_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
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
      app_role: "admin"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
      app_role: ["admin"],
    },
  },
} as const
