(() => {
  const quizSet = [
    { question: 'What is A?', answer: ['A0', 'A1', 'A2', 'A3'] },
    { question: 'What is B?', answer: ['B0', 'B1', 'B2', 'B3'] },
    { question: 'What is C?', answer: ['C0', 'C1', 'C2', 'C3'] },
  ];

  function Question(props) {
    return (
      <h1>{props.quizSet.question}</h1>
    );
  }

  function Answer(props) {
    return (
      <li>{props.answer}</li>
    );
  }

  function AnswerList(props) {
    const answers = props.quizSet.answer.map((answer, index) => {
      return (
        <Answer
          key={index}
          answer={answer}
        />
      );
    });

    return (
      <ul>
        {answers}
      </ul>
    );
  }

  class App extends React.Component {
    constructor() {
      super();
      this.state = {
        quizSet: quizSet,
      };
    }

    render() {
      return (
        <div id="container">
          <Question
            quizSet={this.state.quizSet[0]}
          />
          <AnswerList
            quizSet={this.state.quizSet[0]}
          />
        </div>
      )
    };
  }

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
})();
