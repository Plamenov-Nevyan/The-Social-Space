import {ChatBar} from "./ChatBar/ChatBar";
import {ChatBody} from "./ChatBody/ChatBody";
import {ChatFooter} from "./ChatFooter/ChatFooter";
import {ChatHeader} from "./ChatHeader/ChatHeader";


export function Chat(){
    return(
        <div>
            <ChatBar />
            <ChatHeader />
            <ChatBody />
            <ChatFooter />
        </div>
    )
}