export interface ICourse {
  id: number;
  name: string;
  description: string;
  startDate: string;
  modules: IModule[];
}

export interface ICourses {
  totalCourses: number;
  pageNumber: number;
  pageSize: number;
  courses: ICourse[];
}

export interface IActivityType {
  id: number;
  name: string;
}

export interface IActivity {
  id: number;
  name: string;
  description: string;
  details: string | null;
  typeId: number;
  type: IActivityType;
  startDate: string;
  endDate: string;
  moduleId: number;
}

export interface IModule {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  courseId: number;
  activities: IActivity[] | [];
}
