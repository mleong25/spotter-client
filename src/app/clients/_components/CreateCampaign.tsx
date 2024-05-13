import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import exercises from '@/app/lib/exercises.json';
import ExerciseCounter from './ExerciseCounter';

const CreateCampaign = (props: any) => {
  const campaignData = {
    goal: '',
    daysTrain: '',
    split: '',
    email: '',
    exercises: [],
  };

  const [campaignFormData, setCampaignFormData] = useState(campaignData);
  const [daysTrain, setDaysTrain] = useState(4);
  const [selectedExercises, setSelectedExercises] = useState<any[]>([]);
  const [selectedGoal, setSelctedGoal] = useState(null);
  const [selectedSplit, setSelectedSplit] = useState(null);

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

  const closeForm = () => {
    props.onCloseForm();
  };

  const selectExercise = (e: any) => {
    setSelectedExercises(e.target.value);
  };

  const removeExercise = (exercise: any) => {
    const updatedExercises = selectedExercises.filter(
      (selectedExercise: any) => {
        return selectedExercise.exercise_name !== exercise.exercise_name;
      }
    );
    setSelectedExercises(updatedExercises);
  };

  const updateExercise = (exercise: any) => {
    const updatedExercises = selectedExercises.map((e: any) => {
      if (e.id === exercise.id) {
        e = exercise;
        return e;
      }
    });
    setSelectedExercises(updatedExercises);
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
            value={selectedGoal}
            onChange={(e: any) => setSelctedGoal(e.value)}
            options={goals}
            optionLabel='name'
            placeholder='Select a Goal'
            className='w-1/2'
          />
        </label>
        <label>
          <span>
            Days to Train ({' '}
            <span className='text-[--primary-300] font-semibold'>
              {daysTrain}x
            </span>{' '}
            / wk )
          </span>
          <input
            className='h-2 rounded-lg appearance-none cursor-pointer mx-1'
            type='range'
            min={1}
            max={7}
            step={1}
            value={daysTrain}
            onChange={(e: any) => {
              setDaysTrain(e.target.value);
            }}
          />
        </label>
        <label>
          Split
          <Dropdown
            value={selectedSplit}
            onChange={(e: any) => setSelectedSplit(e.value)}
            options={splits}
            optionLabel='name'
            placeholder='Select a Split'
            className='w-1/2'
          />
        </label>
        <label>
          Exercises{' '}
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
            <div className=''>
              {selectedExercises.map((exercise: any, i) => {
                return (
                  <ExerciseCounter
                    key={i}
                    exercise={exercise}
                    onRemoveExercise={() => removeExercise(exercise)}
                    onExerciseUpdate={updateExercise}
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
          onClick={closeForm}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateCampaign;
