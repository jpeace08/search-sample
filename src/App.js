import { useState, useRef, useMemo } from "react";
import useContent from "./hooks/use-content";

function App() {
  const refTimeOut = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { content, isLoading } = useContent(searchTerm);

  const onChange = type => e => {
    if (refTimeOut.current) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = null;
    }
    refTimeOut.current = setTimeout(
      (value) => {
        setSearchTerm(value)
      },
      300,
      e && e.target ? e.target.value : e,
    );
  }

  //Mỗi lần content thay đổi sẽ render lại
  const renderContent = useMemo(() => {
    return (
      <ul>
        {content && (content || []).map(item => (
          <li>{item?.title}</li>
        ))}
      </ul>
    )
  }, [content]);

  return (
    <>
      <input
        type="text"
        name="searchTerm"
        id=""
        onChange={onChange("searchTerm")}
      />

      {renderContent}
    </>
  );
}

export default App;
