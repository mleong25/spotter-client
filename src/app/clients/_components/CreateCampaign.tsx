import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import exercises from '@/app/lib/exercises.json';

const CreateCampaign = (props: any) => {
  const [daysTrain, setDaysTrain] = useState(4);
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [selectedExercises, setSelectedExercises] = useState<any[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<any>(null);

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

    // setTimeout(() => {
    //   setSelectedExercise(null);
    // }, 300);
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
          <select defaultValue={''}>
            <option value='' disabled>
              Select Goal
            </option>
            <option value='strength'>Strength Training</option>
            <option value='cut'>Cut / Weight Loss</option>
            <option value='maintenance'>Maintain</option>
            <option value='bulk'>Bulk / Weight Gain</option>
            <option value='recomp'>Body Recomposition</option>
          </select>
        </label>
        <label>
          <span>
            Days to Train ({' '}
            <span className='text-blue-400 font-semibold'>{daysTrain}x</span> /
            wk )
          </span>
          <input
            className='h-2 rounded-lg appearance-none cursor-pointer'
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
          <select defaultValue={''}>
            <option value='' disabled>
              Select Split
            </option>
            <option value='cardio'>Cardio</option>
            <option value='ppl'>Push / Pull / Legs</option>
            <option value='upper_lower'>Upper / Lower</option>
            <option value='body_part'>Body Part</option>
            <option value='full_body'>Full Body</option>
            <option value='powerlift'>Powerlifting</option>
            <option value='custom'>Custom</option>
          </select>
        </label>
        <label>
          Exercises{' '}
          <AutoComplete
            field='exercise_name'
            value={selectedExercise}
            suggestions={filteredExercises}
            completeMethod={search}
            onChange={selectExercise}
            className='p-component w-1/2 justify-end m-1'
            inputClassName='w-full m-0'
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
