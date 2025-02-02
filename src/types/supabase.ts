export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      budget: {
        Row: {
          amount: string | null
          budget_id: string
          color: string | null
          created_at: string
          date: string | null
          setting: string | null
          source: string | null
          tag: string | null
          user_id: string | null
        }
        Insert: {
          amount?: string | null
          budget_id?: string
          color?: string | null
          created_at?: string
          date?: string | null
          setting?: string | null
          source?: string | null
          tag?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: string | null
          budget_id?: string
          color?: string | null
          created_at?: string
          date?: string | null
          setting?: string | null
          source?: string | null
          tag?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      comment: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          user_fullname: string | null
          user_id: string | null
          user_image: string | null
          vote_uuid: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          user_fullname?: string | null
          user_id?: string | null
          user_image?: string | null
          vote_uuid?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          user_fullname?: string | null
          user_id?: string | null
          user_image?: string | null
          vote_uuid?: string | null
        }
        Relationships: []
      }
      expense: {
        Row: {
          created_at: string
          expense: number | null
          id: string
          name: string | null
          tag: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          expense?: number | null
          id?: string
          name?: string | null
          tag?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          expense?: number | null
          id?: string
          name?: string | null
          tag?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      friend: {
        Row: {
          created_at: string
          friend_fullname: string | null
          friend_id: string | null
          friend_image: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          friend_fullname?: string | null
          friend_id?: string | null
          friend_image?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          friend_fullname?: string | null
          friend_id?: string | null
          friend_image?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      like: {
        Row: {
          created_at: string
          id: string
          like: boolean | null
          user_id: string | null
          vote_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          like?: boolean | null
          user_id?: string | null
          vote_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          like?: boolean | null
          user_id?: string | null
          vote_id?: string | null
        }
        Relationships: []
      }
      tag: {
        Row: {
          color: string | null
          created_at: string
          id: string
          name: string | null
          setting: string
          user_id: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          id?: string
          name?: string | null
          setting: string
          user_id?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string
          id?: string
          name?: string | null
          setting?: string
          user_id?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          id: number
          user_fullname: string | null
          user_id: string
          user_image: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          user_fullname?: string | null
          user_id: string
          user_image?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          user_fullname?: string | null
          user_id?: string
          user_image?: string | null
        }
        Relationships: []
      }
      vote: {
        Row: {
          content: string | null
          created_at: string
          dislike: number | null
          id: number
          image: string | null
          like: number | null
          price: string | null
          title: string | null
          user_id: string | null
          user_image: string | null
          user_name: string | null
          uuid: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          dislike?: number | null
          id?: number
          image?: string | null
          like?: number | null
          price?: string | null
          title?: string | null
          user_id?: string | null
          user_image?: string | null
          user_name?: string | null
          uuid?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          dislike?: number | null
          id?: number
          image?: string | null
          like?: number | null
          price?: string | null
          title?: string | null
          user_id?: string | null
          user_image?: string | null
          user_name?: string | null
          uuid?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
