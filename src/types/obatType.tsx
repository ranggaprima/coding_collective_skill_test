export interface OptionType {
    label: string;
    value: string;
  }
  
  export interface MedicineState {
    options: OptionType[];
    loading: boolean;
    error: string | null;
  }
  