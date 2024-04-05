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
      appointment_recurrency: {
        Row: {
          client_id: number
          recurrency: Database["public"]["Enums"]["recurrency_type"] | null
          specialist_id: number
        }
        Insert: {
          client_id: number
          recurrency?: Database["public"]["Enums"]["recurrency_type"] | null
          specialist_id: number
        }
        Update: {
          client_id?: number
          recurrency?: Database["public"]["Enums"]["recurrency_type"] | null
          specialist_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "appointment_recurrency_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointment_recurrency_specialist_id_fkey"
            columns: ["specialist_id"]
            isOneToOne: false
            referencedRelation: "specialists"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          appointment_id: number
          client_id: number | null
          scheduled_date: string | null
          specialist_id: number | null
          status: Database["public"]["Enums"]["appointment_status"]
          value: number | null
        }
        Insert: {
          appointment_id?: number
          client_id?: number | null
          scheduled_date?: string | null
          specialist_id?: number | null
          status?: Database["public"]["Enums"]["appointment_status"]
          value?: number | null
        }
        Update: {
          appointment_id?: number
          client_id?: number | null
          scheduled_date?: string | null
          specialist_id?: number | null
          status?: Database["public"]["Enums"]["appointment_status"]
          value?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_specialist_id_fkey"
            columns: ["specialist_id"]
            isOneToOne: false
            referencedRelation: "specialists"
            referencedColumns: ["id"]
          },
        ]
      }
      billings: {
        Row: {
          amount: number | null
          appointment_id: number | null
          billing_id: number
          charge_message_status: Database["public"]["Enums"]["billing_charge_message_status"]
          created_at: string | null
          payment_date: string | null
          payment_due_date: string | null
          payment_status:
            | Database["public"]["Enums"]["payment_status_enum"]
            | null
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount?: number | null
          appointment_id?: number | null
          billing_id?: number
          charge_message_status?: Database["public"]["Enums"]["billing_charge_message_status"]
          created_at?: string | null
          payment_date?: string | null
          payment_due_date?: string | null
          payment_status?:
            | Database["public"]["Enums"]["payment_status_enum"]
            | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number | null
          appointment_id?: number | null
          billing_id?: number
          charge_message_status?: Database["public"]["Enums"]["billing_charge_message_status"]
          created_at?: string | null
          payment_date?: string | null
          payment_due_date?: string | null
          payment_status?:
            | Database["public"]["Enums"]["payment_status_enum"]
            | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "billing_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["appointment_id"]
          },
        ]
      }
      client_schedulingtime: {
        Row: {
          client_id: number | null
          id: number
          scheduled_date: string | null
          scheduled_time: string | null
        }
        Insert: {
          client_id?: number | null
          id?: number
          scheduled_date?: string | null
          scheduled_time?: string | null
        }
        Update: {
          client_id?: number | null
          id?: number
          scheduled_date?: string | null
          scheduled_time?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_schedulingtime_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          cpf: string | null
          created_at: string | null
          email: string | null
          first_name: string
          id: number
          last_name: string
          phone: string | null
          specialist_id: number | null
          updated_at: string | null
        }
        Insert: {
          cpf?: string | null
          created_at?: string | null
          email?: string | null
          first_name: string
          id?: number
          last_name: string
          phone?: string | null
          specialist_id?: number | null
          updated_at?: string | null
        }
        Update: {
          cpf?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string
          id?: number
          last_name?: string
          phone?: string | null
          specialist_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_specialist_id"
            columns: ["specialist_id"]
            isOneToOne: false
            referencedRelation: "specialists"
            referencedColumns: ["id"]
          },
        ]
      }
      specialist_working_hours: {
        Row: {
          end_time: string | null
          specialist_id: number
          start_time: string | null
          weekday_id: number
        }
        Insert: {
          end_time?: string | null
          specialist_id: number
          start_time?: string | null
          weekday_id: number
        }
        Update: {
          end_time?: string | null
          specialist_id?: number
          start_time?: string | null
          weekday_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "specialist_working_hours_specialist_id_fkey"
            columns: ["specialist_id"]
            isOneToOne: false
            referencedRelation: "specialists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "specialist_working_hours_weekday_id_fkey"
            columns: ["weekday_id"]
            isOneToOne: false
            referencedRelation: "weekdays"
            referencedColumns: ["id"]
          },
        ]
      }
      specialists: {
        Row: {
          auth_id: string | null
          created_at: string | null
          id: number
          updated_at: string | null
          username: string | null
          working_hours: unknown[] | null
          working_hours_id: number[] | null
        }
        Insert: {
          auth_id?: string | null
          created_at?: string | null
          id?: number
          updated_at?: string | null
          username?: string | null
          working_hours?: unknown[] | null
          working_hours_id?: number[] | null
        }
        Update: {
          auth_id?: string | null
          created_at?: string | null
          id?: number
          updated_at?: string | null
          username?: string | null
          working_hours?: unknown[] | null
          working_hours_id?: number[] | null
        }
        Relationships: []
      }
      weekdays: {
        Row: {
          day_name: string | null
          id: number
        }
        Insert: {
          day_name?: string | null
          id?: number
        }
        Update: {
          day_name?: string | null
          id?: number
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
      appointment_status: "pending" | "cancelled" | "confirmed" | "completed"
      billing_charge_message_status: "sent" | "pending"
      payment_status_enum: "pending" | "paid" | "overdue"
      recurrency_type: "weekly" | "biweekly" | "one-time"
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
