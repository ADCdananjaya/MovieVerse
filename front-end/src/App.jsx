import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [key, setKey] = useState(0);

  const handleClick = async () => {
    const data = {
      title: "Witcher",
      description: "Witcher S03 part 01 was released recently.",
      genreId: "649935ac7ab7a357f5925a2f",
      duration: 190,
      rating: 9.5,
    };

    const formData = new FormData();
    for (const key in data) formData.append(key, data[key]);
    formData.append("file", file);

    try {
      await axios.post("http://localhost:3000/api/movies", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (ex) {
      console.log(ex);
    }

    setKey((prev) => prev + 1);
  };

  return (
    <>
      <div className="">
        <input
          type="file"
          key={key}
          onChange={(e) => setFile(e.target.files[0])}
          name="cover"
        />
        <button
          className="px-4 py-2 bg-blue-400 hover-bg-blue-500"
          onClick={handleClick}
        >
          Click me
        </button>
      </div>
    </>
  );
}

export default App;
