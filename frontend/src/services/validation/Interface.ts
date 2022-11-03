export interface IValidateResponse {
    field?: string,
    msg?: string,
    success: boolean
}

export function buildReponseMessage(field: string, msg: string, success: boolean ) :IValidateResponse{

    return {
        field: field,
        msg: msg,
        success: success 
    }
}