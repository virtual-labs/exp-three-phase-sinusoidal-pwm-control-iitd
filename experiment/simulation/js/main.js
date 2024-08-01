// * Audio Mute
let isMute = false;

// * Current Date
let cd = new Date();
var currentDateGlobal = `${cd.getDate()} - ${
  cd.getMonth() + 1
} - ${cd.getFullYear()}`;
console.log(currentDateGlobal);

// * Quiz object
const Quiz = {
  quizData: [
    {
      question:
        "Which of the following machine is used to measure compressive strength?",
      a: "Universal testing machine",
      b: "Impact testing machine",
      c: "Fatigue testing machine",
      d: "Erichsen machine",
      correct: "a",
    },
    {
      question:
        "Which one of the following, is not a unit of ultimate tensile strength?",
      a: "MPa",
      b: "N/m2",
      c: "Kg/m3",
      d: "PSI",
      correct: "c",
    },
    {
      question: "The extensometer can be attached anywhere to the specimen _",
      a: "Yes",
      b: "No",
      c: "No but sometime yes",
      d: "None of the above",
      correct: "b",
    },

    {
      question:
        "What is the smallest measurement that is possible by vernier calliper?",
      a: "Least count",
      b: "Actual reading",
      c: "Main scale division",
      d: "Vernier scale division",
      correct: "a",
    },
    {
      question: "What is the least count of a standard metric vernier caliper",
      a: "0.002mm",
      b: "0.02mm",
      c: "0.1mm",
      d: "0.2mm",
      correct: "b",
    },
  ],
  quiz_contianer: document.querySelector(".quiz-container"),
  quiz: document.getElementById("quiz"),
  answerEls: document.querySelectorAll(".answer"),
  questionEl: document.getElementById("question"),
  a_text: document.getElementById("a_text"),
  b_text: document.getElementById("b_text"),
  c_text: document.getElementById("c_text"),
  d_text: document.getElementById("d_text"),
  ansDom: document.getElementById("quizAns"),
  opsDom: [this.a_text, this.b_text, this.c_text, this.d_text],
  loadQuizCallCount: 0,
  currentQuiz: 0,
  score: 0,
  loadQuiz() {

    
    if (this.currentQuiz >= this.quizData.length) {
      return;
    }
    document.querySelector(".transparent-box").style.display = "block";
    this.loadQuizCallCount++;
    window.speechSynthesis.cancel();
    setCC("Choose the correct answer.");
    this.deselectAnswers();
    this.quiz_contianer.style.display = "block";
    const currentQuizData = this.quizData[this.currentQuiz];

    this.questionEl.innerText = currentQuizData.question;
    this.a_text.innerText = currentQuizData.a;
    this.b_text.innerText = currentQuizData.b;
    this.c_text.innerText = currentQuizData.c;
    this.d_text.innerText = currentQuizData.d;
  },

  getSelected() {
    let answer = undefined;
    this.answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
        answer = answerEl.id;
      }

    });
    this.answerEls.forEach((answerEl) => {
      if (answer != undefined) {
        answerEl.disabled = true;
      }

    });
    
    return answer;
  },

  deselectAnswers() {
    this.answerEls.forEach((answerEl) => {
      answerEl.checked = false;
      answerEl.disabled = false;
    });
  },
  close() {
    this.quiz_contianer.style.display = "none";
    for (let od of this.opsDom) {
      od.style.color = "";
    }
    document.querySelector(".transparent-box").style.display = "none";

    // this.ansDom.style.display = "none";
  },
  init() {
    let okBtn = document.getElementById("quizSubmit") ;
    okBtn.textContent = "Submit";
    // onclick for quiz close btn
    // document.querySelector("#closeQuiz").onclick = () => {
    //   this.close();
    // };
    // onclick for quiz submit btn
    document.getElementById("quizSubmit").onclick = ()=> {


                
      // for disable multiple submit
      if (this.loadQuizCallCount - 1 !== this.currentQuiz) {
        return;
      }    
      // subtitle for quiz
      const answer = this.getSelected();
      if (answer) {
        // this.ansDom.style.display = "block";
        // this.ansDom.innerHTML = "✔ "+ this.quizData[this.currentQuiz][this.quizData[this.currentQuiz].correct];

        // updating options with the right and wrong emoji
        let ops = "abcd";
        for (let o in ops) {
          if (ops[o] == this.quizData[this.currentQuiz].correct) {
            this.opsDom[o].innerHTML += " ✔️";
            this.opsDom[o].style.color = "green";
          } else {
            this.opsDom[o].innerHTML += " ❌";
            this.opsDom[o].style.color = "red";
          }
        }

        if (answer === this.quizData[this.currentQuiz].correct) {
          this.score++;
        }
        this.currentQuiz++;

        //for ok button

        okBtn.textContent = "Ok";
        okBtn.onclick = function(){
          Quiz.close();
          Quiz.init();
        }                                                                                                                      

        // to stop the next question
        // if (this.currentQuiz < this.quizData.length) {
        // this.loadQuiz();
        // } else {
        //             this.quiz.innerHTML = ` <h2>You answered correctly at ${this.score}/${this.quizData.length} questions.</h2>
        // <button onclick="#">Reload</button>
        // `;
        // todo show above string to certificate
        // }
      }
      // this.close();
    }
  },
}

