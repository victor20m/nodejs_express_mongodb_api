export default {
    validateTransfer: (body) => {
        
        return body.accountIdTo && body.accountIdFrom || 
        body.amount && body.description && body.timestamp && body.accountIdTo != body.accountIdFrom
    }
}