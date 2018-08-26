new Vue({
  el: '#app',
  data: {
    // quizSets:
    // { question: 'What is A?', answers: ['A0', 'A1', 'A2', 'A3'] }
    quizSets: {
      question: '',
      answer: []
    }
  },
  methods:{
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
    }
  },
  mounted: async function () {
    try {
      const response = await this.fetchQuiz();
      this.quizSets = response.currentQuiz;
    } catch (error) {
      console.log(error);
    }
  }
});
