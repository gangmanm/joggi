export type Budget = {
  amount: string | null;
  budget_id: string;
  created_at: string;
  setting: string | null;
  source: string | null;
  tag: string | null;
  user_id: string | null;
};

export type InputValue = {
  amount: string;
  source: string;
  tag: string;
};

export type TagInputValue = {
  name: string;
};
