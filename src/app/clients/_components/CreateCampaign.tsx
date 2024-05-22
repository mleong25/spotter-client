import ExerciseCounter from './ExerciseCounter';
import exercises from '@/app/lib/exercises.json';
import { useRouter } from 'next/navigation';
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { InputNumber } from 'primereact/inputnumber';

const CreateCampaign = (props: any) => {
  const router = useRouter();

  const exercisesList: any[] | undefined = [];

  const campaignData = {
    goal: { name: '', code: '' },
    duration: 8,
    daysTrain: 4,
    split: { name: '', code: '' },
    exercises: exercisesList,
    hasStarted: false,
  };

  const goals = [
    { name: 'Strength Training', code: 'strength' },
    { name: 'Cut / Weight Loss', code: 'cut' },
    { name: 'Maintenance', code: 'maintain' },
    { name: 'Bulk / Weight Gain', code: 'bulk' },
    { name: 'Body Recomposition', code: 'recomp' },
  ];

  const splits = [
    { name: 'Cardio', code: 'cardio' },
    { name: 'Push / Pull / Legs', code: 'ppl' },
    { name: 'Upper / Lower', code: 'upper_lower' },
    { name: 'Body Part', code: 'body_part' },
    { name: 'Full Body', code: 'full_body' },
    { name: 'Powerlifting', code: 'powerlift' },
    { name: 'Custom', code: 'custom' },
  ];

  const [campaignFormData, setCampaignFormData] = useState(campaignData);
  const [selectedExercises, setSelectedExercises] = useState<any[]>([]);
  const [error, setError] = useState(false);

  if (error) throw new Error('Error creating Campaign.');

  const closeForm = () => {
    props.onCloseForm();
  };

  const selectExercise = (e: any) => {
    setSelectedExercises(e.target.value);
  };

  const removeExercise = (exercise: any) => {
    const updatedCampaignExercises = campaignFormData.exercises.filter(
      (selectedExercise: any) => {
        return selectedExercise.exercise_name !== exercise.exercise_name;
      }
    );
    setCampaignFormData({
      ...campaignFormData,
      exercises: updatedCampaignExercises,
    });

    const updatedSelectExercises = selectedExercises.filter(
      (selectedExercise: any) => {
        return selectedExercise.exercise_name !== exercise.exercise_name;
      }
    );
    setSelectedExercises(updatedSelectExercises);
  };

  const updateCampaignFormExercises = (exercise: any) => {
    const updatedExercises = selectedExercises.map((e: any) => {
      if (e?.id === exercise?.id) {
        return exercise;
      }
      return e;
    });
    setCampaignFormData({ ...campaignFormData, exercises: updatedExercises });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formattedCampaignData = {
      ...campaignFormData,
      goal: campaignFormData.goal.code,
      split: campaignFormData.split.code,
    };

    const res = await fetch(`/backend/api/Campaigns`, {
      method: 'POST',
      body: JSON.stringify({ formattedCampaignData }),
      //@ts-ignore
      'Content-Type': 'application/json',
    });

    if (!res.ok) setError(true);

    const data = await res.json();
    const newCampaign = data?.campaign;

    props.onCreateCampaign(newCampaign);

    closeForm();

    router.refresh();
    router.push(`/clients/${props.client._id}`);
  };

  return (
    <div className='flex flex-col h-full relative overflow-auto'>
      <div className='flex baseline items-center gap-2'>
        <ArrowLeftCircleIcon
          className='w-10 p-1 cursor-pointer'
          onClick={closeForm}
        />
        New Campaign for: {props.client.firstName} {props.client.lastName}
      </div>
      <div className='flex flex-col grow'>
        <label>
          Goal
          <Dropdown
            value={campaignFormData.goal}
            onChange={(e: any) =>
              setCampaignFormData({ ...campaignFormData, goal: e.value })
            }
            options={goals}
            optionLabel='name'
            placeholder='Select a Goal'
            className='w-1/2'
          />
        </label>
        <label>
          Duration (weeks)
          <InputNumber
            value={campaignFormData.duration}
            onValueChange={(e: any) => {
              setCampaignFormData({ ...campaignFormData, duration: e.value });
            }}
            min={1}
            showButtons
            className='w-1/2'
          />
        </label>
        <label>
          <span>
            Days to Train ({' '}
            <span className='text-[--primary-300] font-semibold'>
              {campaignFormData.daysTrain}x
            </span>{' '}
            / wk )
          </span>
          <input
            className='h-2 rounded-lg appearance-none cursor-pointer mx-1'
            type='range'
            min={1}
            max={7}
            step={1}
            value={campaignFormData.daysTrain}
            onChange={(e: any) => {
              setCampaignFormData({
                ...campaignFormData,
                daysTrain: e.target.value,
              });
            }}
          />
        </label>
        <label>
          Split
          <Dropdown
            value={campaignFormData.split}
            onChange={(e: any) =>
              setCampaignFormData({ ...campaignFormData, split: e.value })
            }
            options={splits}
            optionLabel='name'
            placeholder='Select a Split'
            className='w-1/2'
          />
        </label>
        <label>
          Exercises
          <MultiSelect
            value={selectedExercises}
            onChange={selectExercise}
            options={exercises}
            optionLabel='exercise_name'
            filter
            placeholder='Select Exercises'
            maxSelectedLabels={2}
            showSelectAll={false}
            virtualScrollerOptions={{ itemSize: 30 }}
            className='p-component w-1/2 justify-end text-[--gray-700]'
          />
        </label>
        {selectedExercises.length > 0 ? (
          <>
            <div className='flex w-1/2 justify-around self-end mt-3'>
              <div>Sets</div>
              <div>Reps</div>
            </div>
            <div>
              {selectedExercises.map((exercise: any, i) => {
                return (
                  <ExerciseCounter
                    key={i}
                    exercise={exercise}
                    onRemoveExercise={() => removeExercise(exercise)}
                    onExerciseUpdate={updateCampaignFormExercises}
                  />
                );
              })}
            </div>
          </>
        ) : null}
      </div>
      <div className='flex justify-evenly place-items-end w-full gap-6 sticky bottom-0 w-full p-4 bg-black'>
        <button
          className='flex h-[48px] w-full items-center justify-center gap-2 border rounded-lg p-3 text-sm font-medium hover:bg-red-50 hover:text-red-600'
          onClick={closeForm}
        >
          Cancel
        </button>
        <button
          className='flex h-[48px] w-full items-center justify-center gap-2 border rounded-lg p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600'
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateCampaign;
