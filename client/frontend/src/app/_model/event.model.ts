
export interface Event{
  id: number;
  event_name: string;
  event_description: string;
  event_category: string;
  event_location: string;
  date_from: string;
  date_to: string;
  user: {
    id: number;
    email: string;
    password: string;
  }
}

