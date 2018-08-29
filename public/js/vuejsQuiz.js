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
        console.log(error);
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
        console.log(error);
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
        console.log(error);
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