// * ChartJs
const ChartGraph = {
  ctx: document.getElementById("myChart"),
  ctxBox: document.querySelector(".chart"),
  graphs: [
    (Graph1 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
    (Graph2 = {
      labels: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6],
      datapoints: [0, 470, 488, 512, 515, 570],
    }),
    (Graph3 = {
      labels: [0, 0.02, 0.04, 0.06, 0.08, 1, 1.2],
      datapoints: [0, 480, 520, 560, 602, 535],
    }),
    (Graph4 = {
      labels: [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07],
      datapoints: [0, 100, 185, 260, 360, 435, 452],
    }),
  ],
  currGr: null,
  delete: function () {
    this.ctxBox.style.display = "none";
    this.currGr.destroy();
   },
  view: function (num, left, top, height = null, width = null) {
    if (height != null) this.ctxBox.style.height = height + "px!important";
    if (width != null) this.ctxBox.style.width = width + "px!important";
    this.ctxBox.style.left = left + "px";
    this.ctxBox.style.top = top + "px";
    this.ctxBox.style.display = "block";
    this.currGr = new Chart(this.ctx, {
      type: "line",
      data: {
        labels: this.graphs[num].labels,
        datasets: [
          {
            label: "Engineering Stress-Strain Curve",
            data: this.graphs[num].datapoints,
            borderWidth: 1,
            tension: 0.4,
          },
          // {
          //   label: "_",
          //   data: [0, 470],
          //   borderWidth: 1,
          // },
        ],
      },
      options: { 
        borderWidth: 3,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    return this;
  },
}

Quiz.init();

// for restriction on next button ;
let isPerformNext = false;

// animation is running
let isRunning = false;
// to set isProcessRunning and also sync the progressbar + drawer
// ! and toggle the next btn active / deactive
function toggleNextBtn(){
  let nextBtn = document.querySelector(".btn-next")
  nextBtn.classList.toggle("btn-deactive")
}
const setIsProcessRunning = (value) => {
  // calling toggle the next
  if(value != isRunning){
    toggleNextBtn()
  }

  isRunning = value;
  if(value){
    speechSynthesis.cancel()
    if(ccQueue){
      ccQueue = []
    }
    Dom.hideAll()
  }
};

const show = (ele, disp = "block", opa = 1) => {
  ele.style.display = disp;
  ele.style.opacity = opa;
};
const opacity = (ele, val = 1) => {
  ele.style.opacity = val;
};
const hide = (ele, disp = "none") => {
  ele.style.display = disp;
};
const hideAll = (elesName, disp = "none") => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    hide(ele);
  }
};
const showAll = (elesName, disp = "none", opa = 1) => {
  let eles = getAll(elesName);
  for (let ele of eles) {
    show(ele, "block", opa);
  }
};

const set = (ele, l = null, t = null) => {
  if (l !== null) {
    ele.style.left = l + "px";
  }
  if (t !== null) {
    ele.style.top = t + "px";
  }
  show(ele);
};

let student_name = "";
// let currentDateGlobal = "";

// ! text to audio

const 


textToSpeach = (text) => {
  // if(isMute){
  //   return;
  // }
  let utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.voice = window.speechSynthesis.getVoices()[0];
  window.speechSynthesis.speak(utterance);
  return utterance;
};

//queue for 
let ccQueue = [];
// for subtitile
let ccObj = null;
function setCC(text = null, speed = 25) {
  if (ccObj != null) {
    ccObj.destroy();
  }
  
  let ccDom = get(".steps-subtitle .subtitle");
  ccQueue.push(text);
  ccObj = new Typed(ccDom, {
    strings: ["", ...ccQueue],
    typeSpeed: speed,
    onStringTyped(){
      ccQueue.shift();
      // if(ccQueue.length != 0){
      //   setCC(ccQueue.shift())
      // }
    }
  });
  let utterance = null
  if (!isMute){
    utterance = textToSpeach(text);
  } 
  return utterance;
}
   
// * for cursor pointer
function cursorPointer(ele) {
  ele.style.cursor = "pointer";
}

// Img.setBlinkArrow(true,790,444).play();

const Scenes = {
  items: {
    anime_main_dom: new Dom(".anime-main"),
    arrowRound: new Dom("arrowRound"),
    blinkArrow: new Dom("blinkArrow"),
    larrow: new Dom("laerrow"),
    larrow2: new Dom("laerrow2"),
    logo: new Dom("logo"),
    man: new Dom("man"),
    arrow: new Dom("measurearrow"),
    arrow2: new Dom("measurearrow2"),
    redsize: new Dom("redsize"),
    speech_off_btn: new Dom("speech_off_btn"),
    speech_on_btn: new Dom("speech_on_btn"),
    talk_cloud: new Dom("talk_cloud"),
    projectIntro: new Dom(".project-intro"),
    header: new Dom(".anime-header"),
    stepHeading: new Dom(".step-heading"),
    stepTitle: new Dom(".step-title"),
    stepDescription: new Dom(".step-description"),
    tableCalc: new Dom(".measurements"),
    tempText: new Dom(".temp-text"),
    tempText2: new Dom(".temp-text2"),
    tempInputBox: new Dom(".temp-input"),
    tempInputBoxInput: new Dom(".temp-input #ipnum"),
    tempInputT1: new Dom(".temp-input .text1"),
    tempInputT2: new Dom(".temp-input .text2"),
    tempInputError: new Dom(".temp-input .error"),
    tempInputBtn: new Dom(".temp-input .submit-btn"),
    utmBtn: new Dom(".utm-button"),
    inputWindow: new Dom(".user-input"),
    resultTable: new Dom(".result-table"),
    certificate: new Dom(".certificate"),
    welcomeBox: new Dom(".welcome-box"),
    videoBox: new Dom(".video-box"),
    videoBoxSrc: new Dom(".video-box .video"),
    videoBoxTitle: new Dom(".video-box .title"),
    videoBoxRestartBtn: new Dom(".video-box .controls .restart"),
    imageBox: new Dom(".image-box"),
    imageBoxSrc: new Dom(".image-box .image"),
    imageBoxTitle: new Dom(".image-box .title"),
    tempTitle1: new Dom(".temp-title1"),
    tempTitle2: new Dom(".temp-title2"),
    tempTitle3: new Dom(".temp-title3"),
    tempTitle4: new Dom(".temp-title4"),
    tempTitle5: new Dom(".temp-title5"),
    tempTitle6: new Dom(".temp-title6"),
    tempTitle7: new Dom(".temp-title7"),
    tempTitle8: new Dom(".temp-title8"),
    tempTitle9: new Dom(".temp-title9"),
    tempTitle10: new Dom(".temp-title10"),
    tempTitle11: new Dom(".temp-title11"),
    tempTitle12: new Dom(".temp-title12"),
    tempTitle13: new Dom(".temp-title13"),
    tempTitle14: new Dom(".temp-title14"),
    tempTitle15: new Dom(".temp-title15"),
    tempTitle16: new Dom(".temp-title16"),
    tempTitle17: new Dom(".temp-title17"),
    tempTitle18: new Dom(".temp-title18"),
    tempTitle19: new Dom(".temp-title19"),
    tempTitle20: new Dom(".temp-title20"),
    tempTitle21: new Dom(".temp-title21"),
    tempTitle22: new Dom(".temp-title22"),
    tempTitle23: new Dom(".temp-title23"),
    tempTitle24: new Dom(".temp-title24"),
    tempTitle25: new Dom(".temp-title25"),
    tempTitle26: new Dom(".temp-title26"),
    tempTitle27: new Dom(".temp-title27"),
    tempTitle28: new Dom(".temp-title28"),
    tempTitle29: new Dom(".temp-title29"),
    tempTitle30: new Dom(".temp-title30"),
    tempTitle31: new Dom(".temp-title31"),
    tempTitle32: new Dom(".temp-title32"),
    tempTitle33: new Dom(".temp-title33"),
    tempTitle34: new Dom(".temp-title34"),
    tempTitle35: new Dom(".temp-title35"),
    tempTitle36: new Dom(".temp-title36"),
    tempTitle37: new Dom(".temp-title37"),
    tempTitle38: new Dom(".temp-title38"),
    tempTitle39: new Dom(".temp-title39"),
    tempTitle40: new Dom(".temp-title40"),
    tempTitle41: new Dom(".temp-title41"),
    tempTitle42: new Dom(".temp-title42"),
    tempTitle43: new Dom(".temp-title43"),
    tempTitle44: new Dom(".temp-title44"),
    tempTitle45: new Dom(".temp-title45"),
    tempTitle46: new Dom(".temp-title46"),
    tempTitle47: new Dom(".temp-title47"),
    tempTitle48: new Dom(".temp-title48"),
    tempTitle49: new Dom(".temp-title49"),
    tempTitle50: new Dom(".temp-title50"),
    tempTitle51: new Dom(".temp-title51"),
    tempTitle52: new Dom(".temp-title52"),
    tempTitle53: new Dom(".temp-title53"),
    tempTitle54: new Dom(".temp-title54"),
    tempTitle55: new Dom(".temp-title55"),
    tempTitle56: new Dom(".temp-title56"),
    tempTitle57: new Dom(".temp-title57"),
    tempTitle58: new Dom(".temp-title58"),
    tempTitle59: new Dom(".temp-title59"),
    tempTitle60: new Dom(".temp-title60"),

    contentAdderBox: new Dom(".content-adder-box"),
    btn_save: new Dom(".btn-save"),
    btn_next: new Dom(".btn-next"),
    
box_img : new Dom("box_img"),
component_battery : new Dom("component_battery"),
component_capacitor : new Dom("component_capacitor"),
component_diode : new Dom("component_diode"),
component_inductor : new Dom("component_inductor"),
component_mosfet : new Dom("component_mosfet"),
component_register : new Dom("component_register"),
full_circuit : new Dom("full_circuit"),
full_circuit2 : new Dom("full_circuit2"),
circuit_full_2 : new Dom("circuit_full_2"),
circuit_full_3 : new Dom("circuit_full_3"),
graph_arrow : new Dom("part_3_graph_arrow"),
part_3_option_1 : new Dom("part_3_option_1"),
part_3_option_2 : new Dom("part_3_option_2"),
part_3_option_3 : new Dom("part_3_option_3"),
part_3_option_4 : new Dom("part_3_option_4"),
record_btn : new Dom("record_btn"),
part3_table_one : new Dom(".part3_table_one"),
part3_table_two : new Dom(".part3_table_two"),
part3_table_three : new Dom(".part3_table_three"),
part3_table_four : new Dom(".part3_table_four"),
part3_table_four_2 : new Dom(".part3_table_four_2"),
slider_vIn : new Dom(".slider_vIn"),
slider_D : new Dom(".slider_D"),
slider_R : new Dom(".slider_R"),
slider_C : new Dom(".slider_C"),
part_2_circuit : new Dom("part_2_circuit"),
part_2_graph_1 : new Dom("part_2_graph_1"),
part_2_graph_2 : new Dom("part_2_graph_2"),
part_2_graph_3 : new Dom("part_2_graph_3"),
run_btn : new Dom("run_btn"),
slider_box : new Dom(".slider-box"),
right_tick_1 : new Dom("right_tick_1"),
right_tick_2 : new Dom("right_tick_2"),
right_tick_3: new Dom("right_tick_3"),
right_tick_4 : new Dom("right_tick_4"),
graph1: new Dom(".graph1"),
graph2: new Dom(".graph2"),
graph3: new Dom(".graph3"),
graph4: new Dom(".graph4"),
graph5: new Dom(".graph5"),
graph6: new Dom(".graph6"),
graph7: new Dom(".graph7"),
graph8: new Dom(".graph8"),
graph9: new Dom(".graph9"),
graph_box_1: new Dom(".graph_box1"),
graph_box_2: new Dom(".graph_box2"),
graph_box_3: new Dom(".graph_box3"),
graph_box_4: new Dom(".graph_box4"),
graph_box_5: new Dom(".graph_box5"),
graph_box_6: new Dom(".graph_box6"),
graph_box_7: new Dom(".graph_box7"),
graph_box_8: new Dom(".graph_box8"),
graph_box_9: new Dom(".graph_box9"),
xLabel: new Dom(".xLabel"),
yLabel: new Dom(".yLabel"),
xLabel2: new Dom(".xLabel2"),
yLabel2: new Dom(".yLabel2"),
graph1_arrow : new Dom("graph1_arrow"),
graph2_arrow : new Dom("graph2_arrow"),
part_2_graph_empty : new Dom("part_2_graph_empty"),
part_3_option_4_graph : new Dom("part_3_option_4_graph"),
btn_delete : new Dom(".btn-delete"),
btn_reset : new Dom(".btn-reset"),
btn_record : new Dom(".btn-record"),
btn_check_connections: new Dom(".btn-check-connections"),
btn_circuit_diagram: new Dom(".btn-circuit-diagram"),

btn_transparent: new Dom(".btn-transparent"),
 
formulas_component_stress : new Dom("formulas_component_stress"),
formulas_efficiency : new Dom("formulas_efficiency"),
formulas_ideal : new Dom("formulas_ideal"),
formulas_nomenclautre : new Dom("formulas_nomenclautre"),
formulas_non_ideal : new Dom("formulas_non_ideal"),
formulas_procedure : new Dom("formulas_procedure"),
formulas_universal : new Dom("formulas_universal"),
part_3_option_select : new Dom("part_3_option_select"),
part_1_text_for_crrct: new Dom("part_1_text_for_crrct"),
part_1_text_for_wrong: new Dom("part_1_text_for_wrong"),

// EE17 images added
        btn_check : new Dom("btn_check"),
        btn_delete : new Dom("btn_delete"),
        btn_record : new Dom("btn_record"),
        btn_reset : new Dom("btn_reset"),
        part_1_circuit : new Dom("part_1_circuit"),
        part_1_correect_text : new Dom("part_1_correect_text"),
        part_1_text : new Dom("part_1_text"),
        part_1_text_border : new Dom("part_1_text_border"),
        part_2_circuit : new Dom("part_2_circuit"),
        part_2_select_option_1 : new Dom("part_2_select_option_1"),
        part_2_select_option_2 : new Dom("part_2_select_option_2"),
        part_2_select_option_3 : new Dom("part_2_select_option_3"),

        graph_legends_1: new Dom("graph_legends_1"),
        graph_legends_2: new Dom("graph_legends_2"),




//EE3 img added
box1 : new Dom("box1"),
box2 : new Dom("box2"),
box3 : new Dom("box3"),
box4 : new Dom("box4"),
box5 : new Dom("box5"),
box6 : new Dom("box6"),
part1_circuit : new Dom("part1_circuit"),
part1_component_capacitor : new Dom("part1_component_capacitor"),
part1_component_diode : new Dom("part1_component_diode"),
part1_component_inductor : new Dom("part1_component_inductor"),
part1_component_mosfet : new Dom("part1_component_mosfet"),
part1_component_resistance : new Dom("part1_component_resistance"),
part1_component_voltage : new Dom("part1_component_voltage"),
part_3_option_5 : new Dom("part_3_option_5"),

part1_crrct_text : new Dom("part1_crrct_text"),
part1_incrrct_text : new Dom("part1_incrrct_text"),
part1_crrct_circuit : new Dom("part1_crrct_circuit"),
ee3_btn_check : new Dom(".ee3-btn-check"),
ee3_btn_reset : new Dom(".ee3-btn-reset"),
ee3_btn_hint : new Dom(".ee3-btn-hint"),
part4_table_graph : new Dom("part4_table_graph"),

//ee3 symbol imgs added

symbol_vIn : new Dom("symbol_vIn"),
symbol_L : new Dom("symbol_L"),
symbol_C : new Dom("symbol_C"),
symbol_S : new Dom("symbol_S"),
symbol_D : new Dom("symbol_D"),
symbol_R : new Dom("symbol_R"),

part_2_graph_data_upper: new Dom("part_2_graph_data_upper"),

concept_development : new Dom(".concept_development"),

// EE3 dom items added

part1_box1 : new Dom(".part1_box1"),
graph_legends: new Dom("graph_legends"),
buffer_back: new Dom("buffer_back"),




     
        

// ! new items dom
 domQs1: new Dom("domQs1"),
 domQs2: new Dom("domQs2"),
 domQs3: new Dom("domQs3"),
 domQs4: new Dom("domQs4"),
 domQs5: new Dom("domQs5"),
 domQs6: new Dom("domQs6"),


 //! to change header
 experiment_heading: new Dom(".experiment_heading"),

 chart: [
  graph1=null,
  graph2=null,
  graph3=null,
  graph4=null,
  graph5=null,
  graph6=null,
  graph7=null,
  graph8=null,
  graph9=null,
  graph10=null,
 ],

 chart: {
  label1:{
    x: "Label 2",
    y: "Label 1",
  },
  label2:{
    x: "",
    y: "",
  },
  label3:{
    x: "Label 2",
    y: "Label 1",
  },
  label4:{
    x: "Label 2",
    y: "Label 1",
  },
  label5:{
    x: "Label 2",
    y: "Label 1",
  },
  label6:{
    x: "Label 2",
    y: "Label 1",
  },
  label7:{
    x: "Label 2",
    y: "Label 1",
  },
  label8:{
    x: "Label 2",
    y: "Label 1",
  },
  label9:{
    x: "Label 2",
    y: "Label 1",
  },
  label10:{
    x: "Label 2",
    y: "Label 1",
  },
 } 



  },
  deleteAll() {
    for (i in this.img) {
      Scenes.img[i].hide();
    }
    for (i in this.items) {
      if (i == "header" || i == "stepTitle" || i == "stepDescription") {
        continue;
      }
      hide(Scenes.items[i]);
    }
  },
  // for content adder btn box
  contentAdderAddBtn(text) {
    Scenes.items.contentAdderBox.item.innerHTML += `<li class="btn content-adder">${text}</li>`;
  },
  currentStep: 0,
  subCurrentStep: 0,
  resetSubStep() {
    this.subCurrentStep = 0;
  },
  incCurrentSubStep() {
    this.subCurrentStep++;
  },
  setStepHeading(step, description) {
    Scenes.items.stepTitle.setContent(step);
    Scenes.items.stepDescription.setContent(description);
    Scenes.items.stepHeading.show("flex").push();
  },

  changeHeader(step, left_ = -326, size ){
    // return                 
    let heading = Scenes.items.experiment_heading
    heading.styles({
      left: `${left_}px`,
      fontSize: `${size}px`
    })
    switch(step){
      case 1: heading.setContent("Circuit Connection")
      break; 
      case 2: heading.setContent("Performace Characteristics")
      break;
      case 3: heading.setContent("Six-step VSI: 180° Conduction Mode")
      break;
      case 4: heading.setContent("Sinusoidal PWM Scheme")
      break;
      case 5: heading.setContent("Comparison of Six-step VSI and Sine PWM Inverter")
      break;
    }
  },
  // for typing hello text
  intru: null,
  intruVoice: null,
  optionsDone:[0,0,0],
  steps: [
    (intro = () => {
      // remove all dom element for back and setProcessRunning
      setIsProcessRunning(true);


      // starting elements

      // subtitle
      setTimeout(() => {
        setCC("Enter your name and click on 'Start' to start the experiment");
      }, 500);
      Scenes.items.header.set(0, 120).show("flex");
      let inputWindow = get(".user-input");
      show(inputWindow, "flex");
      let man = new Dom("man").set(650, 80).push();

      let submitBtn = get("#nameSubmitBtn");
      submitBtn.onclick = () => {
        student_name = get("#stuName").value;
        let error = get(".user-input .error");
        // todo remove comment
        if (student_name.trim() == "") {
          show(error);
          return;
        }
        // take only first space
        let fName = student_name.slice(0, student_name.indexOf(" "));
        hide(error);
        let tl = anime.timeline({
          easing: "easeOutExpo",
          duration: 1000,
        });
        tl.add({
          targets: ".anime-header",
          top: 0,
        })
          .add({
            targets: ".user-input",
            opacity: 0,
          })
          .add({
            targets: man.item,
            translateX: -280,
          })
          .add({
            targets: Scenes.items.talk_cloud.item,
            begin() {
              // Scenes.items.tempText.innerHTML = `👋 Hey!<br>${fName}`;
              Scenes.items.tempText.item.style.fontWeight = "bold";
              // show(Scenes.items.tempText);
              intru = new Typed(Scenes.items.tempText.item, {
                strings: ["", `Hey!👋<br>${fName}`],
                typeSpeed: 25,
              });
              Scenes.items.tempText.set(482, 1);
              textToSpeach(`Hey! ${fName}`);
              textToSpeach(
                "Welcome to Foundation Wall in Foamwork Experiment of Foamwork Technology in Civil Engineering Virtual Lab developed by Prof. K. N. Jha, Department of Civil Engineering, IIT Delhi."
              );
              Scenes.items.talk_cloud.set(450, -40, 180).push();
              setCC("");
            },
            endDelay: 2000,
            opacity: [0, 1],
          })
          .add({
            begin(){
               // to hide previous step images
               intru.destroy();
               Dom.hideAll();
              Scenes.items.welcomeBox.show("flex");
            }
          })
            .add({
              duration: 12000,
              complete() {
                setCC("Click 'Next' to go to next step");
                Dom.setBlinkArrow(true, 790, 444).play();
                setIsProcessRunning(false);
            },
          });
      };
      return true;
      }),
    (objective = function () {
      setIsProcessRunning(true);
      Dom.hideAll()
      // require
      Scenes.items.slider_box.hide()
      
      let btn_transparent = Scenes.items.btn_transparent.set().zIndex(6000).item;

      Scenes.items.concept_development.set().styles({
        zIndex: "5000",
        scale: "0.98 0.914",
        top: "-144px",
        position: "absolute",
      })

      // ! Slide ended enable the button next button
      function checkIsSlideEnded(){
        let isSlideEnded = localStorage.getItem("isSlideEnded")
        if(isSlideEnded=="true"){
          btn_transparent.disabled = false
          setIsProcessRunning(false)
          btn_transparent.classList.remove("btn-disabled")
          // setCC("Click next to goto next slide.")
          Dom.setBlinkArrowRed(true, 866, 420,30,null,-90).play();
          btn_transparent.onclick = ()=>{
            Scenes.next()
            localStorage.setItem("isSlideEnded",false)
            window.clearInterval(interval)
          }
        }
      }
      var interval = window.setInterval(checkIsSlideEnded, 1000)
        
      return true;
    }),  
    //! Circuit formulation part1
    (step1 = function () {
      setIsProcessRunning(true);
      // to hide previous step
      Dom.hideAll();
      Scenes.items.projectIntro.hide()
      Dom.setBlinkArrow(-1);
      Scenes.items.btn_next.show()
      Scenes.items.btn_transparent.set().hide()
      Scenes.items.slider_box.hide()

      Scenes.changeHeader(1, -285, 28)

      setCC("Make connections suitably to form a three-phase bridge inverter.")

      let vertexBox = new Dom(".vertex-box")
      vertexBox.show()

      //! Required positions
      Scenes.items.part_1_circuit.set(4, 70, 381)
      Scenes.items.btn_check.set(730+50, -36, 42).zIndex(1)
      Scenes.items.btn_reset.set(820+40, -36, 42).zIndex(1)
      Scenes.items.part_1_text_border.set(575, 40, 115)
      Scenes.items.part_1_text.set(605, 55, 79)
      Scenes.items.part_1_correect_text.set(21, -50, 140).hide()

      function badaKardo( target ){
        anime({
          targets: target.item,
          scale: "1.1",
          loop: true,
          easing: "easeInOutQuad"
        })
      }

      badaKardo(Scenes.items.part_1_text)


      
      let st = {
        backgroundColor: "#c00000",
          fontSize: "1.2rem",
          padding: "2px",
          textShadow: "1px 2px #c00000"
      }

      // Scenes.items.tempTitle10.setContent("Connect the components to form a 3-phase uncontrolled bridge rectifier").set(94, 6, 57, 357).styles(st)

      anime({
        targets: Scenes.items.tempTitle10.item,
        scale: [1, 1.1],
        easing: "linear",
        loop: true,
      })
      
      // connected vertex src and dest
      let allConnectedVertexSrcDest = {}

      function isConnectionsRight(isConnectionsCorrect){
        let imgToShow = null
        if(isConnectionsCorrect){

          Dom.setBlinkArrowRed(-1)
  

          setCC("Connections are correct. Proceed for experimentation")
          Scenes.items.part_1_text_border.hide()
          Scenes.items.part_1_text.hide()
          Scenes.items.part_1_correect_text.show()


          // * destroy all the connection
          
          
          //to go to next step 
          Dom.setBlinkArrow(true, 790, 544).play();
          setIsProcessRunning(false);
          

        }
        else{
          setCC("Incorrect connections, try again")
        }
      }


      Scenes.items.slider_box.hide();

      // ! JSPLumb cable 
      function cable(){
        
        Scenes.items.btn_check.item.onclick = checkCableConnection
        // ! connections array contains connected idxs
        // ! initializing the checkgraph for connections
        let matricesForCheckGraph = []
        // ! connection is right/wrong
        let isConnectionRight = false
        // set graph
        function fillCheckGraph(){
          //* to fill element in array
          function create2DArray(rows, cols, initValue){

            filledArray = new Array(rows)

            for(let i=0;i<rows;i++){
              filledArray[i] = new Array(cols)

              for(let j=0;j<cols;j++){
                filledArray[i][j] = initValue
              }
            }
            return filledArray;
          }

          // fill zero 
          let noOfVertex = 23
          matricesForCheckGraph = create2DArray(noOfVertex, noOfVertex, 0)

          //* fixed connection is filled
          let xAxisFixed = [1, 2, 5, 6, 7]
          let yAxisFixed = [3, 4, 8, 9, 10]
          for(let i in xAxisFixed){
            matricesForCheckGraph[xAxisFixed[i]][yAxisFixed[i]] = 1
            matricesForCheckGraph[yAxisFixed[i]][xAxisFixed[i]] = 1
          }

          // console.log(matricesForCheckGraph)
        } 
        fillCheckGraph()

        // minimum connection length for check graph
        let minimumConnectionsLength = 5
        // ! check
        function checkCableConnection() {
          // console.log("sneha")
          // console.log("sneha")
          // if (connections.length == 0) {
          //   alert("Please make the connections first");
          //   return false;
          // }
          // ! Matched Graph 
          let isGraphMatched = false

          if (connections.length < minimumConnectionsLength) {
            setCC("Connect all the terminals first")
            return false;
          }
          if (connections.length >= minimumConnectionsLength) {
            // ! listDiv contains vertexConnectionsName
            // eg vertex10, vertex23
            var listDiv = [];
            for (var j = 0; j < connections.length; j++) {
              let pos = [connections[j].targetId,connections[j].sourceId] 
              listDiv.push(pos) 
            }

            // ! Main logic for hecking graph
            for(let i=0;i<listDiv.length;i++){
              // * to convert div to idx only
              function convertDivtextToIdx(divText){
                let convertedText = ""
                let text = divText.substr(-2)
                let num1 = text[0]
                let num2 = text[1]
                if(!isNaN(num1))
                  convertedText+=num1
                if(!isNaN(num2))
                  convertedText+=num2
                return parseInt(convertedText)
              }
              // substr is so i can extract the number from the id
              let vertexSrcIdx = convertDivtextToIdx(listDiv[i][0])
              let vertexDestIdx = convertDivtextToIdx(listDiv[i][1])

              if(matricesForCheckGraph[vertexSrcIdx][vertexDestIdx] == 1){
                isGraphMatched = true
              }
              else{
                isGraphMatched = false
                break
              }
            }

            
            // ! for right connection note
            if(isGraphMatched){
              isConnectionsRight(true)
            }else{
              // ! for wrong connection
              // alert("Wrong Connections, try again.")
              isConnectionsRight(false)
              allConnectedVertexSrcDest = []
            }
          }
          
        }
        // checkCableConnection()
        (showConnectionInfo = function (listDiv) {
        }),
        (hideConnectionInfo = function (listDiv) {
          listDiv.style.display = "none";
        }),
        (connections = []),
        (updateConnections = function (conn, remove) {
          if (!remove) {
            connections.push(conn);
            // ! show blink when all vertex are connected
            // todo change size 4 to 13
            if(connections.length == minimumConnectionsLength){
              Dom.setBlinkArrowRed(true,805, 5, 30,30,90).play()

              // Dom.setBlinkArrowRed(true,805,10,30,null,90).play()
            }
          }

          else {
            var idx = -1;
            for (var i = 0; i < connections.length; i++) {
              if (connections[i] == conn) {
                idx = i;
                break;
              }
            }
            if (idx != -1) connections.splice(idx, 1);
          }
          if (connections.length > 0) {
            var listDiv = [];
            for (var j = 0; j < connections.length; j++) {
              let pos = [connections[j].targetId,connections[j].sourceId] 
              listDiv.push(pos)
            }
            showConnectionInfo(listDiv);
          }
        });

        jsPlumb.ready(function () {
          var instance = jsPlumb.getInstance();

          // suspend drawing and initialise.
          instance.batch(function () {
            // bind to connection/connectionDetached events, and update the list of connections on screen.
            instance.bind("connection", function (info, originalEvent) {
              updateConnections(info.connection);
            });
            instance.bind("connectionDetached", function (info, originalEvent) {
              updateConnections(info.connection, true);
            });

            instance.bind("connectionMoved", function (info, originalEvent) {
              //  only remove here, because a 'connection' event is also fired.
              // in a future release of jsplumb this extra connection event will not
              // be fired.
              updateConnections(info.connection, true);
            });

            // configure some drop options for use by all endpoints.
            var exampleDropOptions = {
              tolerance: "touch",
              hoverClass: "dropHover",
              activeClass: "dragActive",
            };

            // ! for setting up the endpoints
            function setEndPoint(maxConnections=1, color = "ff0000"){
              let radius = 7
              let endPointStyleData = {
                endpoint: ["Dot", { radius: radius }],
                paintStyle: { fill: `#${color}` },
                isSource: true,
                scope: "green",
                connectorStyle: { stroke: `#${color}`, strokeWidth: 6 },
                connector: ["Bezier", { curviness: -7 }],
                maxConnections: maxConnections,
                isTarget: true,
                dropOptions: exampleDropOptions,
              }
              return endPointStyleData
            }

            //colors code
            // red = ff0000
            // Yellow = f2b50c
            // Black = 0070c0
            // Blue = 000000
            

            //* for purple 
            var exampleEndpoint1 = setEndPoint(1, "7030a0")

            //* for black
            var exampleEndpoint2 = setEndPoint(1,"000000")

            //* for red
            var exampleEndpoint3 = setEndPoint(1, "c00000")

            //* for blue
            var exampleEndpoint4 = setEndPoint(1, "0000ff")

            //* for green
            var exampleEndpoint5 = setEndPoint(1, "006600")


            function addEndPoints(){

              // ! for purple wire

              // conn 1
              instance.addEndpoint(
                "vertex1",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );
              instance.addEndpoint(
                "vertex3",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint1
              );

              //! for black wire

              //conn 2
              instance.addEndpoint(
                "vertex2",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );
              instance.addEndpoint(
                "vertex4",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint2
              );


              //! for red wire
              
              //conn 3
              instance.addEndpoint(
                "vertex5",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint3
              );
              instance.addEndpoint(
                "vertex8",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint3
              );

              //! for blue wire

              //conn 4
              instance.addEndpoint(
                "vertex6",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint4
              );

              instance.addEndpoint(
                "vertex9",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint4
              );

              //! for green wire

              //conn 1
              instance.addEndpoint(
                "vertex7",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint5
              );
              instance.addEndpoint(
                "vertex10",
                { anchor: [0.75, 0, 0, -1] },
                exampleEndpoint5
              );

         
            }
            addEndPoints()


            /*instance.addEndpoint("vertex9", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
            instance.addEndpoint("vertex10", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint4);
            instance.addEndpoint("vertex11", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);
            instance.addEndpoint("vertex12", { anchor: [0.75, 0, 0, -1] }, exampleEndpoint3);*/

            instance.draggable(jsPlumb.getSelector(".drag-drop-demo .window"));

            var hideLinks = jsPlumb.getSelector(".drag-drop-demo .hide");
            instance.on(hideLinks, "click", function (e) {
              instance.toggleVisible(this.getAttribute("rel"));
              jsPlumbUtil.consume(e);
            });

            var dragLinks = jsPlumb.getSelector(".drag-drop-demo .drag");
            instance.on(dragLinks, "click", function (e) {
              var s = instance.toggleDraggable(this.getAttribute("rel"));
              this.innerHTML = s ? "disable dragging" : "enable dragging";
              jsPlumbUtil.consume(e);
            });

            var detachLinks = jsPlumb.getSelector(".drag-drop-demo .detach");
            instance.on(detachLinks, "click", function (e) {
              instance.deleteConnectionsForElement(this.getAttribute("rel"));
              jsPlumbUtil.consume(e);
            });

            // ! reset
            instance.on(Scenes.items.btn_reset.item, "click", function (e) {
              // instance.detachEveryConnection();
              instance.deleteEveryConnection()
              showConnectionInfo("");
              jsPlumbUtil.consume(e);
              Dom.setBlinkArrowRed(-1)
            });
          });

          jsPlumb.fire("jsPlumbDemoLoaded", instance);
        });
      }

      // calling cable function
      cable()
      
      // ------ end



      return true
    }),
    //! select option
    (step2 = function () {
      setIsProcessRunning(true);
      Scenes.items.btn_next.show()
      
      // todo all previous elements hide
      Dom.hideAll();

      // ! destroy connection
      Scenes.items.btn_reset.item.click()
      getAll(".jtk-endpoint").forEach(ele=>{
        ele.style.display = "none"
      })
      Scenes.items.contentAdderBox.item.innerHTML = ""
      Scenes.changeHeader(2, -235, 28)

      // * remove all previous restrictions
      Dom.hideAll()
      
      // ! Required Elements

      // Scenes.items.part_.set(-29, -73, 485)  
      Scenes.items.part_2_select_option_1.set(21, 95, 220).zIndex(4)
      Scenes.items.part_2_select_option_2.set(331, 95, 220).zIndex(3)
      Scenes.items.part_2_select_option_3.set(635, 95, 220).zIndex(2)

      // // hide the slider
      Scenes.items.slider_box.hide()

 

      // hide all tables
      // Scenes.items.part3_table_one.hide()
      // Scenes.items.part3_table_two.hide()
      // Scenes.items.part3_table_three.hide()
      // Scenes.items.part3_table_four.hide()
      // Scenes.items.part3_table_four_2.hide()

      // active all sliders
      

      // * showing right tick if done
      // for(let i in rightTicks){
      //   if(Scenes.optionsDone[i] == 1){
      //     rightTicks[i].show()
      //   }
      // }

      // resetSliderValue()
      // ! Final Position
    //  Scenes.items.tableCalc.show()

    // ! onclicks for all options
      let options = [
        Scenes.items.part_2_select_option_1,
        Scenes.items.part_2_select_option_2,
        Scenes.items.part_2_select_option_3,
      ]

      // ! Destroy Graphs
      function destroyGraphs(){
        for(let i=0;i<7;i++){
          if(Scenes.items.chart[i]!=null){
            Scenes.items.chart[i].destroy()
          }
        }
      }
      // destroyGraphs()
      getAll(".graph_box").forEach(gb=>{
        let graph = new Dom(gb)
        graph.hide()
      })
      
      // ! hide all graphs


      
      //! RESET ALL THE SLIDER VALUES
      // sliders.reset()
      Scenes.forMathematicalExpressionBtn = 0
      
      const opOne = ()=>{
        

        Scenes.optionsDone[0]=1;
        Scenes.forMathematicalExpressionBtn = 1
        Scenes.steps[4]()
      }
      const opTwo = ()=>{
       

        Scenes.optionsDone[1]=1;
        Scenes.forMathematicalExpressionBtn = 2
        Scenes.steps[5]()
      }
      const opThree = ()=>{
        

        Scenes.optionsDone[2]=1;
        Scenes.forMathematicalExpressionBtn = 3
        Scenes.steps[6]()
      }
  
      options[0].item.onclick = opOne
      // rightTicks[0].item.onclick = opOne

      options[1].item.onclick =  opTwo
      // rightTicks[1].item.onclick = opTwo

      options[2].item.onclick =  opThree
      // rightTicks[2].item.onclick = opThree

      // ! if all options done then exit
      let exit = true
      for(let i of Scenes.optionsDone){
        if(i==0){
          exit = false
          break
        }
      }      
      
      if(exit){
        // after complete
        // Dom.setBlinkArrow(true, 790, 408).play();
        setCC("Simulation Done");
        setIsProcessRunning(false);
      }else if(Scenes.optionsDone[0]==0){
        // Scenes.setStepHeading("Step-3", "Performance Analysis.");
        setCC("Firstly, observe the six-step VSI performance followed by Sinusoidal PWM inverter.")
      }
      else if(Scenes.optionsDone[0]==1 && Scenes.optionsDone[1]==1){

        setCC("Finally compare the performance of inverter with both PWM techniques.")
      }else if(Scenes.optionsDone[0]==1){
        setCC("Observe the Sinusoidal PWM inverter")
      }
      return true;

    }),

    //! Six-step VSI: 180o Conduction Mode
    (step3 = function () {
      setIsProcessRunning(true);
 
      Scenes.setStepHeading(
        "",
        ""
      )
      Scenes.changeHeader(3, -233,23)
      // setCC("Record 7 reading for different Load Resistances (R0)")
        // ! show the slider
        // sliders.changeHeader(2, "Turns Ratio")
      // Scenes.items.slider_box.set(-27,-93).scale(0.76) 
      Scenes.items.slider_box.set(10,25).scale(1) 
      Scenes.items.btn_next.show()
      sliders.generateOptionsFor(2)


    //* for checking the conclusion text  
      // conclusionFront = "Here, the fundamental component of load voltage increases and total harmonic distortion decreases with increasing modulation index."
      // Scenes.items.tempTitle1.set().setContent(conclusionFront).addClass("conclusion").item
      
      //! Required Items
      // Scenes.items.new_part_3_circuit.set(220,-20,190)
      // Scenes.items.part_3_option_3.set(-30, 155)
       Scenes.items.part3_table_one.set(293,294, null).scale(0.8)
      //  Scenes.items.right_tick_1.set(-5,175)
      Scenes.items.btn_record.set(640+20,-78, 45)
      // Scenes.items.btn_delete.set(740+20,-78, 45)
       Scenes.items.btn_reset.set(840+20,-78, 45)
       Scenes.items.part_2_circuit.set(172,0,245)
      // Scenes.items.part3_table_three.set(20)
       let table = Scenes.items.part3_table_one.item
       let tableRowMax = table.tBodies[0].rows.length
       let tableColumnMax = table.tBodies[0].rows[0].cells.length

       let valuesToMatch = []
        // * index to handle records
      let recordBtnClickIdx = (table.tBodies[0].rows[0].cells[4].innerHTML==""?0:1)


      // ! graph
      // let graph_height = 200
      // let graph_width = 355
      
      let graph_height = 290
      let graph_width = 310
      
      Scenes.items.graph_box_1.set(null, -25, 310, 333)
      Scenes.items.graph1.set(null,null,graph_height,graph_width)
      let ctx = Scenes.items.graph1.item

      // Scenes.items.graph_box_2.set(null, 190, 220)
      // Scenes.items.graph2.set(null,null,graph_height,graph_width)
      Scenes.items.graph_box_2.set(2060, -25, 235, 333)
      Scenes.items.graph2.set(null,null,graph_height,graph_width)
      let ctx2 = Scenes.items.graph2.item

      // ! Label for graph
      let xLabel = Scenes.items.chart.label1.x
      let yLabel = Scenes.items.chart.label1.y
      let dataLabel = "Data"

      let xLabel2 = Scenes.items.chart.label2.x
      let yLabel2 = Scenes.items.chart.label2.y
      let dataLabel2 = "Data2"

      // ! Forshowing graph labels
      // graph idx is for  showing which graph is being shown
      let graphIdx = 0
      if(Scenes.items.chart[graphIdx] != null){
        Scenes.items.xLabel.set().setContent(xLabel)
        Scenes.items.yLabel.set().setContent(yLabel)

        Scenes.items.xLabel2.set().setContent(xLabel2)
        Scenes.items.yLabel2.set().setContent(yLabel2)
      }
      
      // ! To Plot graph
      function plotGraph(
        ctx,
        ctx2,
        graphIdx,
        data,
        data2,
        dataLabel,
        dataLabel2,
        xLabel=null,
        yLabel=null,
        xLabel2=null,
        yLabel2=null,
        beginAtZero=false
      ){
        // for label
        Scenes.items.yLabel.set(530,102).setContent(yLabel).styles({
          backgroundColor: "transperant",
          textAlign: "center",
          color: "black",
          width: "170px", 
          rotate: "-90deg",
        })
        Scenes.items.xLabel.set(732, 257).setContent(xLabel).styles({
          backgroundColor: "transperant",
          color: "black",
          width: "fit-content", 
        })
        // for label2
        Scenes.items.yLabel2.set(190,84).setContent(yLabel2).styles({
          backgroundColor: "transperant",
          textAlign: "center",
          color: "black",
          width: "170px", 
          rotate: "-90deg",
        })
        Scenes.items.xLabel2.set(380,185).setContent(xLabel2).styles({
          backgroundColor: "transperant",
          color: "black",
          width: "fit-content", 
        })

        // ! Destroy old graph
        let graphRef = Scenes.items.chart[graphIdx]
        let graphRef2 = Scenes.items.chart[graphIdx+1]
        if(graphRef!=null){
          graphRef.destroy()
          graphRef2.destroy()
        }
        
        graphRef = new Chart(ctx, {
          type: "scatter",
          plugins: [{
            // afterDraw: chart => {
            //   var ctx = chart.chart.ctx;
            //   ctx.save();
            //   ctx.textAlign = 'center';
            //   ctx.font = '18px Arial';
            //   ctx.fillStyle = 'black';
            //   ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
            //   ctx.textAlign = 'left';
            //   ctx.font = '10px Arial';
            //   ctx.fillText('0', chart.chart.width - 119, chart.chart.height - 12);
            //   ctx.restore();
            // },
            
          }],
          data: {
            labels: [5,7,11,13],
            datasets: [
              {
                label: dataLabel,
                fill: false,
                borderColor: "red",
                backgroundColor: "red",
                data: data,
                display: false,
              },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: yLabel,
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero: beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: xLabel,
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero: false,
                    fontColor: 'black',
                    fontSize: 14,
                    min: 5,
                    max: 13,  
                    stepSize: 2
                  }
                },
              ],
            },
          },
        })
        graphRef2 = new Chart(ctx2, {
          type: "scatter",
          plugins: [{
            // afterDraw: chart => {
            //   var ctx = chart.chart.ctx;
            //   ctx.save();
            //   ctx.textAlign = 'center';
            //   ctx.font = '18px Arial';
            //   ctx.fillStyle = 'black';
            //   ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
            //   ctx.textAlign = 'left';
            //   ctx.font = '10px Arial';
            //   ctx.fillText('0', chart.chart.width - 119, chart.chart.height - 12);
            //   ctx.restore();
            // },
            
          }],
          data: {
            datasets: [
                {
                  label: dataLabel2,
                  fill: false,
                  borderColor: "red",
                  backgroundColor: "red",
                  data: data2,
                  display: false,
                },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: yLabel2,
                    fontColor: 'black',
                    fontSize: 17,
  
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: xLabel2,
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
            },
          },
        })
     
        Scenes.items.chart[graphIdx] = graphRef
        Scenes.items.chart[graphIdx+1] = graphRef2
      }

      // let slidersBox = document.querySelectorAll(".slider")
      // let slidersBox = document.querySelectorAll(".range-slider__range")
      let topMinus = 65
      let leftMinus = 50
      function stepTutorial2(){

        Dom.setBlinkArrowRed(true,100-leftMinus,97,30,30,90).play()
        setCC("Select V<sub>in</sub>")
        
        // sliders.selectOp1.oninput = ()=>{
        //   Dom.setBlinkArrowRed(true,240-leftMinus,78-topMinus,30,30,90).play()
        //   setCC("Select R")
        // }
        sliders.selectOp2.oninput = ()=>{
          Dom.setBlinkArrowRed(true,695, -37,30,30,90).play()
                setCC("Press Record") 
        }
      }
      if(recordBtnClickIdx == 0){
        stepTutorial2()
      }
      // slider aaraha he yaha se
      // generate option
      // sliders.generateOptionsFor(0)
      
      function setDataToGraph(){

        let characteristicsValue = Scenes.items.slider_C.item.value;

          
          let graphData = []
          let graphData2 = []
          var rows = table.tBodies[0].rows
          let n = rows.length
          let m = rows[0].cells.length
          ,xLabel = "Harmonics of<sub>1</sub>"
          ,yLabel = "V<sub>(L-L)h</sub>"
          ,xLabel2 = ""
          ,yLabel2 = "",
          tableModulationIdx = 2,
          tableV01Idx = 5,
          tableThdIdx = 9
          // for(let i=0;i<n;i++){
          //   let x = rows[i].cells[tableModulationIdx].innerHTML
          //   let y = rows[i].cells[tableV01Idx].innerHTML

          //   let x2 = rows[i].cells[tableModulationIdx].innerHTML
          //   let y2 = rows[i].cells[tableThdIdx].innerHTML

          //   graphData.push({x: x,y: y})
          //   graphData2.push({x: x2,y: y2})
          // }

          let xData = [5,7,11,13]
          let colStart = 3
          for(let i=colStart;i<m;i++){
            let x = xData[i-colStart]
            let y = rows[0].cells[i].innerHTML
            graphData.push({x, y})
          }
          console.log(graphData)
          // ! setDefault two values in it
          function setDefaultLowHighInGraph(){
            // D value
            let low = 0.1, high = 0.9, x = 0, y=0, y2=0, 
            rowValues = [],
            colIdx = 2,
            colIdx2 = 6
            
            // for low, 
            x = low
            rowValues = Formulas.multipulse.valueSet(sliders.selectOp2.value, x)
            y = rowValues[colIdx]
            y2 = rowValues[colIdx2]
            graphData.unshift({x: x, y:y})
            graphData2.unshift({x: x, y:y2})

            // for high
            x = high
            rowValues = Formulas.multipulse.valueSet(sliders.selectOp2.value, x)
            y = rowValues[colIdx]
            y2 = rowValues[colIdx2]
            graphData.push({x: x, y:y})
            graphData2.push({x: x, y:y2})

          }
          // setDefaultLowHighInGraph()


          //for labeling
          let conclusionFront = ""

          conclusionFront = "Here, the RMS load voltage and lower order harmonics increases with increasing DC input voltage."

          Scenes.items.tempTitle1.set().setContent(conclusionFront).addClass("conclusion").set(13,260).item

          setCC(conclusionFront).onend = ()=>{
            Dom.setBlinkArrow(true, 790, 408).play()
            setCC("Click 'Next' to go to next step")
          }



          
          Scenes.items.chart.label1.x = xLabel
          Scenes.items.chart.label1.y = yLabel

          Scenes.items.chart.label2.x = xLabel2
          Scenes.items.chart.label2.y = yLabel2

          plotGraph(ctx,ctx2,graphIdx,graphData,graphData2,dataLabel,dataLabel2,xLabel,yLabel,xLabel2,yLabel2,true)
          Scenes.items.graph1.set(null,null,graph_height,graph_width)
          Scenes.items.graph2.set(null,null,graph_height,graph_width)

      }
      // ! ------------> If data already present plot the graph
      if(table.tBodies[0].rows[0].cells[2].innerHTML !== ""){
        setIsProcessRunning(false)
        Scenes.currentStep = 3

        // ! change the table column index who's changing
        let changeableColumnIndx = 2

        recordBtnClickIdx = 7
        let rows = table.tBodies[0].rows
      
        // * to get old values from table for matching
        for(let i=0;i< tableRowMax;i++){
          let val = rows[i].cells[changeableColumnIndx].innerHTML
          valuesToMatch.push(Number(val))
        }
      }else{
        // ! Please note this when plot the graph then show the graph ... 
        plotGraph(ctx,ctx2,graphIdx,[{}],[{}],dataLabel,dataLabel2,xLabel,yLabel,xLabel2,yLabel2,true) 
        Scenes.items.graph1.set(null,null,graph_height,graph_width)
        Scenes.items.graph2.set(null,null,graph_height,graph_width)
        // disableSlider("reset")
      }

      // // ! adding data set
      // graph.addDataset(
      //   "Efficiency",
      //   "red",
      //   []
      // )
       

       //!onclick for delete btn
       Scenes.items.btn_delete.item.onclick =  function(){
        if(recordBtnClickIdx == 0 || recordBtnClickIdx > tableRowMax){
          return
        }
        let row = table.tBodies[0].rows
        
        for(let i=1;i<tableColumnMax;i++){
          row[recordBtnClickIdx-1].cells[i].innerHTML = "" ;
        }
        recordBtnClickIdx = recordBtnClickIdx-1
        if(recordBtnClickIdx==0){
          sliders.enableAll()
          sliders.generateOptionsFor(0)
        }
        valuesToMatch.pop()
      }

      //! onclick for reset 
      Scenes.items.btn_reset.item.onclick = function(){
        var rows = table.tBodies[0].rows
  
        for(let i=0;i<tableRowMax;i++){
          for(let j=1;j<tableColumnMax;j++){
            rows[i].cells[j].innerHTML = "";
          }
        }

        for(let i=0;i<tableRowMax;i++){
          rows[i].cells[0].innerHTML = i+1;
        }

        // reset all the parameters
        // so just simply call this step again
        Scenes.steps[4]()        
        
      }

      // ! onclick for record
      Scenes.items.btn_record.item.onclick = function(){ 

        // taking values from all sliders 
        let vInValue = Number(sliders.selectOp2.value)
        let dutyRatioValue = Number(sliders.slider.value)
        let resistanceValue = Number(sliders.selectOp2.value)



        // * if all values not selected
        if(vInValue=="" ){
          setCC("Select V<sub>in</sub> value first.")
          return
        }

        updateValues(vInValue,dutyRatioValue,resistanceValue)
        
        // ! for arrow system
        // if(recordBtnClickIdx < tableRowMax-1){
        //   Dom.setBlinkArrowRed(true,69,95-topMinus,30,30,90).play()
        //   // Dom.setBlinkArrowRed(true,130-leftMinus,125-topMinus,30,30,90).play()
        //   setCC("Select M.")
        // }
        // else{
        //   Dom.setBlinkArrowRed(-1)
        // }

        // ! Can't select same values
        // if(recordBtnClickIdx < 6 && valuesToMatch.indexOf(dutyRatioValue)!=-1){
        //   setCC("Please select different value.")
        //   return
        // }else{
        //   valuesToMatch.push(dutyRatioValue)
        // }

        // ! sort the data
        if(recordBtnClickIdx>=0){

          function sortTable(){
            var rows = table.tBodies[0].rows

            let sortAccording = 2
            let n=6
            for(let i=0;i<n;i++){
                for(let j=0;j<n-i-1;j++){
                    let val1 = Number(rows[j].cells[sortAccording].innerHTML)
                    let val2 = Number(rows[j+1].cells[sortAccording].innerHTML)
                    if(val1 > val2){
                        let temp = rows[j].innerHTML
                        rows[j].innerHTML = rows[j+1].innerHTML
                        rows[j+1].innerHTML = temp
                    }
                }
            }
            for(let i=0;i<n;i++){
                rows[i].cells[0].innerHTML = i+1
            }
          }
          // sortTable()

          // * plot the graph
          // adding parameter to x,y graph
          // var rows = table.tBodies[0].rows
          // let n = 7
          // for(let i=0;i<n;i++){
          //   graph.addData(0,
          //     {
          //       x: rows[i].cells[9].innerHTML,
          //       y: rows[i].cells[10].innerHTML
          //     }
          //   )
          // }

          // after complete
          // Dom.setBlinkArrow(true, 790, 408).play()
          // setCC("Click 'Next' to go to next step")
          setIsProcessRunning(false)
          Scenes.currentStep = 3
        }


      
        // deactivate the sliders after first value  done
        // todo
        if(recordBtnClickIdx == 0){
          sliders.disable(0,1,2)
        }

        let tableRow = table.tBodies[0].rows[recordBtnClickIdx++]
        tableRow.cells[1].innerHTML = vInValue
        tableRow.cells[2].innerHTML = Number(Formulas.sixStepVSI.vLLrms(values)).toFixed(2)
        tableRow.cells[3].innerHTML = Number(Formulas.sixStepVSI.vABLLharmonics(5)).toFixed(2)
        tableRow.cells[4].innerHTML = Number(Formulas.sixStepVSI.vABLLharmonics(7)).toFixed(2)
        tableRow.cells[5].innerHTML = Number(Formulas.sixStepVSI.vABLLharmonics(11)).toFixed(2)
        tableRow.cells[6].innerHTML = Number(Formulas.sixStepVSI.vABLLharmonics(13)).toFixed(2)
        setDataToGraph()
        
        Dom.setBlinkArrowRed(-1)
      }    
       
      

      
      return true
    }),

    //! Sinusoidal PWM Scheme
    (step4 = function () {
      setIsProcessRunning(true);
 
      Scenes.setStepHeading(
        "",
        ""
      )
      Scenes.changeHeader(4, -296, 25)
      // setCC("Record 7 reading for different Load Resistances (R0)")
        // ! show the slider
        // sliders.changeHeader(2, "Turns Ratio")
      // Scenes.items.slider_box.set(-27,-93).scale(0.76)

      Scenes.items.slider_box.set(10,0).scale(1) 
      Scenes.items.btn_next.show()
      sliders.generateOptionsFor(3)


      //! Required Items
      // Scenes.items.part_2_2_heading.set(165,-83, 65)
      // Scenes.items.new_part_3_circuit.set(220,-20,190)
      // Scenes.items.part_3_option_3.set(-30, 155)

       Scenes.items.part3_table_two.set(25,196, null).scale(0.8)
      //  Scenes.items.right_tick_1.set(-5,175)
      Scenes.items.btn_record.set(640+20,-78, 45)
      Scenes.items.btn_delete.set(740+20,-78, 45)
       Scenes.items.btn_reset.set(840+20,-78, 45)
      // Scenes.items.part3_table_three.set(20)
       let table = Scenes.items.part3_table_two.item
       let tableColumnMax = table.tBodies[0].rows[0].cells.length
       let tableRowMax = table.tBodies[0].rows.length

       let valuesToMatch = []
        // * index to handle records
      let recordBtnClickIdx = (table.tBodies[0].rows[4].cells[4].innerHTML==""?0:5)


      // ! graph
      // let graph_height = 200
      // let graph_width = 355
      
      let graph_height = 220
      let graph_width = 400
      
      // Scenes.items.graph_box_1.set(null, 0, 210)

      Scenes.items.graph_box_3.set(522, -25, 235, 415)
      Scenes.items.graph3.set(null,null,graph_height,graph_width)
      let ctx = Scenes.items.graph3.item

      // Scenes.items.graph_box_2.set(null, 190, 220)
      // Scenes.items.graph2.set(null,null,graph_height,graph_width)

      // Scenes.items.graph_box_2.set(180, 0, 210)

      Scenes.items.graph_box_4.set(1000, -25, 235, 333)

      Scenes.items.graph4.set(null,null,graph_height,graph_width)
      let ctx2 = Scenes.items.graph4.item

      // ! Label for graph
      let xLabel = Scenes.items.chart.label3.x
      let yLabel = Scenes.items.chart.label3.y
      let dataLabel = "Data"

      let xLabel2 = Scenes.items.chart.label4.x
      let yLabel2 = Scenes.items.chart.label4.y
      let dataLabel2 = "Data2"

      
      // ! Forshowing graph labels
      // graph idx is for  showing which graph is being shown
      let graphIdx = 1
      if(Scenes.items.chart[graphIdx] != null){
        Scenes.items.xLabel.set().setContent(xLabel)
        Scenes.items.yLabel.set().setContent(yLabel)
        
        Scenes.items.xLabel2.set().setContent(xLabel2)
        Scenes.items.yLabel2.set().setContent(yLabel2)
      }
      
      let graphRef = Scenes.items.chart[graphIdx]
      let graphRef2 = Scenes.items.chart[graphIdx+1]

      // ! To Plot graph
      function plotGraph(
        ctx,
        ctx2,
        graphIdx,
        data,
        data2,
        dataLabel,
        dataLabel2,
        xLabel=null,
        yLabel=null,
        xLabel2=null,
        yLabel2=null,
        beginAtZero=false
      ){
        // for label
        Scenes.items.yLabel.set(451,84).setContent(yLabel).styles({
          backgroundColor: "transperant",
          textAlign: "center",
          color: "black",
          width: "170px", 
          rotate: "-90deg",
        })
        Scenes.items.xLabel.set(708, 182).setContent(xLabel).styles({
          backgroundColor: "transperant",
          color: "black",
          width: "fit-content", 
        })
        // for label2
        Scenes.items.yLabel2.set(1190,84).setContent(yLabel2).styles({
          backgroundColor: "transperant",
          textAlign: "center",
          color: "black",
          width: "170px", 
          rotate: "-90deg",
        })
        Scenes.items.xLabel2.set(1380,185).setContent(xLabel2).styles({
          backgroundColor: "transperant",
          color: "black",
          width: "fit-content", 
        })

        // ! Destroy old graph
        graphRef = Scenes.items.chart[graphIdx]
        graphRef2 = Scenes.items.chart[graphIdx+1]
        if(graphRef!=null){
          graphRef.destroy()
          // graphRef2.destroy()
        }
        let dataLabels = ["1st","13th","17th","29th","31st"]
        let dataColors = ["57a639","633a34","e63244","1f3a3d","999950"]
        let datasets = dataLabels.map((label,idx)=>{
          let color = '#' + dataColors[idx]
          return {
            label: label,
            fill: false,
            borderColor: color,
            backgroundColor: color,
            data: data,
            display: false,
          }
        })
        graphRef = new Chart(ctx, {
          type: "scatter",
          data: {
            labels: [0.2,0.4,0.6,0.8,1],
            datasets: datasets
          },
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: yLabel,
                    fontColor: 'black',
                    fontSize: 17,
  
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  } 
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: xLabel,
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero: beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                    stepSize: 0.2,
                  }
                },
              ],
            },
          },
        })
        graphRef2 = new Chart(ctx2, {
          type: "scatter",
          plugins: [{
            // afterDraw: chart => {
            //   var ctx = chart.chart.ctx;
            //   ctx.save();
            //   ctx.textAlign = 'center';
            //   ctx.font = '18px Arial';
            //   ctx.fillStyle = 'black';
            //   ctx.fillText('Output Power (P )', chart.chart.width / 2, chart.chart.height - 24);
            //   ctx.textAlign = 'left';
            //   ctx.font = '10px Arial';
            //   ctx.fillText('0', chart.chart.width - 119, chart.chart.height - 12);
            //   ctx.restore();
            // },
            
          }],
          data: {
            datasets: [
                {
                  label: dataLabel2,
                  fill: false,
                  borderColor: "red",
                  backgroundColor: "red",
                  data: data2,
                  display: false,
                },
            ],
          },
          options: {
            scales: {
              yAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: yLabel2,
                    fontColor: 'black',
                    fontSize: 17,
  
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: xLabel2,
                    fontColor: 'black',
                    fontSize: 17,
                  },
                  ticks: { 
                    beginAtZero:beginAtZero,
                    fontColor: 'black',
                    fontSize: 14,
                  }
                },
              ],
            },
          },
        })
     
        Scenes.items.chart[graphIdx] = graphRef
        Scenes.items.chart[graphIdx+1] = graphRef2
      }

      // let slidersBox = document.querySelectorAll(".slider")
      // let slidersBox = document.querySelectorAll(".range-slider__range")
      let topMinus = 65
      let leftMinus = 50
      function stepTutorial2(){

        Dom.setBlinkArrowRed(true,100-leftMinus,68,30,30,90).play()
        setCC("Select V<sub>in</sub>")
        
        // sliders.selectOp1.oninput = ()=>{
        //   Dom.setBlinkArrowRed(true,240-leftMinus,78-topMinus,30,30,90).play()
        //   setCC("Select R")
        // }
        sliders.selectOp2.oninput = ()=>{
          Dom.setBlinkArrowRed(true,69,175,30,30,90).play()
          setCC("Select m<sub>A</sub>")
        }
        // sliders.selectOp3.oninput = ()=>{
        //       Dom.setBlinkArrowRed(true,380-leftMinus,78-topMinus,30,30,90).play()
        //       setCC("Select M")
        //     }
        sliders.slider.onclick = ()=>{
          Dom.setBlinkArrowRed(true,695, -37,30,30,90).play()
          setCC("Press Record")                
        }
      }
      if(recordBtnClickIdx == 0){
        stepTutorial2()
      }
      //slider aaraha he yaha se 
      // generate option
      // sliders.generateOptionsFor(0)

      const graph = {
        addDataset(chart,label,bgColor,data){
          chart.data.datasets.push(
            {
              label: label,
              fill: true,
              borderColor: bgColor,
              backgroundColor: bgColor,
              data: data,
            }
          )
          chart.update()
        },
        addData(chart,index,data){
          if(data.length > 0){
            chart.data.datasets[index].data = data
          }else{
            chart.data.datasets[index].data.push(data)
          }
          chart.update()
        }
      }

      function setDataToGraph(){

        let characteristicsValue = Scenes.items.slider_C.item.value;

          // ! graphDatas is for storing 2d data for every harmonic values
          let graphDatas = []
          let graphData = []
          let graphData2 = []
          var rows = table.tBodies[0].rows
          let n = rows.length
          let m = rows[0].cells.length
          ,xLabel = "m<sub>A</sub>"
          ,yLabel = "Harmonics of<sub>1</sub>"
          ,xLabel2 = "Modulation Index (M)"
          ,yLabel2 = "THD(%)",
          tableModulationIdx = 2,
          tableV01Idx = 5,
          tableThdIdx = 9
          let xData = [0.2,0.4,0.6,0.8,1]
          let colStart = 4
          for(let i=colStart;i<m;i++){
            graphData = []
            for(let j=0;j<n;j++){
              let x = xData[j]
              let y = rows[j].cells[i].innerHTML
              graphData.push({x, y})
            }
            graphDatas.push(graphData)
          }
          // ! setDefault two values in it
          function setDefaultLowHighInGraph(){
            // D value
            let low = 0.1, high = 0.9, x = 0, y=0, y2=0, 
            rowValues = [],
            colIdx = 2,
            colIdx2 = 6
            
            // for low, 
            x = low
            rowValues = Formulas.sinusoidal.valueSet(sliders.selectOp2.value, x)
            y = rowValues[colIdx]
            y2 = rowValues[colIdx2]
            graphData.unshift({x: x, y:y})
            graphData2.unshift({x: x, y:y2})

            // for high
            x = high
            rowValues = Formulas.sinusoidal.valueSet(sliders.selectOp2.value, x)
            y = rowValues[colIdx]
            y2 = rowValues[colIdx2]
            graphData.push({x: x, y:y})
            graphData2.push({x: x, y:y2})

          }
          // setDefaultLowHighInGraph()

          //for labeling
          let conclusionFront = 'Here, the RMS load voltage and magnitude of harmonic component increases with increasing modulation index'

          Scenes.items.tempTitle1.set().setContent(conclusionFront).addClass("conclusion").set(220,-10).item
          setCC(conclusionFront)
          
          Scenes.items.chart.label3.x = xLabel
          Scenes.items.chart.label3.y = yLabel

          Scenes.items.chart.label4.x = xLabel2
          Scenes.items.chart.label4.y = yLabel2

          plotGraph(ctx,ctx2,graphIdx,graphData,graphData2,dataLabel,dataLabel2,xLabel,yLabel,xLabel2,yLabel2,false)
          Scenes.items.graph3.set(null,null,graph_height,graph_width)
          Scenes.items.graph4.set(null,null,graph_height,graph_width)

          graphDatas.forEach((data,idx)=>{
            graph.addData(graphRef,idx,data)
          })

      }
      
      // ! ------------> If data already present plot the graph
      if(table.tBodies[0].rows[4].cells[2].innerHTML !== ""){
        setIsProcessRunning(false)
        Scenes.currentStep = 3

        // ! change the table column index who's changing
        let changeableColumnIndx = 2

        recordBtnClickIdx = 7
        let rows = table.tBodies[0].rows
      
        // * to get old values from table for matching
        for(let i=0;i<tableRowMax;i++){
          let val = rows[i].cells[changeableColumnIndx].innerHTML
          valuesToMatch.push(Number(val))
        }
      }else{
        // ! Please note this when plot the graph then show the graph ... 
        plotGraph(ctx,ctx2,graphIdx,[{}],[{}],dataLabel,dataLabel2,xLabel,yLabel,xLabel2,yLabel2,true) 
        Scenes.items.graph3.set(null,null,graph_height,graph_width)
        Scenes.items.graph4.set(null,null,graph_height,graph_width)

        // disableSlider("reset")
      }

      // // ! adding data set
      // graph.addDataset(
      //   "Efficiency",
      //   "red",
      //   []
      // )
       

       //!onclick for delete btn
       Scenes.items.btn_delete.item.onclick =  function(){
        if(recordBtnClickIdx == 0 || recordBtnClickIdx > tableRowMax){
          return
        }
        let row = table.tBodies[0].rows
        
        for(let i=1;i<tableColumnMax;i++){
          row[recordBtnClickIdx-1].cells[i].innerHTML = "" ;
        }
        recordBtnClickIdx = recordBtnClickIdx-1
        if(recordBtnClickIdx==0){
          sliders.enableAll()
          sliders.generateOptionsFor(0)
        }
        valuesToMatch.pop()
      }

      //! onclick for reset 
      Scenes.items.btn_reset.item.onclick = function(){
        var rows = table.tBodies[0].rows
  
        for(let i=0;i<tableRowMax;i++){
          for(let j=1;j<tableColumnMax;j++){
            rows[i].cells[j].innerHTML = "";
          }
        }

        for(let i=0;i<tableRowMax;i++){
          rows[i].cells[0].innerHTML = i+1;
        }

        // reset all the parameters
        // so just simply call this step again
        Scenes.steps[5]()        
        
      }

      // ! onclick for record
      Scenes.items.btn_record.item.onclick = function(){ 

        // taking values from all sliders 
        let vInValue = Number(sliders.selectOp2.value)
        let dutyRatioValue = Number(sliders.slider.value)
        let resistanceValue = Number(sliders.selectOp2.value)



        // * if all values not selected
        if(vInValue=="" ){
          setCC("Select V<sub>in</sub> value first.")
          return
        }

        updateValues(vInValue,dutyRatioValue,resistanceValue)
        
        // ! for arrow system
        if(recordBtnClickIdx < tableRowMax-1){
          Dom.setBlinkArrowRed(true,69,175,30,30,90).play()
          // Dom.setBlinkArrowRed(true,130-leftMinus,125-topMinus,30,30,90).play()
          setCC("Select m<sub>A</sub>")
        }
        else{
          Dom.setBlinkArrowRed(-1)
        }

        // ! Can't select same values
        if(recordBtnClickIdx < tableRowMax && valuesToMatch.indexOf(dutyRatioValue)!=-1){
          setCC("Please select different value.")
          return
        }else{
          valuesToMatch.push(dutyRatioValue)
        }

        // ! sort the data
        if(recordBtnClickIdx>=5){

          function sortTable(){
            var rows = table.tBodies[0].rows

            let sortAccording = 2
            let n=tableRowMax
            for(let i=0;i<n;i++){
                for(let j=0;j<n-i-1;j++){
                    let val1 = Number(rows[j].cells[sortAccording].innerHTML)
                    let val2 = Number(rows[j+1].cells[sortAccording].innerHTML)
                    if(val1 > val2){
                        let temp = rows[j].innerHTML
                        rows[j].innerHTML = rows[j+1].innerHTML
                        rows[j+1].innerHTML = temp
                    }
                }
            }
            for(let i=0;i<n;i++){
                rows[i].cells[0].innerHTML = i+1
            }
          }
          sortTable()

          // * plot the graph
          // adding parameter to x,y graph
          // var rows = table.tBodies[0].rows
          // let n = 7
          // for(let i=0;i<n;i++){
          //   graph.addData(0,
          //     {
          //       x: rows[i].cells[9].innerHTML,
          //       y: rows[i].cells[10].innerHTML
          //     }
          //   )
          // }
          setDataToGraph()

          // after complete
          Dom.setBlinkArrow(true, 790, 408).play()
          setCC("Click 'Next' to go to next step")
          setIsProcessRunning(false)
          Scenes.currentStep = 3
        }


      
        // deactivate the sliders after first value  done
        // todo
        if(recordBtnClickIdx == 0){
          sliders.disable(0,1,2)
        }

        let ansArr = Formulas.sinusoidal.valueSet(vInValue, dutyRatioValue)

        console.log(ansArr)
        let mA = dutyRatioValue
        let tableRow = table.tBodies[0].rows[recordBtnClickIdx++]
        tableRow.cells[1].innerHTML = vInValue
        tableRow.cells[2].innerHTML = mA  
        tableRow.cells[3].innerHTML = Number(Formulas.intverterSinusoidal.vLLrms(values)).toFixed(2)
        tableRow.cells[4].innerHTML = Number(Formulas.intverterSinusoidal.mAvalues(mA,1)).toFixed(2)
        tableRow.cells[5].innerHTML = Number(Formulas.intverterSinusoidal.mAvalues(mA,13)).toFixed(2)
        tableRow.cells[6].innerHTML = Number(Formulas.intverterSinusoidal.mAvalues(mA,17)).toFixed(2)
        tableRow.cells[7].innerHTML = Number(Formulas.intverterSinusoidal.mAvalues(mA,29)).toFixed(2)
        tableRow.cells[8].innerHTML = Number(Formulas.intverterSinusoidal.mAvalues(mA,31)).toFixed(2)

        // setDataToGraph()
        
        // warning for sorting the data
        if(recordBtnClickIdx==5){
          setCC("Press Record")
          Dom.setBlinkArrowRed(true,740-leftMinus,30-topMinus,30,30,90).play()
        }
      }    
       
      

      
      return true   
    }),

    //! Comparison of Six-step VSI and Sine PWM Inverter
    (step5 = function () {
      setIsProcessRunning(true);
      
      Scenes.setStepHeading(
        "",
        ""
      )
      // componenet stress

      Scenes.changeHeader(5, -236, 17)
        // ! show the slider
      Scenes.items.slider_box.set(7,-55).scale(0.95)
      Scenes.items.btn_next.show()

      //! Required Items
      Scenes.items.btn_record.set(388,-75, 40)
      // Scenes.items.btn_delete.set(340,-40)
      Scenes.items.btn_reset.set(762,-75, 40)
      // ! graph
    
      sliders.generateOptionsFor(2)
      Scenes.items.part_2_circuit.set(0,202, 210)
      Scenes.items.graph_legends_2.set(312,174,100) 
      //  Scenes.items.part4_table_graph.set(0,160,250,555)
      //  Scenes.items.new_part_3_4_circuit.set(0,220,190,290)
      //  Scenes.items.new_part_3_4_ratings.set(290,210,250,280)
       //graph labels
      //  let st_label = {
      //   backgroundColor: "white",
      //   color: "black",
      //   fontSize: "20px",
      //   width: "300px",
      //   textAlign: "center",
      //   margin: "0",
        
      //  }
       
      //  let l2 = "<span>i<sub>s</sub></span> <span>i<sub>d</sub></span> <span>i<sub>c</sub></span>"
      //  let l1 = "<span>v<sub>s</sub></span> <span>v<sub>d</sub></span> <span>v<sub>c</sub></span>"
      //  Scenes.items.tempTitle51.set(620,118).setContent(l1).styles(st_label).addClass("graph_labels")
      //  Scenes.items.tempTitle52.set(620,364).setContent(l2).styles(st_label).addClass("graph_labels")

       // temp label for the table
      //  let st = {
      //   width: "fit-content"
      //  }
      //  let st3 = {
      //   ...st,
      //   fontSize: "15px"
      //  }
      //  let leftMinus = 44, topMinus = 25
      //  let format_1 = "(V<sub>in</sub>+V<sub>o</sub>/n) V/I<sub>in</sub> A"
      //  let format_2 = "(nV<sub>in</sub>+V<sub>o</sub>) V/I<sub>L,p</sub>/n A"
      //  let format_3 = "V<sub>o</sub> V/ (∆I<sub>Lm</sub>/2)/n A"
      //  Scenes.items.tempTitle53.set(443-leftMinus,253-topMinus+50).setContent(format_1).styles(st)
      //  Scenes.items.tempTitle54.set(443-leftMinus,300-topMinus+50).setContent(format_2).styles(st)
      //  Scenes.items.tempTitle55.set(443-leftMinus,355-topMinus+50).setContent(format_3).styles(st3)
      let graphIdx = 6
      let graph_box7 = new Dom(".graph_box7")
      let graph_box8 = new Dom(".graph_box8")
      let graph_box9 = new Dom(".graph_box9")

     let graphBoxes = [
       graph_box7,
       graph_box8,
       graph_box9,
     ]
     graphBoxes.forEach((ele,idx)=>{
       ele.styles({
         padding: "0",
       })
       if(idx>0){
         ele.styles({
           boxShadow: "none",   
           padding: "17px 0 0 0",
         })
       }
       if(idx==1){
         ele.item.style.borderTopRightRadius= "0px"
         ele.item.style.borderBottomRightRadius= "0px"
       }else if(idx == 2){
         ele.item.style.borderTopLeftRadius = "0px"
         ele.item.style.borderBottomLeftRadius = "0px"
         console.log(ele.item)
       }
     })
     Scenes.items.graph7.set(null,null,250,100)
     Scenes.items.graph8.set(null,200,250,100)
     Scenes.items.graph9.set(null,200,250,100)
     graph_box7.set(null,null,null,340)
     graph_box8.set(437,171,null,250)
     graph_box9.set(null,171,null,250)
     let ctx1 = Scenes.items.graph7.item
     let ctx2 = Scenes.items.graph8.item
     let ctx3 = Scenes.items.graph9.item
     let chart1 = Scenes.items.chart[graphIdx]
     let chart2 = Scenes.items.chart[graphIdx+1]
     let chart3 = Scenes.items.chart[graphIdx+2]
     
     let xLabel = ""
     let yLabel = ""

     // dual merge graph text title and legend
     Scenes.items.tempTitle22.setContent("Harmonic Component").set(0,0).styles({
       backgroundColor: "white",
       left: "460px",
       top: "173px",
       display: "block",
       color: "black",
       width: "469px",
       textAlign: "center",
       height: "46px",
       zIndex: "1001",
     })
    //  Scenes.items.graph_legends.set().styles({
    //    left: "503px",
    //    top: "196px",
    //    zIndex: "1002",
    //    height: "21px",
    //  })


     function plotGraph(){
       if(chart1!=null){
         chart1.destroy()
         chart2.destroy()
         chart3.destroy()
       }
       
       chart1 = new Chart(ctx1,
         {
           type: "bar",
           data: {
             labels: ["Six-step VSI", "Sinusoidal PWM"],
             datasets: [
               {
                 backgroundColor: ['#395723','#7030a0'],
                 label: "Vo1,rms",
                 data: [],
               },
             ]
           },
           options: {
             maintainAspectRatio: false,
             responsive: true,
             legend: {
               display: false
             },
             title:{
               display: true,
               text: "Vo1,rms (fundamental)",
               fontColor: 'black',
               fontSize: 15,
             },
             scales: {
               yAxes: [
                 {
                   ticks: { 
                     beginAtZero:true,
                     fontColor: 'black',
                     fontSize: 15,
                   }
                 },
               ],
               xAxes: [
                 {
                   scaleLabel: {
                     display: true,
                   },
                   ticks: { 
                     beginAtZero:true,
                     fontColor: 'black',
                     fontSize: 13,
                   },
                   barThickness: 30
                 },
               ],
             },  
           },
         }
       )
       chart2 = new Chart(ctx2,
         {
           type: "bar",
           data: {
             labels: ["Six-step VSI"],
             datasets: [
               {
                 label: "Vo5",
                 backgroundColor: "#002060",
                 data: [],
               },
               {
                 label: "Vo7",
                 backgroundColor: "#c00000",
                 data: [],
               },
               {
                 label: "Vo11",
                 backgroundColor: "#385723",
                 data: [],
               },
               {
                 label: "Vo13",
                 backgroundColor: "#c55a11",
                 data: [],
               },
             ]
           },
           options: {
             maintainAspectRatio: false,
             responsive: true,
             legend: {
               display: false
             },
             title:{
               display: true,
               text: "Harmonic Component & THD",
               fontColor: 'black',
               fontSize: 15,
             },
             scales: {
               yAxes: [
                 {
                   ticks: { 
                     beginAtZero:true,
                     fontColor: 'black',
                     fontSize: 15,
                   }
                 },
               ],
               xAxes: [
                 {
                   scaleLabel: {
                     display: true,
                   },
                   ticks: { 
                     beginAtZero:true,
                     fontColor: 'black',
                     fontSize: 13,
                   },
                 },
               ],
             },
             barPercentage: 1, // Controls the width of the bars relative to the available space
             categoryPercentage: 0.5,
           },
         }  
       )
       chart3 = new Chart(ctx3,
         {
           type: "bar",
           data: {
             labels: ["Sinusoidal PWM"],
             datasets: [
               {
                 label: "Vo13",
                 backgroundColor: "#002060",
                 data: [],
               },
               {
                 label: "Vo15",
                 backgroundColor: "#c00000",
                 data: [],
               },
               {
                 label: "Vo29",
                 backgroundColor: "#385723",
                 data: [],
               },
               {
                 label: "Vo31",
                 backgroundColor: "#c55a11",
                 data: [],
               },
             ]
           },
           options: {
             maintainAspectRatio: false,
             responsive: true,
             legend: {
               display: false
             },
             title:{
               display: true,
               text: "Harmonic Component & THD",
               fontColor: 'black',
               fontSize: 15,
             },
             scales: {
               yAxes: [
                 {
                   ticks: { 
                     beginAtZero:true,
                     fontColor: 'black',
                     fontSize: 15,
                   }
                 },
               ],
               xAxes: [
                 {
                   scaleLabel: {
                     display: true,
                   },
                   ticks: { 
                     beginAtZero:true,
                     fontColor: 'black',
                     fontSize: 13,
                   },
                 },
               ],
             },
             barPercentage: 1, // Controls the width of the bars relative to the available space
             categoryPercentage: 0.5,
           },
         }  
       )
       Scenes.items.chart[graphIdx] = chart1
       Scenes.items.chart[graphIdx+1] = chart2
       Scenes.items.chart[graphIdx+2] = chart3
       
     }

      function stepTutorial2(){

        let leftMinus = 30

        Dom.setBlinkArrowRed(true,100-leftMinus,12,30,30,90).play() 
        setCC("Select V<sub>in</sub>")
        
        sliders.selectOp1.oninput = ()=>{
          Dom.setBlinkArrowRed(true,260-leftMinus,12,30,30,90).play()
          setCC("Select M")
        }
        sliders.selectOp2.oninput = ()=>{
          Dom.setBlinkArrowRed(true,430-10,-35,30,30,90).play()
          setCC("Press Record")
        }
            
      }
      if(chart1 == null){
        stepTutorial2()
      }

      const graph = {
        addDataset(chart,label,bgColor,data){
          chart.data.datasets.push(
            {
              label: label,
              fill: true,
              borderColor: bgColor,
              data: data,
            }
          )
          chart.update()
        },
        addData(chart,index,data){
          if(data.length > 0){
            chart.data.datasets[index].data = data
          }else{
            chart.data.datasets[index].data.push(data)
          }
          chart.update()
        }
      }

      // ! ------------> If data already present plot the graph
      if(chart1 != null){
        setIsProcessRunning(false)
        Scenes.currentStep = 5
        Scenes.items.graph7.set(null,null,250,355)
        Scenes.items.graph8.set(null,200,250,270)
        Scenes.items.graph9.set(null,200,250,270)
      }else{
        plotGraph()
        Scenes.items.graph7.set(null,null,250,355)
        Scenes.items.graph8.set(null,200,250,270)
        Scenes.items.graph9.set(null,200,250,270)
      }   


      // ! onclick for reset
      Scenes.items.btn_reset.item.onclick = function(){
        // reset all the parameters
        // so just simply call this step again
        Scenes.items.chart[graphIdx] = null
        Scenes.items.chart[graphIdx+1] = null
        Scenes.items.chart[graphIdx+2] = null
        
        Scenes.steps[6]()        
      }
       
       // ! onclick for record
       Scenes.items.btn_record.item.onclick = function(){

         // taking values from all sliders 
        let vInValue = Number(sliders.selectOp2.value)
        let dutyRatioValue = Number(sliders.selectOp2.value)
        let resistanceValue = Number(sliders.slider.value)
        let nValue = Number(sliders.selectOp3.value)

        // * if all values not selected
        if(vInValue==""){
          setCC("Select V<sub>in</sub> values first.")
          return
        }

        Dom.setBlinkArrowRed(-1)
        updateValues(vInValue,dutyRatioValue,resistanceValue)

        // Scenes.items.tempTitle53.setContent(`${vS} V/${iS} A`)
        // Scenes.items.tempTitle54.setContent(`${vD} V/${iD} A`)
        // Scenes.items.tempTitle55.setContent(`${vC} V/${iC} A`)
        console.log(vInValue, dutyRatioValue)

        let val1 = Formulas.sixStepVSI.vABLLharmonics(1)
        let val2 = Formulas.intverterSinusoidal.mAvalues(1,1)
        // ! add values to graph
        // let graph1_data = [vS,vD,vC]
        let graph1_data = [val1, val2]

        // let graph2_data = [iS,iD,iC]
        let six_step_v05_data = Formulas.sixStepVSI.vABLLharmonics(5)
        let six_step_v07_data = Formulas.sixStepVSI.vABLLharmonics(7)
        let six_step_v011_data = Formulas.sixStepVSI.vABLLharmonics(11)
        let six_step_v013_data = Formulas.sixStepVSI.vABLLharmonics(13)

        let inverter_v013_data = Formulas.intverterSinusoidal.mAvalues(1,13)
        let inverter_v017_data = Formulas.intverterSinusoidal.mAvalues(1,17)
        let inverter_v029_data = Formulas.intverterSinusoidal.mAvalues(1,29)
        let inverter_v031_data = Formulas.intverterSinusoidal.mAvalues(1,31)
        
        plotGraph()
        graph.addData(chart1,0,graph1_data)
        
        graph.addData(chart2,0,six_step_v05_data)
        graph.addData(chart2,1,six_step_v07_data)
        graph.addData(chart2,2,six_step_v011_data)
        graph.addData(chart2,3,six_step_v013_data)

        graph.addData(chart3,0,inverter_v013_data)
        graph.addData(chart3,1,inverter_v017_data)
        graph.addData(chart3,2,inverter_v029_data)
        graph.addData(chart3,3,inverter_v031_data)
          // after complete
          Dom.setBlinkArrow(true, 790, 408).play();
          // setCC("Click 'Next' to go to next step");
          // setCC("Bar chart shows the switch, diode and capacitor voltage stresses.")

          setCC("Here, inverter load voltages are generated using Multi-pulse and Sinusoidal PWM schemes.")

          setCC("Sine PWM  based waveforms results in reduced lower order harmonics and thus reduces the filtering requirements.")

          let conclusionFront = 
          `<ul style="margin:0; text-align: left;">
              <li>The RMS of fundamental voltage is higher for 180° conduction mode than sinusoidal PWM scheme.</li>
              <li>The magnitude of lower-order harmonics is much higher in 180° conduction mode than sinusoidal PWM.</li>
              <li>Due to low harmonic content, the sinusoidal PWM Inverter is preferred option as it needs less filtering requirement.</li>
            </ul>`

          // ! For front conclusion
          // Anime.fade(
          //   Scenes.items.tempTitle20.set().setContent(conclusionFront).addClass("conclusion").zIndex(3).item
          // )
          Scenes.items.tempTitle20.set(25,20,null,512).setContent(conclusionFront).addClass("conclusion").zIndex(3).item
          
          setIsProcessRunning(false); 
          Scenes.currentStep = 3

          // ! fix resistance value to its original
          // resistanceSlider.min = 10
          // resistanceSlider.max = 500
          // resistanceSlider.step = 1        
          // resistanceSlider.value = 10
          // resistanceSlider.oninput = ()=>{}
       }    
      

      
      return true
    }),


      //! slider working
    // (step6 = function () {
    //   setIsProcessRunning(true);
    //   Scenes.items.btn_next.show()
      
    //   // todo all previous elements hide
    //   Dom.hideAll();
    //   Scenes.items.contentAdderBox.item.innerHTML = ""

    //   // Scenes.setStepHeading("Step-3", "Performance Analysis.");
    //   setCC("Click on the 'ICON' to plot the performance characteristics.")
      
    //   // * remove all previous restrictions
      
    //   // ! Required Elements

    //   // Scenes.items.part_2_select_option.set(-29, -73, 485)
    //   // Scenes.items.part_2_option_1.set(41, 18, 305).zIndex(4)
    //   // Scenes.items.part_2_option_2.set(41 + 307, 16, 307).zIndex(3)
    //   // Scenes.items.part_2_option_3.set(610, 27, 289).zIndex(2)

    //   // // hide the slider
    //   // Scenes.items.slider_box.hide()

 

    //   // hide all tables
    //   // Scenes.items.part3_table_one.hide()
    //   // Scenes.items.part3_table_two.hide()
    //   Scenes.items.part3_table_three.hide()
    //   // Scenes.items.part3_table_four.hide()
    //   // Scenes.items.part3_table_four_2.hide()

    //   // active all sliders
      

    //   // * showing right tick if done
    //   // for(let i in rightTicks){
    //   //   if(Scenes.optionsDone[i] == 1){
    //   //     rightTicks[i].show()
    //   //   }
    //   // }

    //   // resetSliderValue()
    //   // ! Final Position
    // //  Scenes.items.tableCalc.show()

    // // ! onclicks for all options
    //   let options = [
    //     Scenes.items.part_2_option_1,
    //     Scenes.items.part_2_option_2,
    //     Scenes.items.part_2_option_3,
    //   ]

    //   // ! Destroy Graphs
    //   function destroyGraphs(){
    //     for(let i=0;i<7;i++){
    //       if(Scenes.items.chart[i]!=null){
    //         Scenes.items.chart[i].destroy()
    //       }
    //     }
    //   }
    //   // destroyGraphs()

      
    //   //! RESET ALL THE SLIDER VALUES
    //   // sliders.reset()
    //   Scenes.forMathematicalExpressionBtn = 0
      
    //   const opOne = ()=>{
        

    //     Scenes.optionsDone[0]=1;
    //     Scenes.forMathematicalExpressionBtn = 1
    //     Scenes.steps[4]()
    //   }
    //   const opTwo = ()=>{
       

    //     Scenes.optionsDone[1]=1;
    //     Scenes.forMathematicalExpressionBtn = 2
    //     Scenes.steps[5]()
    //   }
    //   const opThree = ()=>{
        

    //     Scenes.optionsDone[2]=1;
    //     Scenes.forMathematicalExpressionBtn = 3
    //     Scenes.steps[6]()
    //   }
  
    //   options[0].item.onclick = opOne
    //   // rightTicks[0].item.onclick = opOne

    //   options[1].item.onclick =  opTwo
    //   // rightTicks[1].item.onclick = opTwo

    //   options[2].item.onclick =  opThree
    //   // rightTicks[2].item.onclick = opThree

    //   // ! if all options done then exit
    //   let exit = true
    //   for(let i of Scenes.optionsDone){
    //     if(i==0){
    //       exit = false
    //       break
    //     }
    //   }      

    //   if(exit){
    //     // after complete
    //     // Dom.setBlinkArrow(true, 790, 408).play();
    //     setCC("Simulation Done");
    //     setIsProcessRunning(false);
    //   }

    //   return true;

    // }),
  
 
  ],
  back() {
    //! animation isRunning
    // if (isRunning) {
    //   return;
    // }
    if (this.currentStep > 1) {
      Scenes.items.btn_next.setContent("Next");
      Scenes.items.btn_next.item.onclick = ()=>{}
      this.currentStep -= 2;
      this.steps[this.currentStep]()
      this.currentStep++
      backDrawerItem()
      backProgressBar()
    }
  },
  next() {
    //! animation isRunning
    if (isRunning) {
      return
    }
    if (this.currentStep < this.steps.length) {
      if (this.steps[this.currentStep]()) {
        nextDrawerItem();
        nextProgressBar();
        this.currentStep++;
      }         
    } else {
      
    }
  },
}

