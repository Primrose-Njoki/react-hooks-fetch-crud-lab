/*import React, { useState, useEffect } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState("list");

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data));
  }, []);

  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setQuestions(questions.filter((q) => q.id !== id));
    });
  }

  function handleUpdateQuestion(id, correctIndex) {
    // Optimistic update first
    setQuestions(questions.map(q => 
      q.id === id ? {...q, correctIndex} : q
    ));

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    }).catch(error => {
      console.error("Update failed:", error);
      // Revert if failed
      setQuestions(questions);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
     
   const form = e.target;
    const newQuestion = {
      prompt: form.elements.prompt.value,
      answers: [
        form.elements.answer1.value,
        form.elements.answer2.value,
        form.elements.answer3.value,
        form.elements.answer4.value,
      ],
      correctIndex: parseInt(form.elements.correctIndex.value),
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((r) => r.json())
      .then((data) => {
        setQuestions([...questions, data]);
        setPage("list");
      })
      .catch(error => console.error("Submission failed:", error));
  }

  return (
    <div>
      <button onClick={() => setPage("list")}>View Questions</button>
      <button onClick={() => setPage("form")}>New Question</button>

      {page === "list" ? (
        <div>
          {questions.map((question) => (
            <div key={question.id}>
              <h3>{question.prompt}</h3>
              <div>
                {question.answers.map((answer, index) => (
                  <div key={index}>{answer}</div>
                ))}
              </div>
              <label>
                Correct Answer:
                <select
                  value={question.correctIndex}
                  onChange={(e) => 
                    handleUpdateQuestion(question.id, parseInt(e.target.value))
                  }
                  aria-label="Correct Answer"
                >
                  {question.answers.map((_, index) => (
                    <option key={index} value={index}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </label>
              <button onClick={() => handleDeleteQuestion(question.id)}>
                Delete Question
              </button>
            </div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>New Question</h2>
          <label>
            Prompt:
            <input 
              type="text" 
              name="prompt" 
              required 
              aria-label="Prompt"
            />
          </label>
          <label>
            Answer 1:
            <input 
              type="text" 
              name="answer1" 
              required 
              aria-label="Answer 1"
            />
          </label>
          <label>
            Answer 2:
            <input 
              type="text" 
              name="answer2" 
              required 
              aria-label="Answer 2"
            />
          </label>
          <label>
            Answer 3:
            <input 
              type="text" 
              name="answer3" 
              required 
              aria-label="Answer 3"
            />
          </label>
          <label>
            Answer 4:
            <input 
              type="text" 
              name="answer4" 
              required 
              aria-label="Answer 4"
            />
          </label>
          <label>
            Correct Answer:
            <select 
              name="correctIndex" 
              required
              aria-label="Correct Answer"
            >
              <option value="0">1</option>
              <option value="1">2</option>
              <option value="2">3</option>
              <option value="3">4</option>
            </select>
          </label>
          <button type="submit">Add Question</button>
        </form>
      )}
    </div>
  );
}

export default App;*/

import React, { useState, useEffect } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState("list");

  // Form states
  const [prompt, setPrompt] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");
  const [correctIndex, setCorrectIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data));
  }, []);

  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setQuestions(questions.filter((q) => q.id !== id));
    });
  }

  function handleUpdateQuestion(id, correctIndex) {
    const originalQuestions = [...questions];
    setQuestions(questions.map(q => 
      q.id === id ? {...q, correctIndex} : q
    ));

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    }).catch(error => {
      console.error("Update failed:", error);
      setQuestions(originalQuestions);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newQuestion = {
      prompt,
      answers: [answer1, answer2, answer3, answer4],
      correctIndex,
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((r) => r.json())
      .then((data) => {
        setQuestions([...questions, data]);
        setPage("list");
        // Clear form fields
        setPrompt("");
        setAnswer1("");
        setAnswer2("");
        setAnswer3("");
        setAnswer4("");
        setCorrectIndex(0);
      })
      .catch(error => console.error("Submission failed:", error));
  }

  return (
    <div>
      <button onClick={() => setPage("list")}>View Questions</button>
      <button onClick={() => setPage("form")}>New Question</button>

      {page === "list" ? (
        <div>
          {questions.map((question) => (
            <div key={question.id}>
              <h3>{question.prompt}</h3>
              <div>
                {question.answers.map((answer, index) => (
                  <div key={index}>{answer}</div>
                ))}
              </div>
              <label>
                Correct Answer:
                <select
                  value={question.correctIndex}
                  onChange={(e) => 
                    handleUpdateQuestion(question.id, parseInt(e.target.value))
                  }
                  aria-label="Correct Answer"
                >
                  {question.answers.map((_, index) => (
                    <option key={index} value={index}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </label>
              <button onClick={() => handleDeleteQuestion(question.id)}>
                Delete Question
              </button>
            </div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>New Question</h2>
          <label>
            Prompt:
            <input 
              type="text" 
              name="prompt" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required 
              aria-label="Prompt"
            />
          </label>
          <label>
            Answer 1:
            <input 
              type="text" 
              name="answer1" 
              value={answer1}
              onChange={(e) => setAnswer1(e.target.value)}
              required 
              aria-label="Answer 1"
            />
          </label>
          <label>
            Answer 2:
            <input 
              type="text" 
              name="answer2" 
              value={answer2}
              onChange={(e) => setAnswer2(e.target.value)}
              required 
              aria-label="Answer 2"
            />
          </label>
          <label>
            Answer 3:
            <input 
              type="text" 
              name="answer3" 
              value={answer3}
              onChange={(e) => setAnswer3(e.target.value)}
              required 
              aria-label="Answer 3"
            />
          </label>
          <label>
            Answer 4:
            <input 
              type="text" 
              name="answer4" 
              value={answer4}
              onChange={(e) => setAnswer4(e.target.value)}
              required 
              aria-label="Answer 4"
            />
          </label>
          <label>
            Correct Answer:
            <select 
              name="correctIndex" 
              value={correctIndex}
              onChange={(e) => setCorrectIndex(parseInt(e.target.value))}
              required
              aria-label="Correct Answer"
            >
              <option value="0">1</option>
              <option value="1">2</option>
              <option value="2">3</option>
              <option value="3">4</option>
            </select>
          </label>
          <button type="submit">Add Question</button>
        </form>
      )}
    </div>
  );
}

export default App;

