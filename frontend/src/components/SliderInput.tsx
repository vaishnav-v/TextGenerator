// src/components/SliderInput.tsx
interface SliderInputProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  disabled:boolean;
  onChange: (val: number) => void;
}

export default function SliderInput(props: SliderInputProps) {
  const handleInput = (e: Event) => {
    let newVal = Number((e.currentTarget as HTMLInputElement).value);
    if(newVal > 1000) newVal = 1000    
    props.onChange(newVal);
  };

  return (
    
    <div class="w-full">
      <input
        type="range"
        min={props.min}
        max={props.max}
        step={props.step ?? 1}
        value={props.value}
        onInput={handleInput}
        class="slider"
        disabled = {!props.disabled}
      />
    </div>
  );
}