// * slider
// var rangeSlider = function () {
//   var slider = $(".range-slider"),
//     range = $(".range-slider__range"),
//     value = $(".range-slider__value");

//   slider.each(function () {
//     value.each(function () {
//       var value = $(this).prev().attr("value");
//       $(this).html(value);
//     });

//     range.on("input", function () {
//       $(this).next(value).html(this.value);
//       $(this).next(value).val(this.value);
//     });
//   });63
// };
// $(".resistance-input").on("keyup", () => {
//   let slider = $(".slider_R .range-slider__range");
//   let input = document.querySelector(".resistance-input");

//   let min = 1;
//   let max = Number(slider.attr("max"));
//   // if (input.value < min) {
//   //   input.value = min;
//   // }
//   if (input.value > max) {
//     input.value = max;
//   }
//   slider.val(input.value);
// });
// rangeSlider();

// stepcalling
Scenes.currentStep = 1

Scenes.next()
// Scenes.steps[3]()
// Scenes.next()
// Scenes.next()

const nextBtn = get(".btn-next");

const backBtn = get(".btn-back");
nextBtn.addEventListener("click", () => {
  Scenes.next();
});
backBtn.addEventListener("click", () => {
  Scenes.back();
});

// print certificate
get(".btn-save").addEventListener("click", () => {
  window.print();
});

