// Desc: API Endpoints are stored in this file.
export default {
    Login: 'api/login',
    OtpVerify: 'api/verifyOtp',
    Home_Api: 'api/game/list',
    Profile: 'api/get_details',
    AdharOptSend: 'api/AadharVerificationSendOtp',
    AdharVerifyOtp: 'api/AadharVerificationVerifyOtp',
    Game_Ticket_List: 'api/ticket/getUserTicket',
    Store_Ticket: 'api/purchase_ticket/store',
    Game_Rule: 'api/getGameRules/list',
    Game_List: 'api/availableGame/list',
    LeaderBoardByGameId: 'api/game_score/byGameId',
    Global_ByDate: 'api/game_score/byDate',
    History_Api: 'api/game_score/getPlayedGamesByUserId',
    Game_History: 'api/game_score/by_user_id_and_game_id',
    Contact: 'contactUs',
    Refund: 'refundPolicy',
    HelpSupport: 'helpAndSupport',
    TermCondition: 'termsAndCondition',
    Transaction_List: 'api/wallet/transactionList',
    Transaction_store: 'api/transaction/store',
    Bonus_wallet: 'api/bonus_wallet',
    checkPaymentStatus: 'api/checkPaymentStatus',
    DepositeTransaction: 'api/wallet/transactionDepositeDetails',
    Bank_Store: 'api/bank_account/store',
    PanVerification: 'api/PanVerification',
    Notification_List: 'notification/list',
    Winning:'api/winnings/byUserId',
    Wallet_Store: 'api/wallet_request/store',
    Wallet_Request:'api/wallet_request/list'
};


// export default {
//     Final_Score: 'api/finalScore',

//     EditProfile: 'api/editprofile',
//     TaxInvoice:'api/taxInvoice',
//     GenerateTaxInvoice:'download/',
//     GeneratePdf : 'taxInvoiceById/'
//   };
