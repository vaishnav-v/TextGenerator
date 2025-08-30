import { createSignal } from "solid-js";
import { generateText } from "./components/Generator";
import type { TextOptions } from "./models/TextOptions";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Preview from "./components/Preview";

export default function App() {
  const [text, setText] = createSignal<string>("");

  const handleGenerate = (options: TextOptions) => {
    setText(generateText(options));
  };

  return (
    <>
      <div class="app">
          <div class="header-app">
            <Header></Header>
          </div>
          <div class="content-div flex-1 flex overflow-hidden">
            <Sidebar onGenerate={handleGenerate}></Sidebar>
            <Preview text={text()}></Preview>
          </div>
      </div>
    </>
  );
}
