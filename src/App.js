// https://betterprogramming.pub/creating-a-simple-live-react-editor-a6cc17e77beb

import './styles.css';

import debounce from 'debounce';
import { useEffect, useRef, useState } from "react";
import { createEditor } from './editor';

import * as HeaderModule from './Header';
import * as FoobarModule from './Foobar';

const defaultCode = `
import { Header } from './Header';
import { Foobar } from './Foobar';

function HelloWorld() {
  return (
    <div>
      <Header title="Hello World!" />
      <Foobar />
    </div>
  );
}

<HelloWorld />
`;

function App() {
  const previewRef = useRef(null);
  const [editor, myCreateEditor] = useState(null);
  const [code, setCode] = useState(defaultCode);

  const modules = {
    "./Header": HeaderModule,
    "./Foobar": FoobarModule,
  };

  const moduleResolver = (moduleName) => {
    return modules[moduleName];
  }

  const run = debounce(() => {
    editor.run(code);
  }, 200);

  useEffect(() => {
    myCreateEditor(() => createEditor(previewRef.current, moduleResolver));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (editor) run();
  }, [run, editor]);

  const onCodeChange = ({ target: { value } }) => {
    setCode(value);
  };

  return (
    <div className="App">
      <div className="split-view">
        <div className="preview" ref={previewRef} />
        <div className="code-editor">
          <textarea value={code} onChange={onCodeChange} />
        </div>
      </div>
    </div>
  );
}

export default App;
