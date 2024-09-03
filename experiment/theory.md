### Theory

- An inverter is a power electronic conversion circuit which converts DC supply into AC. Therefore, three-phase inverter converts DC into three-phase AC [2].
- Single-phase VSI<sub>s</sub> cover low-range power applications and three-phase VSI<sub>s</sub> cover the medium- to high-power applications.
- The main purpose of these topologies is to provide a three-phase voltage source, where the amplitude, phase, and frequency of the voltages should always be controllable.
- The standard three-phase VSI topology has eight valid switching states.


<center>
  
#### SIX-STEP VSI: 180&#176; CONDUCTION MODE<br>

  <img src="images/th1.png" height="530px">
  
Fig. 1.  180&#176; Mode of Conduction

</center>
<br>


- In the three-phase inverter, each switch conducts for 180&#176; of a cycle. Switch pair in each arm, i.e. S<sub>1</sub>, S<sub>4</sub>; S<sub>3</sub>, S<sub>6</sub> and S<sub>5</sub>, S<sub>4</sub> are turned ON with a time interval of 180&#176; [4]
- It means that S<sub>1</sub> conducts for 180&#176; and S<sub>4</sub> conducts for the next 180&#176; of a cycle.
- Switches in the upper group, i.e. S<sub>1</sub>, S<sub>3</sub>, S<sub>5</sub> conduct at an interval of 120&#176;. It implies that if S<sub>1</sub> is fired at wt=0&#176;, then S<sub>3</sub> must be fired at wt=120&#176; and S<sub>5</sub> at wt=240&#176;. Same is true for lower group of switches.
- Each switch conducts for 180&#176; in each cycle i.e. for half of cycle.
- Three switches conduct at the same time instant.
- It is shown in figure that in every step of 60&#176; duration, only three switches are conducting, one from the upper group and two from the lower group or two from the upper group and one from the lower group.

<center>

#### 3-PHASE SINUSOIDAL PWM<br>

  <img src="images/th2.png" height="530px">
  
Fig. 2. 3-phase Sinusoidal PWM

</center>
<br>

- The objective in pulse-width-modulated three-phase inverters is to shape and control the three-phase output voltages in magnitude and frequency with an essentially constant input voltage V<sub>in</sub>.
- In three-phase VSI<sub>s</sub>, the switches of any leg of the inverter (S<sub>1</sub> and S<sub>4</sub>, S<sub>1</sub> and S<sub>4</sub>, S<sub>1</sub> and S<sub>4</sub>) cannot be switched ON simultaneously because this would result in short circuit across the DC supply.
- In order to generate a given voltage waveform, the inverter moves from one state to another. Thus the resulting ac output line voltages consist of discrete values of voltages that are V<sub>in</sub>, 0 and –V<sub>in</sub>.
- In Sine PWM, in order to produce 120&#176; out-of-phase load voltages, three modulating signals that are 120&#176; out of phase are used.
- In the three-phase inverters, only the harmonics in the line-to-line voltages are of concern. The harmonics in the output of any one of the legs, where only the odd harmonics exist as sidebands, centered around m<sub>f</sub>  and its multiples, provided m<sub>f</sub> is odd.
- For low values of m<sub>f</sub>, to eliminate the even harmonics, a synchronized PWM should be used and m<sub>f</sub> should be an odd integer. Moreover, m<sub>f</sub> should be a multiple of 3 to cancel out the most dominant harmonics in the line-to-line voltage.
- In the linear region, the fundamental-frequency component in the output voltage varies linearly with the amplitude modulation ratio m<sub>a</sub>
- the peak value of the fundamental-frequency component in one of the inverter legs is

<br>
<div style="float: left; width:50%;">
  <img src="images/th3.png" height="65px">
</div>
<div style="float: right; width:50%; text-align:center;">
    ..(1)
</div>
<br>

<div style="float: left; width:100%;"><br>
  
- Therefore, the line-to-line rms voltage at the fundamental frequency, due to 120&#176; phase displacement between phase voltages, can be written as

</div>

<br>
<div style="float: left; width:50%;">
  <img src="images/th4.png" height="65px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(2)

</div>

<div style="float: left; width:100%;">
&nbsp;
</div>

<div style="float: left; width:50%;">
  <img src="images/th5.png" height="65px">
      </div>
<div style="float: right; width:50%; text-align:center;">
    ..(3)

</div>
</sub>
