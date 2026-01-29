import type { CoursePart } from '../types';

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`,
    );
  };
  const renderContent = () => {
    switch (part.kind) {
      case 'basic':
        return (
          <>
            <em>{part.description}</em>
          </>
        );
      case 'background':
        return (
          <>
            <em>{part.description}</em>
            <p style={{margin: '0px'}}>submit to: {part.backgroundMaterial}</p>
          </>
        );
    case 'special': 
        return (
             <>
            <em>{part.description}</em>
            <p style={{margin: '0px'}}>required skills: {part.requirements.map(text => `${text}, `)}</p>
          </>
        )
      case 'group':
        return (
          <>
            <p style={{margin: '0px'}}>project exercises: {part.groupProjectCount}</p>
          </>
        );
      default:
        assertNever(part);
        break;
    }
  };
  return (
    <div style={{margin: '10px 0px'}}>
      <h4 style={{margin: '0px'}}>
        {part.name} {part.exerciseCount}
      </h4>
      {renderContent()}
    </div>
  );
};

export default Part;
