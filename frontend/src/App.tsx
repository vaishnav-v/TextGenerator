import { createSignal } from "solid-js";
import { Generator } from "./components/Generator"; // class import
import type { TextOptions } from "./models/TextOptions";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Preview from "./components/Preview";

export default function App() {
  const [text, setText] = createSignal<string>("");

  const handleGenerate = (options: TextOptions) => {
    const generator = new Generator(options); // create instance
    setText(generator.generate());        // call class method
  };

  return (
    <div class="app">
      <div class="header-app">
        <Header />
      </div>
      <div class="content-div flex-1 flex overflow-hidden">
        <Sidebar onGenerate={handleGenerate} />
        <Preview text={text()} />
      </div>
      <div class="footer flex p-2 justify-center">
        <span>
          © 2025 Lorem Text Generator. Free online tool for developers & designers.
        </span>
        &nbsp;
        Want to generate fonts: try our new font generator &nbsp; <a  target="_blank" class="underline" href="http://givemefonts.com" title="fancy font generator">givemefonts.com</a>
      </div>
    </div>
  );
}
