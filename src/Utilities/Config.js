// Desc: API Endpoints are stored in this file.
export default {
    Login:'api/login',
    OtpVerify:'api/verifyOtp',
    Home_Api: 'api/game/list',
    Profile:'api/get_details',
    AdharOptSend: 'api/AadharVerificationSendOtp',
    AdharVerifyOtp: 'api/AadharVerificationVerifyOtp',
    Game_Ticket_List: 'api/ticket/getUserTicket',
    Store_Ticket: 'api/purchase_ticket/store',
    Game_Rule: 'api/getGameRules/list',
    Game_List: 'api/availableGame/list',
    LeaderBoardByGameId: 'api/game_score/byGameId',
    History_Api: 'api/game_score/getPlayedGamesByUserId',
    Game_History: 'api/game_score/by_user_id_and_game_id',
};