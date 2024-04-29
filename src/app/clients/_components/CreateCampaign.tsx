import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';

const CreateCampaign = (props: any) => {
  const closeForm = () => {
    props.onCloseForm();
  };

  return (
    <>
      <div className='flex baseline items-center gap-2'>
        <ArrowLeftCircleIcon
          className='w-10 p-1 cursor-pointer'
          onClick={closeForm}
        />
        New Campaign for: {props.client.firstName} {props.client.lastName}
      </div>
    </>
  );
};

export default CreateCampaign;
