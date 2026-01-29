interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseDescribed extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseDescribed {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartBaseDescribed {
  backgroundMaterial: string;
  kind: 'background';
}

interface CoursePartSpecial extends CoursePartBaseDescribed {
  requirements: string[];
  kind: 'special';
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
