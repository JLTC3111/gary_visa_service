// Server-assigned IDs make polling, Realtime notifications and retries converge.
export function mergeMessages(existing,incoming){
 const messages=new Map(existing.map(message=>[message.id,message]));
 for(const message of incoming)messages.set(message.id,message);
 return [...messages.values()].sort((a,b)=>new Date(a.created_at)-new Date(b.created_at)||a.id.localeCompare(b.id));
}
export function chatErrorKey(error){
 if(error?.code==='42501')return'chatUnavailable';
 if(error?.code==='P0001')return'chatRateLimited';
 return'chatSendError';
}