let muteBtn = get(".btn-mute");
muteBtn.addEventListener("click", () => {
  if (isMute) {
    isMute = false;
    muteBtn.src = "./src/images/template_imgs/speech_off_btn.png";
    muteBtn.title = "Click to Mute";
  } else {
    isMute = true;
    muteBtn.src = "./src/images/template_imgs/speech_on_btn.png";
    muteBtn.title = "Click to Unmute";
  }
});

// ! Anime Header Hover Buttons
function btnPopupBox(){
  let popupBtns = document.querySelectorAll(".btn-popup")
  let popupWindow = document.querySelector(".btn-popup-window")
  
  popupBtns[0].onmouseover = ()=>{
    popupWindow.src = Scenes.items.formulas_procedure.item.src
  }
  popupBtns[1].onmouseover = ()=>{
    popupWindow.src = Scenes.items.formulas_nomenclautre.item.src
  }
  popupBtns[2].onmouseover = ()=>{
    switch (Scenes.forMathematicalExpressionBtn) {
      case 1:
        popupWindow.src = Scenes.items.formulas_ideal.item.src
        break;

      case 2:
        popupWindow.src = Scenes.items.formulas_non_ideal.item.src
        break;

      case 3:
        popupWindow.src = Scenes.items.formulas_efficiency.item.src
        break;

      case 4:
        popupWindow.src = Scenes.items.formulas_component_stress.item.src
        break;
    
      default:
        popupWindow.src = Scenes.items.formulas_universal.item.src
        break;
    }
  }
}
btnPopupBox()

// Scenes.steps[2]()
// Scenes.steps[6]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[5]()
// Scenes.steps[6]()

// i really enjoyed the voice of keybord
// its amazing

// mouse position
// function getCursor(event) {
//   let x = event.clientX;
//   let y = event.clientY;
//   let _position = `X: ${x - 419}<br>Y: ${y - 169}`;

//   const infoElement = document.getElementById("info");
//   infoElement.innerHTML = _position;
//   infoElement.style.top = y + "px";
//   infoElement.style.left = x + 20 + "px";
// }

