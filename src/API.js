const basePath = 'https://admin.ecoforce.space/Api';

export const ApiPaths = {
    RegisterApi: `${basePath}/register`,
    LoginApi: `${basePath}/register/login`,
    Dashboard: `${basePath}/Dashboard`,
    BuyPackage: `${basePath}/register/upgrade`,
    ConfirmOrder: `${basePath}/register/verify_order`,
    TeamDirect: `${basePath}/Team/team_direct`,
    TeamGen: `${basePath}/Team/my_generation`,
    Incomes: `${basePath}/incomes/income_all`,
    Reward: `${basePath}/reward`,
    Support: `${basePath}/support`,
    SupportHistory: `${basePath}/support/history`,
    Leadership: `${basePath}/reward/leadership`,
    Withdrawal: `${basePath}/withdrawal`,
    CheckActivePackage: `${basePath}/register/already_Active_Pkg`
}