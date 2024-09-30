export interface CourseDetails {
  id: number;
  name: string;
  description: string;
  startDate: string;
  modules: Module[];
}

export interface Module {
  id: number;
  name: string;
  description: string;
  activities: Activity[];
}

export interface Activity {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}
