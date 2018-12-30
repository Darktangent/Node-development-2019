console.log("starting app.js");
const fs=require("fs");
const os=require("os");
var user=os.userInfo();
const notes=require("./notes")
const _=require("lodash")
const yargs=require("yargs")

// let command=process.argv[2];
// console.log("Command",command);
// yargs////////////////////////
const argv=yargs.command('add','Add a new note',{
title:{
    describe:"Title of the note",
    demand:true,
    alias:'t'
},
body:{
    describe:"Body of the note",
    demand:true,
    alias:"b"
}
}).help()
.argv;


if(command==='add'){
  let note=  notes.addNote(argv.title, argv.body)
  if(note){
      console.log("Note added")
      notes.logNote(note)
  }else{
      console.log("Note with that title already exist!")
  }
}else if(command==='list'){
   let allNotes= notes.getAll();
   console.log(`Printing ${allNotes.length} notes`)
    allNotes.forEach(note => {
        notes.logNote(note);
    });
   
   
}else if(command==="read"){
    let note=notes.getNote(argv.title)
    if(note){
        console.log("Reading Note")
        notes.logNote(note);
    }else{
        console.log("Note with that title not found!")
    }
}else if(command==="remove"){
  let noteRemoved=  notes.removeNote(argv.title);
  var message=noteRemoved ? 'Note was removed':"Note not found";
  console.log(message)
}else{
    console.log("Command not recognized")
}