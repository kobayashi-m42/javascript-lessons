(() => {
  class HttpError extends Error {
    /**
     * @param body
     * @param status
     */
    constructor(body, status) {
      super(body.message);

      this.name = 'HttpError';

      Error.captureStackTrace(this, this.constructor);

      this.status = status || 500;
      this.body = body;
    }
  }

  function Question(props) {
    return (
      <h1>Q. {props.quizSet.question}</h1>
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

  function NextButton(props) {
    return (
      <div
        id="btn"
        className={props.selectedAnswer ? '' : 'disabled'}
        onClick={props.onClick}
      >
        {props.isLast ? 'Show Result' : 'NextQuestion'}
      </div>
    );
  }

  function Result(props) {
    return (
      <div id="result">
        Your score ...
        <div>{props.score} %</div>
      </div>
    );
  }

  function ReplayButton(props) {
    return (
      <div id="btn" onClick={props.onClick}>Replay?</div>
    );
  }

  function ErrorMessage(props) {
    if (!props.errorBody) {
      return null;
    }

    return (
      <div className="alert">{props.errorBody.errorCode} {props.errorBody.message}</div>
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
        isFinished: false,
        isLast: false,
        score: '',
        selectedAnswer: '',
        correctAnswer: '',
        errorBody: {
          errorCode: '',
          message: ''
        }
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

        if (response.status !== 200) {
          const responseBody = await response.json();
          return Promise.reject(new HttpError(responseBody, response.status));
        }

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
        return await response.json();
      } catch (error) {
        console.log(error)
      }
    };

    async componentDidMount() {
      const response = await this.fetchQuiz();
      this.setState({
        quizSet: response.currentQuiz,
        isFinished: response.isFinished,
        isLast: response.isLast,
        score: response.score
      });
    }

    handleAnswerClick = async selectedAnswer => {
      if (this.state.correctAnswer !== '') {
        return;
      }
      try {
        const response = await this.fetchAnswer(selectedAnswer);
        this.setState({
          selectedAnswer: selectedAnswer,
          correctAnswer: response.correctAnswer,
        });
      } catch (error) {
        if (error.name === 'HttpError') {
          this.setState({
            errorBody: {
              errorCode: error.code,
              message: error.message
            }
          });
          return;
        }

        console.log(error);
      }
    };

    handleNextClick = async () => {
      if(!this.state.selectedAnswer) {
        return;
      }

      const response = await this.fetchQuiz();
      this.setState({
        quizSet: response.currentQuiz,
        isFinished: response.isFinished,
        isLast: response.isLast,
        score: response.score,
        selectedAnswer: '',
        correctAnswer: '',
      });
    };

    handleReplayClick = async () => {
      const response = await this.fetchQuiz();
      this.setState({
        quizSet: response.currentQuiz,
        isFinished: response.isFinished,
        isLast: response.isLast,
        score: response.score,
        selectedAnswer: '',
        correctAnswer: '',
      });
    };

    render() {
      const isFinished = this.state.isFinished;

      return (
        <div id="container">
          {!isFinished ? (
            <div>
              <Question
                quizSet={this.state.quizSet}
              />
              <AnswerList
                quizSet={this.state.quizSet}
                selectedAnswer={this.state.selectedAnswer}
                correctAnswer={this.state.correctAnswer}
                onClick={this.handleAnswerClick}
              />
              <NextButton
                selectedAnswer={this.state.selectedAnswer}
                isLast={this.state.isLast}
                onClick={this.handleNextClick}
              />
            </div>
          ) : (
            <div>
              <Result score={this.state.score}/>
              <ReplayButton onClick={this.handleReplayClick}/>
            </div>
          )}
          <ErrorMessage errorBody={this.state.errorBody} />
        </div>
      );
    };
  }

  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
})();
