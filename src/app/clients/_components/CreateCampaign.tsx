import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import exercises from '@/app/lib/exercises.json';

const CreateCampaign = (props: any) => {
  const [daysTrain, setDaysTrain] = useState(4);
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [selectedExercises, setSelectedExercises] = useState<any[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<any>(null);
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

  const search = (e: any) => {
    // Timeout to emulate a network connection
    setTimeout(() => {
      let _filteredExercises;

      if (!e.query.trim().length) {
        _filteredExercises = [...exercises];
      } else {
        _filteredExercises = exercises.filter((exercise) => {
          return exercise.exercise_name
            .toLowerCase()
            .startsWith(e.query.toLowerCase());
        });
      }

      setFilteredExercises(_filteredExercises);
    }, 250);
  };

  const selectExercise = (e: any) => {
    const exercise = e.target.value;

    if (exercise) {
      setSelectedExercise(exercise);
      setSelectedExercises([...selectedExercises, selectedExercise]);
    }
  };

  return (
    <div className='flex flex-col h-full'>
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
            <span className='text-[--primary-300] font-semibold'>{daysTrain}x</span> /
            wk )
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
          <AutoComplete
            field='exercise_name'
            multiple
            value={selectedExercise}
            suggestions={filteredExercises}
            completeMethod={search}
            onChange={selectExercise}
            className='p-component w-1/2 justify-end'
          />
        </label>
      </div>
      <div className='flex justify-evenly place-items-end w-full gap-6'>
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
