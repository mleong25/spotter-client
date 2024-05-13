import {
  InputNumber,
  InputNumberValueChangeEvent,
} from 'primereact/inputnumber';
import { useEffect, useState } from 'react';

const ExerciseCounter = (props: any) => {
  const [exercise, setExercise] = useState(props.exercise);

  useEffect(() => {
    setExercise({ ...exercise, sets: 1, reps: 1 });
  }, []);

  useEffect(() => {
    props.onExerciseUpdate(exercise);
  }, [exercise]);

  return (
    <div className='flex justify-between items-center mt-4 w-full'>
      <div className='flex w-1/2 items-center'>
        <i
          className='pi pi-trash text-[--red-500] text-base cursor-pointer px-2'
          onClick={() => props.onRemoveExercise()}
        ></i>
        {exercise.exercise_name}
      </div>
      <div className='flex w-1/2 items-center gap-2'>
        <div className='flex flex-col text-center'>
          <InputNumber
            value={exercise.sets}
            onValueChange={(e: InputNumberValueChangeEvent) => {
              setExercise({ ...exercise, sets: e.value });
            }}
            showButtons
            buttonLayout='horizontal'
            step={1}
            min={1}
            incrementButtonIcon='pi pi-plus'
            decrementButtonIcon='pi pi-minus'
            inputStyle={{ textAlign: 'center' }}
          />
        </div>
        <div className='flex flex-col text-center'>
          <InputNumber
            value={exercise.reps}
            onValueChange={(e: InputNumberValueChangeEvent) => {
              setExercise({ ...exercise, reps: e.value });
            }}
            showButtons
            buttonLayout='horizontal'
            step={1}
            min={1}
            incrementButtonIcon='pi pi-plus'
            decrementButtonIcon='pi pi-minus'
            inputStyle={{ textAlign: 'center' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ExerciseCounter;
