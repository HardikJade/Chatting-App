export function add_new_user(data,flag){
    let body_of_message = document.createElement("div")
    body_of_message.classList = "user_join";
    if(flag)
        body_of_message.innerText = data.name + " Joined";
    else
        body_of_message.innerText = data.name + " Left";
    document.querySelector('.chat').appendChild(body_of_message)    
    if(flag)
        add_active_user(data)
}
export function add_active_user(data){
    let user_cont = document.querySelector(".active");
    let body_of_user_cont = document.createElement("div")
    body_of_user_cont.classList = "user_container"
    body_of_user_cont.innerHTML = body_of_user_cont.innerHTML + 
    `
        <div class="userImage">
            <img src="https://www.freeiconspng.com/uploads/profile-icon-9.png"  alt="Fail">
            <div class="activeStatus"></div>
        </div>
        <div class="userName">${data.name}</div>
    `;
    user_cont.appendChild(body_of_user_cont);
}
export function add_send_message(socket,name){
    let send_btn = document.querySelector('.submit')   
    send_btn.addEventListener("click",()=>{
        let msg = document.querySelector("#main_message").value;
        let time = (new Date).toLocaleTimeString();
        if(msg !== ''){
            let data = {
                'message' : msg,
                'time' : time
            }
            let play = document.querySelector(".chat")
            let message = document.createElement("div")
            message.classList = "message right";
            message.innerHTML = `
                <div class="sender">You</div>
                <div class="content">
                    ${data.message}
                </div>
                <div class="stamp">${data.time}</div>
            `
            play.appendChild(message);
            let sc = document.querySelector('.chat')
            sc.scrollTop = sc.scrollHeight
            document.querySelector("#main_message").value = ''
            socket.emit('send',{
                'name': name,
                'message' : msg,
                'time' : time   
            })
        }
    })
}
export function recieve_message(data){
    let play = document.querySelector(".chat")
    let message = document.createElement("div")
    message.classList = "message left";
    message.innerHTML = `
        <div class="sender">${data.name}</div>
        <div class="content">
            ${data.message}
        </div>
        <div class="stamp">${data.time}</div>
    `
    play.appendChild(message);
    let sc = document.querySelector('.chat')
    sc.scrollTop = sc.scrollHeight
}