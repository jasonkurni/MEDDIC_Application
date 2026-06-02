export interface Deal {
  id?: number;
  company_name: string;
  opportunity_description?: string;
  why_ibm?: string;
  project_name?: string;
  business_owner?: string;
  close_date?: string;
  value_usd?: number;
  metric?: string;
  economic_buyer?: string;
  decision_criteria?: string;
  decision_process?: string;
  identified_pain?: string;
  champion?: string;
  competition?: string;
  next_actions?: string;
  action_date?: string;
  action_owner?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}

export interface DealFormData {
  company_name: string;
  opportunity_description: string;
  why_ibm: string;
  project_name: string;
  business_owner: string;
  close_date: string;
  value_usd: string;
  metric: string;
  economic_buyer: string;
  decision_criteria: string;
  decision_process: string;
  identified_pain: string;
  champion: string;
  competition: string;
  next_actions: string;
  action_date: string;
  action_owner: string;
}

// Made with Bob
