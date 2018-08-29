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

Vue.component('answer', {
  props: ['answer','selectedAnswer','correctAnswer'],
  template: `
    <li
      @click="judge(answer)"
      v-bind:class="answerClass(answer)"
    >
      {{ answer }} {{ resultMessage(answer) }}
    </li>
  `,
  methods: {
    judge: function(){
      this.$emit('judge', this.answer);
    },
    answerClass: function (answer) {
      let className;
      if (!this.correctAnswer) {
        className = '';
      } else {
        className = answer === this.correctAnswer ? 'correct' : 'wrong';
      }

      return className;
    },
    resultMessage: function (answer) {
      let message;

      if (!this.correctAnswer) {
        message = '';
      } else {
        if (answer === this.selectedAnswer) {
          message = answer === this.correctAnswer ? ' ... CORRECT!' : ' ... WRONG!';
        }
      }

      return message;
    }
  }
});

new Vue({
  el: '#app',
  data: {
    quizSets: {
      question: '',
      answer: []
    },
    selectedAnswer: '',
    correctAnswer: '',
    isFinished: false,
    isLast: false,
    score: '',
    errorBody: {
      errorCode: '',
      message: ''
    },
    csrfToken: ''
  },
  methods: {
    fetchQuiz: async function (){
      try {
        const request = {
          method: 'get',
          credentials: 'same-origin',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
        };
        const response = await fetch('/api/quiz', request);

        if (response.status !== 200) {
          const responseBody = await response.json();
          return Promise.reject(new HttpError(responseBody, response.status));
        }

        return await response.json();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    fetchAnswer: async function (selectedAnswer) {
      try {
        const request = {
          method: 'post',
          credentials: 'same-origin',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'CSRF-Token': this.csrfToken
          },
          body: `selectedAnswer=${selectedAnswer}`
        };
        const response = await fetch('/api/quiz', request);

        if (response.status !== 200) {
          const responseBody = await response.json();
          return Promise.reject(new HttpError(responseBody, response.status));
        }

        return await response.json();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    handleAnswerClick: async function (answer){
      if (this.selectedAnswer !== '') {
        return;
      }
      this.selectedAnswer = answer;
      try {
        const response = await this.fetchAnswer(this.selectedAnswer);
        this.correctAnswer = response.correctAnswer;
      } catch (error) {
        if (error.name === 'HttpError') {
          this.errorBody = {
            errorCode: error.body.errorCode,
            message: error.message
          };
          return;
        }

        this.errorBody = {
          errorCode: 500,
          message: 'Internal Server Error'
        };
      }
    },
    handleNextClick: async function (){
      if(!this.selectedAnswer) {
        return;
      }
      try {
        const response = await this.fetchQuiz();
        this.quizSets = response.currentQuiz;
        this.csrfToken = response.csrfToken;
        this.isFinished = response.isFinished;
        this.isLast = response.isLast;
        this.score = response.score;
        this.selectedAnswer = '';
        this.correctAnswer = '';
      } catch (error) {
        if (error.name === 'HttpError') {
          this.errorBody = {
            errorCode: error.body.errorCode,
            message: error.message
          };
          return;
        }

        this.errorBody = {
          errorCode: 500,
          message: 'Internal Server Error'
        };

      }
    },
    handleReplayClick: async function () {
      try {
        const response = await this.fetchQuiz();
        this.quizSets = response.currentQuiz;
        this.csrfToken = response.csrfToken;
        this.isFinished = response.isFinished;
        this.isLast = response.isLast;
        this.score = response.score;
        this.selectedAnswer = '';
        this.correctAnswer = '';
      } catch (error) {
        if (error.name === 'HttpError') {
          this.errorBody = {
            errorCode: error.body.errorCode,
            message: error.message
          };
          return;
        }

        this.errorBody = {
          errorCode: 500,
          message: 'Internal Server Error'
        };
      }
    }
  },
  mounted: async function () {
    try {
      const response = await this.fetchQuiz();
      this.quizSets = response.currentQuiz;
      this.isFinished = response.isFinished;
      this.isLast = response.isLast;
      this.score = response.score;
      this.csrfToken = response.csrfToken;
    } catch (error) {
      console.log(error);
    }
  }
});
