### Theory

- An inverter is a power electronic conversion circuit which converts DC supply into AC. Therefore, three-phase inverter converts DC into three-phase AC.
- Single-phase VSIs cover low-range power applications and three-phase VSIs cover the medium- to high-power applications.
- The main purpose of these topologies is to provide a three-phase voltage source, where the amplitude, phase, and frequency of the voltages should always be controllable.
- The standard three-phase VSI topology has eight valid switching states.


<center>
  
#### SIX-STEP VSI: 180&#176; CONDUCTION MODE<br>

  <img src="images/th1.png" height="350px">
  
Fig. 1.  180&#176; Mode of Conduction

</center>
<br>


- In the three-phase inverter, each switch conducts for 180o of a cycle. Switch pair in each arm, i.e. S1, S4; S3, S6 and S5, S4 are turned ON with a time interval of 180o
- It means that S1 conducts for 180o and S4 conducts for the next 180o of a cycle.
- Switches in the upper group, i.e. S1, S3, S5 conduct at an interval of 120o. It implies that if S1 is fired at wt=0o, then S3 must be fired at wt=120o and S5 at wt=240o. Same is true for lower group of switches.
- Each switch conducts for 180o in each cycle i.e. for half of cycle.
- Three switches conduct at the same time instant.
- It is shown in figure that in every step of 60o duration, only three switches are conducting, one from the upper group and two from the lower group or two from the upper group and one from the lower group.

<center>

#### 3-PHASE SINUSOIDAL PWM<br>

  <img src="images/th2.png" height="350px">
  
Fig. 2. 3-phase Sinusoidal PWM

</center>
<br>
