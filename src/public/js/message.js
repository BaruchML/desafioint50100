import loggerWinston from "../../utils/logger.js";

loggerWinston.info('Hola desde js de public');


const chatform = document.getElementById('chatbox')

chatform.addEventListener("submit", (evt)=>{
    evt.preventDefault()
    const newMessage = {
        user:chatform[0].value,
        message:chatform[1].value,
    }

     loggerWinston.info(newMessage);
chatform.reset()
})
