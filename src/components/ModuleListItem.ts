import {
  ListItem, // Korrekt användning som komponent
  Text,
} from '@chakra-ui/react';
import { IActivity } from './StudentDashBoard';

interface IModuleProps {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  courseId: number;
  activities: IActivity[];
}

export const ModuleListItem = ({ module: any }) => {
  return <></>;
};
