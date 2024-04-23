const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString();
};

const ClientDisplay = (props: any) => {
  return (
    <div className='flex flex-col gap-3'>
      <div>
        {props.client?.firstName} {props.client?.lastName}
      </div>
      <div> Date of Birth: {formatDate(props.client?.dob)}</div>
      <div>
        Height: {props.client?.height?.ft}ft {props.client?.height?.in}in
      </div>
      <div>Weight: {props.client?.weight}lbs</div>
    </div>
  );
};

export default ClientDisplay;
