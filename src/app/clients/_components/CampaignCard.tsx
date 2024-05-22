import GoalsEnum from '@/app/lib/enum/goals';
import SplitsEnum from '@/app/lib/enum/splits';

const CampaignCard = (props: any) => {
  const { _id, goal, duration, daysTrain, split, startDate } =
    props.campaign;
  // @ts-ignore
  const goalDisplay = GoalsEnum[goal];
  // @ts-ignore
  const splitDisplay = SplitsEnum[split];

  return (
    <div className='group border rounded-md p-6 flex flex-row items-center cursor-pointer hover:border-[--primary-500]'>
      <div className='w-2/3'>
        <h2 className='text-lg font-medium mb-2'>{goalDisplay}</h2>
        <p>Split: {splitDisplay}</p>
        <p>Duration: {duration} weeks</p>
        <p>Frequency: {daysTrain} days / week</p>
        <p>Start Day: {startDate || 'N/A'}</p>
      </div>
      <div className='w-1/3 group-hover:text-[--primary-500]'>
        <i className='pi pi-arrow-right text-4xl float-right' />
      </div>
    </div>
  );
};

export default CampaignCard;
