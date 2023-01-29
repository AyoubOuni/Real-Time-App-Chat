const io=require("socket.io")(8900,{
    cors:{
        origin:"http://localhost:3000"
    }
});
var users=[];
const getuser=(userId) => {
    return users.find(user => user.userId === userId);
} 
const adduser=(userId,socketid)=>{
 !users.some(user=>user.userId===userId)&&users.push({userId,socketid});
}
const removeuser=(socketId)=>{
users=users.filter(user=>user.socketId !== socketId);}
io.on("connection",(socket)=>{
  
    console.log("a user connected");
  
socket.on("adduser",userId=>{
    adduser(userId,socket.id);
    io.emit("getusers",users)
});
socket.on("sendMessage",({conversationId,userId,receiverId,text})=>{
    console.log(userId);
    console.log(receiverId);
    console.log(text);
var user=getuser(receiverId);
console.log(conversationId);

socket.to(user.socketid).emit("getMessage", {
    conversationId,
    userId,
    text,
}) ;
});
socket.on("deleteMessage",({conversationId,userId,receiverId,messageid})=>{
    console.log(userId);
    console.log(receiverId);
var user=getuser(receiverId);
console.log(conversationId);
var text="deleted message";
socket.to(user.socketid).emit("setMessage", {
    messageid,
    conversationId,
    userId,
    text,
}) ;
});



socket.on("disconnect",()=>{
    console.log("a user disconnect");
    removeuser(socket.id);
    io.emit("getusers",users)

});
})

