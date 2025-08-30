import { createSignal } from "solid-js";
import type { TextOptions } from "../models/TextOptions";
import {
  FormControlLabel,
  Checkbox,
  FormControl,
  Radio,
  RadioGroup,
} from "@suid/material";
import SliderInput from "./SliderInput";

interface SidebarProps {
  onGenerate: (options: TextOptions) => void;
}

export default function Sidebar(props: SidebarProps) {
  // const [paragraphs, setParagraphs] = createSignal<number>(1);
  // const [words, setWords] = createSignal<number>(0);
  // const [bytes, setBytes] = createSignal<number>(0);
  // const [lists, setLists] = createSignal<number>(0);
  // const [Text, setText] = createSignal(false);
  // const [range, setRange] = createSignal(300);

  const [textChecked, setTextChecked] = createSignal(false);
  const [textType, setTextType] = createSignal("paragraph");
  const [textCount, setTextCount] = createSignal(10);

  function submitClicked() {
    console.log("aa");
    const payload: TextOptions = {
      textChecked: textChecked(),
      textType: textType(),
      textCount: textCount(),
    };
    console.log(payload);

    props.onGenerate(payload);
  }

  return (
    <>
      <div class="sidebar-c w-1/3 bg-white flex flex-col">
        <div class="filters">
          <div class="filter-main-box">
            <div class="top-filter">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={textChecked()}
                    onChange={(_, value) => setTextChecked(value)}
                    color="primary"
                    class="custom-check"
                  />
                }
                style="margin:0"
                label="Text"
              />
            </div>
            <div class="filter-params">
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="paragraph"
                  name="radio-buttons-group"
                  class="text-radio"
                  style="flex-direction:row !important"
                  value={textType()}
                  
                  
                  onChange={(_, value) => setTextType(value)}
                >
                  <FormControlLabel
                    value="paragraph"
                    control={<Radio />}
                    label="Paragraph"
                    disabled={!textChecked()}
                  />
                  <FormControlLabel
                    value="words"
                    control={<Radio />}
                    label="Words"
                    disabled={!textChecked()}
                  />
                  <FormControlLabel
                    value="letters"
                    control={<Radio />}
                    label="Letters"
                    disabled={!textChecked()}
                  />
                </RadioGroup>
              </FormControl>
              <div class="slider-wrapper flex">
                <div class="slider-c" style="width:64%">
                  {textChecked()}
                  <SliderInput
                    min={0}
                    max={1000}
                    value={textCount()}
                    onChange={setTextCount}
                    disabled={textChecked()}
                  />
                </div>

                <input
                  type="number"
                  min={0}
                  max={1000}
                  value={textCount()}
                  onInput={(e) =>
                    setTextCount(parseInt(e.currentTarget.value) || 0)
                  }
                  disabled={!textChecked()}
                  class="range-input ml-2 w-16 border rounded px-2 py-1 text-center focus:outline-none focus:ring-0 no-arrows"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="action flex justify-end">
          <button
            onClick={submitClicked}
            class="generate btn-primary"
            name="generate"
            id="btn-generate"
          >
            Generate
          </button>
        </div>
      </div>
    </>
  );
}
