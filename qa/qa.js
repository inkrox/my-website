/* QA 问答 —— 从 CSV 读取题目，读取失败时使用内置题库兜底 */
(function () {
  'use strict';

  var questions = [];
  var currentQuestionIndex = 0;
  var score = 0;

  var questionText = document.getElementById('question-text');
  var optionsBox = document.getElementById('options');
  var feedbackSpan = document.getElementById('feedback');
  var scoreSpan = document.getElementById('score');
  var progressSpan = document.getElementById('progress');
  var restartBtn = document.getElementById('restart');

  /* 内置兜底题库（与 questions.csv 一致，本地直接打开页面也能玩） */
  var FALLBACK_QUESTIONS = [
    ['世界上最深的海沟是？', ['波多黎各海沟', '马里亚纳海沟', '汤加海沟', '千岛 - 堪察加海沟'], 1],
    ['中国古代四大名著中，哪一部是描写神怪故事的？', ['《红楼梦》', '《水浒传》', '《西游记》', '《三国演义》'], 2],
    ['被称为“诗仙”的唐代诗人是？', ['杜甫', '王维', '李白', '白居易'], 2],
    ['以下哪种动物属于哺乳动物？', ['鲨鱼', '乌龟', '蝙蝠', '鳄鱼'], 2],
    ['地球的卫星是？', ['金星', '火星', '月球', '木星'], 2],
    ['世界上面积最大的国家是？', ['中国', '俄罗斯', '加拿大', '美国'], 1],
    ['下列哪个节日是纪念屈原的？', ['春节', '端午节', '中秋节', '元宵节'], 1],
    ['人体中含量最多的元素是？', ['氧', '碳', '氢', '氮'], 0],
    ['文艺复兴运动起源于哪个国家？', ['英国', '法国', '意大利', '德国'], 2],
    ['世界上最长的河流是？', ['长江', '亚马孙河', '尼罗河', '密西西比河'], 2]
  ];

  function parseCSV(csvText) {
    var parsed = [];
    var rows = csvText.split('\n');
    rows.forEach(function (row) {
      row = row.replace(/\r$/, ''); // 兼容 Windows 换行符
      if (!row.trim()) { return; }
      var parts = row.split(',');
      var question = parts[0];
      var options = parts.slice(1, 5);
      var answerIndex = parseInt(parts[5], 10);
      if (question && options.length === 4 && !isNaN(answerIndex)) {
        parsed.push({ question: question, options: options, answer: answerIndex });
      }
    });
    return parsed;
  }

  function escapeHTML(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* 从 CSV 文件读取，失败则用内置题库 */
  async function loadQuestions() {
    try {
      var response = await fetch('questions.csv');
      if (!response.ok) { throw new Error('HTTP ' + response.status); }
      var csvText = await response.text();
      questions = parseCSV(csvText);
    } catch (error) {
      console.warn('题库 CSV 加载失败，使用内置题库:', error);
      questions = FALLBACK_QUESTIONS.map(function (item) {
        return { question: item[0], options: item[1], answer: item[2] };
      });
    }
    if (!questions.length) {
      questionText.textContent = '题库为空，请检查 questions.csv';
      return;
    }
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
  }

  /* 显示当前问题 */
  function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
      finishQuiz();
      return;
    }
    var current = questions[currentQuestionIndex];
    questionText.innerHTML = escapeHTML(current.question);
    optionsBox.innerHTML = '';
    current.options.forEach(function (option, index) {
      var button = document.createElement('button');
      button.className = 'option-btn';
      button.innerHTML = escapeHTML(option);
      button.addEventListener('click', function () { checkAnswer(index); });
      optionsBox.appendChild(button);
    });
    feedbackSpan.textContent = '';
    feedbackSpan.className = 'feedback';
    progressSpan.textContent = '第 ' + (currentQuestionIndex + 1) + ' / ' + questions.length + ' 题';
    scoreSpan.textContent = score;
  }

  /* 检查答案 */
  function checkAnswer(selectedIndex) {
    var current = questions[currentQuestionIndex];
    var buttons = optionsBox.querySelectorAll('.option-btn');

    // 标出正确答案，禁用所有按钮
    buttons.forEach(function (button, index) {
      button.disabled = true;
      if (index === current.answer) {
        button.style.borderColor = '#2e7d32';
        button.style.background = '#e8f5e9';
      } else if (index === selectedIndex) {
        button.style.borderColor = '#c62828';
        button.style.background = '#ffebee';
      }
    });

    if (selectedIndex === current.answer) {
      score++;
      feedbackSpan.textContent = '回答正确！';
      feedbackSpan.className = 'feedback correct';
    } else {
      feedbackSpan.innerHTML = '回答错误！正确答案是: <span class="correct-answer">' +
        escapeHTML(current.options[current.answer]) + '</span>';
      feedbackSpan.className = 'feedback incorrect';
    }
    scoreSpan.textContent = score;

    setTimeout(function () {
      currentQuestionIndex++;
      showQuestion();
    }, 900);
  }

  /* 答题结束 */
  function finishQuiz() {
    questionText.textContent = '答题结束！';
    optionsBox.innerHTML = '';
    progressSpan.textContent = '';
    feedbackSpan.innerHTML = '最终得分：<b>' + score + '</b> / ' + questions.length +
      (score === questions.length ? ' 🏆 满分！数学万岁！' : '');
    feedbackSpan.className = 'feedback ' + (score === questions.length ? 'correct' : 'incorrect');
    restartBtn.style.display = 'inline-block';
  }

  restartBtn.addEventListener('click', function () {
    restartBtn.style.display = 'none';
    loadQuestions();
  });

  /* 初始化 */
  loadQuestions();
})();
