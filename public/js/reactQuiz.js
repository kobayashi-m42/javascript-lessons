(() => {
  function Question(props) {
    return (
      <h1>{props.quizSet.question}</h1>
    );
  }

  function Answer(props) {
    let message;
    let className;

    if (!props.correctAnswer) {
      className = '';
      message = '';
    } else {
      className = props.answer === props.correctAnswer ? 'correct' : 'wrong';
      if (props.answer === props.selectedAnswer) {
        message = props.answer === props.correctAnswer ? ' ... CORRECT!' : ' ... WRONG!';
      }
    }

    return (
      <li
        className={className}
        onClick={() => props.onClick(props.answer)}
      >
        {props.answer}{message}
      </li>
    );
  }

  function AnswerList(props) {
    const answers = props.quizSet.answer.map((answer, index) => {
      return (
        <Answer
          key={index}
          answer={answer}
          selectedAnswer={props.selectedAnswer}
          correctAnswer={props.correctAnswer}
          onClick={props.onClick}
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
        quizSet: {
          question: '',
          answer: []
        },
        selectedAnswer: '',
        correctAnswer: '',
      };
    }

    fetchAnswer = async selectedAnswer => {
      try {
        const request = {
          method: 'post',
          credentials: 'same-origin',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
          body: `selectedAnswer=${selectedAnswer}`
        };
        const response = await fetch('/api/reactQuiz', request);

        return await response.json();
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuiz = async () => {
      try {
        const request = {
          method: 'get',
          credentials: 'same-origin',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
        };
        const response = await fetch('/api/reactQuiz', request);
        const currentQuiz= await response.json();

        this.setState({
          quizSet: currentQuiz
        });

      } catch (error) {
        console.log(error)
      }
    };

    async componentDidMount() {
      await this.fetchQuiz();
    }

    handleAnswerClick = async selectedAnswer => {
      if (this.state.correctAnswer !== '') {
        return;
      }

      const response = await this.fetchAnswer(selectedAnswer);
      this.setState({
        selectedAnswer: selectedAnswer,
        correctAnswer: response.correctAnswer,
      });
    };

    render() {
      return (
        <div id="container">
          <Question
            quizSet={this.state.quizSet}
          />
          <AnswerList
            quizSet={this.state.quizSet}
            selectedAnswer={this.state.selectedAnswer}
            correctAnswer={this.state.correctAnswer}
            onClick={this.handleAnswerClick}
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
