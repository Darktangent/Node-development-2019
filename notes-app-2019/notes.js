console.log("starting notes.js")
const fs=require("fs");

let fetchNotes=()=>{
    try{
        let notesInFile=fs.readFileSync("notes-data.json");
        return JSON.parse(notesInFile)
    }catch(e){
return []
    }
}

let saveNotes=(notes)=>{
    fs.writeFileSync("notes-data.json",JSON.stringify(notes))
}


let addNote=(title,body)=>{
    let notes=fetchNotes();
    let note={
        title:title,
        body:body
    }
   
    let duplicateNotes=notes.filter((note)=>{
        return note.title===title;
    })

    if(duplicateNotes.length===0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
   
}

let getAll=()=>{
    return fetchNotes();
}
let getNote=(title)=>{
    let notes=fetchNotes();
    let filteredNote=notes.filter((note)=>{
         return note.title===title
    })
    return filteredNote[0];
}

let removeNote=(title)=>{
  let notes= fetchNotes();
    let filteredNotes=notes.filter((note)=>{
         note.title!==title

    })
    saveNotes(filteredNotes)
    return notes.length!== filteredNotes.length;
}
const logNote=(note)=>{
    console.log("------")
    console.log("Title:"+note.title)
    console.log("Body:"+note.body)
}


module.exports={
    addNote:addNote,
    getAll:getAll,
    getNote:getNote,
    removeNote:removeNote
}