const io = require('socket.io')(8182,{
    cors: {
      origin: "http://localhost",
      methods: ["GET", "POST"]
    }
})
const user = {}
io.on('connection',socket=>{
    socket.on('new-user-join',(name)=>{
        //Add The User To The dict
        user[socket.id] = name
        //Send The Message To All That User Has Joined
        socket.broadcast.emit('user-join',{'name' : name})
    })
    socket.on('send',(data)=>{
        socket.broadcast.emit('recive',{
            'name' : data.name,
            'message':data.message,
            'time' : data.time
        })
    })
    socket.on('disconnect',()=>{
        socket.broadcast.emit('diss',user[socket.id])
        delete user[socket.id]
    })
    socket.on('give-list',()=>{socket.emit('get-list',(Object.values(user)))})
})