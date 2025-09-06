import { createSignal } from "solid-js";

interface PreviewProps {
  text: string;
}

export default function Preview(props: PreviewProps) {
  const [copied, setCopied] = createSignal(false);

  const copyText = async () => {
    if (props.text) {
      await navigator.clipboard.writeText(props.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div class="flex-1 p-8 pb-0 flex flex-col">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold text-gray-900">Preview</h2>
        <button class="btn copy-btn px-3 py-1 text-sm" onClick={copyText}>
          {copied() ? "Copied!" : "Copy"}
        </button>
      </div>

      <div class="flex-1 bg-white p-6 rounded-sm overflow-auto">
        <pre class="whitespace-pre-wrap text-gray-700 font-mono">
          {props.text || "Generated text will appear here..."}
        </pre>
      </div>
    </div>
  );
}
