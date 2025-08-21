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
      drinks: {
        Row: {
          category: Database["public"]["Enums"]["drink_type"] | null
          created_at: string
          has_pfand: boolean | null
          id: number
          name: string | null
          price: number | null
        }
        Insert: {
          category?: Database["public"]["Enums"]["drink_type"] | null
          created_at?: string
          has_pfand?: boolean | null
          id?: number
          name?: string | null
          price?: number | null
        }
        Update: {
          category?: Database["public"]["Enums"]["drink_type"] | null
          created_at?: string
          has_pfand?: boolean | null
          id?: number
          name?: string | null
          price?: number | null
        }
        Relationships: []
      }
      main_dishes: {
        Row: {
          allergens: string[] | null
          category: Database["public"]["Enums"]["main_dish_type"]
          created_at: string | null
          id: string
          name: string
          price: number
          size: string | null
        }
        Insert: {
          allergens?: string[] | null
          category: Database["public"]["Enums"]["main_dish_type"]
          created_at?: string | null
          id?: string
          name: string
          price: number
          size?: string | null
        }
        Update: {
          allergens?: string[] | null
          category?: Database["public"]["Enums"]["main_dish_type"]
          created_at?: string | null
          id?: string
          name?: string
          price?: number
          size?: string | null
        }
        Relationships: []
      }
      order_insert_done: {
        Row: {
          created_at: string
          id: number
          order_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          order_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          order_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_insert_done_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      order_item_drinks: {
        Row: {
          created_at: string
          drink_id: number | null
          id: string
          order_item_id: string | null
        }
        Insert: {
          created_at?: string
          drink_id?: number | null
          id?: string
          order_item_id?: string | null
        }
        Update: {
          created_at?: string
          drink_id?: number | null
          id?: string
          order_item_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_item_drinks_drink_id_fkey"
            columns: ["drink_id"]
            isOneToOne: false
            referencedRelation: "drinks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_item_drinks_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
        ]
      }
      order_item_toppings: {
        Row: {
          created_at: string
          id: string
          order_item_id: string | null
          topping_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          order_item_id?: string | null
          topping_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          order_item_id?: string | null
          topping_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_item_toppings_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_item_toppings_topping_id_fkey"
            columns: ["topping_id"]
            isOneToOne: false
            referencedRelation: "toppings"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string | null
          id: string
          index: number | null
          main_dish_id: string | null
          note: string | null
          order_id: string | null
          state: Database["public"]["Enums"]["OrderStatus"] | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          index?: number | null
          main_dish_id?: string | null
          note?: string | null
          order_id?: string | null
          state?: Database["public"]["Enums"]["OrderStatus"] | null
        }
        Update: {
          created_at?: string | null
          id?: string
          index?: number | null
          main_dish_id?: string | null
          note?: string | null
          order_id?: string | null
          state?: Database["public"]["Enums"]["OrderStatus"] | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_main_dish_id_fkey"
            columns: ["main_dish_id"]
            isOneToOne: false
            referencedRelation: "main_dishes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          id: string
          placement: string
          state: Database["public"]["Enums"]["OrderStatus"] | null
          total_price: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          placement: string
          state?: Database["public"]["Enums"]["OrderStatus"] | null
          total_price?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          placement?: string
          state?: Database["public"]["Enums"]["OrderStatus"] | null
          total_price?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          job_role: string | null
          last_name: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name?: string | null
          id?: string
          job_role?: string | null
          last_name?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          job_role?: string | null
          last_name?: string | null
        }
        Relationships: []
      }
      toppings: {
        Row: {
          category: Database["public"]["Enums"]["topping_type"] | null
          created_at: string | null
          id: string
          name: string
          price: number | null
        }
        Insert: {
          category?: Database["public"]["Enums"]["topping_type"] | null
          created_at?: string | null
          id?: string
          name: string
          price?: number | null
        }
        Update: {
          category?: Database["public"]["Enums"]["topping_type"] | null
          created_at?: string | null
          id?: string
          name?: string
          price?: number | null
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
      drink_type: "alcohol_free"
      main_dish_type:
        | "menu"
        | "doner"
        | "wraps"
        | "lahmacun"
        | "gratinated"
        | "pide"
        | "pizza"
        | "salads"
        | "soup"
        | "appetizer"
        | "extras"
        | "desserts"
      OrderStatus: "IN_PROGRESS" | "DONE" | "PAID"
      topping_type:
        | "topping"
        | "supplement"
        | "oven"
        | "extra"
        | "exclude_topping"
        | "exclude_supplement"
        | "exclude_oven"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      drink_type: ["alcohol_free"],
      main_dish_type: [
        "menu",
        "doner",
        "wraps",
        "lahmacun",
        "gratinated",
        "pide",
        "pizza",
        "salads",
        "soup",
        "appetizer",
        "extras",
        "desserts",
      ],
      OrderStatus: ["IN_PROGRESS", "DONE", "PAID"],
      topping_type: [
        "topping",
        "supplement",
        "oven",
        "extra",
        "exclude_topping",
        "exclude_supplement",
        "exclude_oven",
      ],
    },
  },
} as const
