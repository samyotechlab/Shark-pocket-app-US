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
    Contact:'contactUs',
    Refund:'refundPolicy',
    HelpSupport:'helpAndSupport',
    TermCondition:'termsAndCondition',
    Transaction_List: 'api/wallet/transactionList',
    Transaction_store: 'api/transaction/store',
    Bonus_wallet : 'api/bonus_wallet',
    checkPaymentStatus: 'api/checkPaymentStatus',
    DepositeTransaction:'api/wallet/transactionDepositeDetails',
};


// export default {


//     Notification_List: 'notification/list',
//     Bank_ById: 'api/bank_account/byId',
//     Bank_Update: 'api/bank_account/update',
//     Bank_Store: 'api/bank_account/store',
//     Game_Rule: 'api/getGameRules/list',
//     Final_Score: 'api/finalScore',
//     Global_ByDate: 'api/game_score/byDate',
//     Wallet_Store: 'api/wallet_request/store',

//     PanVerification: 'api/PanVerification',
//     EditProfile: 'api/editprofile',
//     WinningList : 'api/winnings/byUserId',

//     TaxInvoice:'api/taxInvoice',
//     GenerateTaxInvoice:'download/',
//     GeneratePdf : 'taxInvoiceById/'
//   };
  