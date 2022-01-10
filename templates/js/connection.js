import { add_active_user, add_new_user, add_send_message, recieve_message } from "./script.js";
const socket = io('http://localhost:8182')

window.onload = ()=>{
    const name = prompt("Please Provide Your Name");
    //Calling The Function Defined In Server.js
    socket.emit('new-user-join',name)
    //Declaring The Function called in Server.js
    socket.on('user-join',data=>{
        add_new_user(data,true)
    })
    add_send_message(socket,name)
    socket.on('recive',(data)=>{
        recieve_message(data)
    })
    socket.emit('give-list');
    socket.on('get-list',(data)=>{
        data.forEach(element => {
            add_active_user({'name':element});
        });
    })
    socket.on('diss',(data)=>{
        document.querySelector(".active").innerHTML = ''
        socket.emit('give-list');
        add_new_user({'name' : data},false)
    })
}