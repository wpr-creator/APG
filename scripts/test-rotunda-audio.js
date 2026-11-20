const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
(async()=>{
 const {createRotundaAudio}=await import('../rotunda-audio.js');
 let starts=0,stops=0,requests=0,decodes=0;const gains=[];
 class AudioContext{
  state='running';currentTime=1;destination={};
  createGain(){const node={gain:{value:0,setValueAtTime(){},linearRampToValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){}};gains.push(node);return node;}
  createBufferSource(){return{buffer:null,connect(){},disconnect(){},start(){starts++;},stop(){stops++;this.onended?.();}};}
  createOscillator(){return{frequency:{value:0},connect(){},start(){},stop(){}};}
  async decodeAudioData(){decodes++;return{duration:1.95};}async close(){this.state='closed';}
 }
 global.window={AudioContext};global.document={hidden:false};global.fetch=async()=>{requests++;return{ok:true,arrayBuffer:async()=>new ArrayBuffer(8)};};
 const audio=createRotundaAudio();audio.play('rise');assert.equal(starts,0);assert.equal(requests,0,'Muted games should not request the clip.');
 assert.equal(audio.setEnabled(true),true);await new Promise(resolve=>setImmediate(resolve));
 audio.play('rise',60);assert.equal(starts,1,'One recorded cry per ascent.');assert.equal(requests,1);assert.equal(decodes,1);
 audio.setEnabled(false);assert.equal(gains[0].gain.value,0);assert.equal(stops,1,'Muting stops an active cry immediately.');audio.play('rise');assert.equal(starts,1);
 audio.setEnabled(true);audio.play('rise');assert.equal(starts,2);assert.equal(requests,1,'Reuse the decoded clip.');
 document.hidden=true;audio.play('rise');assert.equal(starts,2);document.hidden=false;audio.dispose();assert.equal(audio.setEnabled(true),false);audio.play('rise');assert.equal(starts,2);
 // A late download must not start a cry after the user mutes or disposes.
 let release;global.fetch=()=>new Promise(resolve=>{release=resolve;});const pending=createRotundaAudio();pending.setEnabled(true);pending.play('rise');pending.setEnabled(false);pending.setEnabled(true);release({ok:true,arrayBuffer:async()=>new ArrayBuffer(8)});await new Promise(resolve=>setImmediate(resolve));assert.equal(starts,2);pending.dispose();
 const wav=fs.readFileSync(path.join(__dirname,'../assets/rotunda/eagle-screech.wav'));assert.equal(wav.toString('ascii',0,4),'RIFF');assert.equal(wav.toString('ascii',8,12),'WAVE');assert.ok(wav.length<100000);
 console.log('Rotunda audio: gesture-gated initialization, one cry per ascent, immediate mute, cached audio, hidden tabs, late loading, and disposal passed.');
})().catch(error=>{console.error(error);process.exit(1);});
