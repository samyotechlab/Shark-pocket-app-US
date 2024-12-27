// Desc: API Endpoints are stored in this file.
export default {
    Login:'api/login',
    OtpVerify:'api/verifyOtp',
    Profile:'api/get_details',
    AdharOptSend: 'api/AadharVerificationSendOtp',
    AdharVerifyOtp: 'api/AadharVerificationVerifyOtp',
    Home_Api: 'api/game/list',
    // Game_Ticket_List: 'api/ticket/list',
    Game_Ticket_List: 'api/ticket/getUserTicket',
    Store_Ticket: 'api/purchase_ticket/store',
    Game_Rule: 'api/getGameRules/list',
    Game_List: 'api/availableGame/list',
    LeaderBoardByGameId: 'api/game_score/byGameId',
};