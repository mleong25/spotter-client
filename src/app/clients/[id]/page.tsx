import ClientDisplay from '../_components/ClientDisplay';

const getClientById = async (id: any) => {
  const res = await fetch(`http://localhost:3000/backend/api/Clients/${id}`, {
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to get client.');
  }

  return res.json();
}

const ClientPage = async ({ params }: any) => {

  const { client } = await getClientById(params.id);
  console.log('client', client);

  return (
    <>
      <div className='flex flex-row justify-between'>
        <ClientDisplay client={client} />
      </div>
    </>
  );
}

export default ClientPage;
