import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from 'primereact/inputnumber';
import { useState } from 'react';

const ExerciseCounter = (props: any) => {
  const [setCounter, setSetCounter] = useState<number | null | undefined>(1);
  const [repCounter, setRepCounter] = useState<number | null | undefined>(1);

  const exercise = props.exercise;

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
            value={setCounter}
            onValueChange={(e: InputNumberValueChangeEvent) =>
              setSetCounter(e.value)
            }
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
            value={repCounter}
            onValueChange={(e: InputNumberValueChangeEvent) =>
              setRepCounter(e.value)
            }
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
