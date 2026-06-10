// Thin wrappers around backend endpoints. All functions return the raw response
// data so callers can decide how to handle success/failure flags.
import api from './axios.js'

// ============================================================================
// AUTH
// ============================================================================
export const fetchUser           = (id) => api.get(`/auth/get-user/${id}`).then((r) => r.data)
export const fetchUserData       = (id) => api.get(`/auth/get-user-data/${id}`).then((r) => r.data)
export const fetchUserBalance    = (id) => api.get(`/auth/get-user-b/${id}`).then((r) => r.data)
export const fetchUserPortfolio  = ()   => api.get('/auth/get-user-portfolio').then((r) => r.data)
export const fetchUserProfit     = (id) => api.get(`/auth/user-profit/${id}`).then((r) => r.data)
export const updateUserProfile   = (id, body) => api.post(`/auth/update-profile-user/${id}`, body).then((r) => r.data)

// ============================================================================
// FUNDS
// ============================================================================
export const fetchAllFunds         = () => api.get('/fund').then((r) => r.data)
export const fetchFundById         = (id) => api.get(`/fund/fund/${id}`).then((r) => r.data)
export const fetchFundClasses      = (fundId) => api.get(`/fund/classes/${fundId}`).then((r) => r.data)
export const fetchFundNavs         = (fundId) => api.get(`/fund/nav/${fundId}`).then((r) => r.data)
export const fetchUserFundsAndNavs = () => api.get('/fund/getfund-navs').then((r) => r.data)
export const fetchSubscriptions    = () => api.get('/fund/subscriptions').then((r) => r.data)
export const submitFundSubscription = (formData) =>
  api.post('/fund/new-fund-request', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data)

// ============================================================================
// WALLETS
// ============================================================================
export const createWallet         = (data)   => api.post('/wallet/create-wallet', { data }).then((r) => r.data)
export const fetchWallets         = (userId) => api.get(`/wallet/get-wallets/${userId}`).then((r) => r.data)
export const fetchWalletByAsset   = (userId, asset) => api.get(`/wallet/get-wallet-data`, { params: { user: userId, asset } }).then((r) => r.data)
export const fetchBaseCurrency    = (id)     => api.get(`/wallet/get-currency/${id}`).then((r) => r.data)
export const fetchWalletCoins     = ()       => api.get('/wallet/get-wallet-coins').then((r) => r.data)

// ============================================================================
// TRANSACTIONS
// ============================================================================
export const fetchUserTransactions       = (id) => api.get(`/transaction/user-transactions/${id}`).then((r) => r.data)
export const fetchUserTransactionsWallet = (id) => api.get(`/transaction/user-transactions-wallet/${id}`).then((r) => r.data)
export const fetchTransactionWallets     = (id) => api.get(`/transaction/transaction-wallet/${id}`).then((r) => r.data)

// ============================================================================
// KYC
// ============================================================================
export const submitKyc           = (formData) =>
  api.post('/kyc/new-kyc', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data)
export const updateKyc           = (body)   => api.post('/kyc/update-kyc', body).then((r) => r.data)
export const fetchUserKyc        = (userId) => api.get(`/kyc/user-kyc/${userId}`).then((r) => r.data)
export const fetchKycById        = (id)     => api.get(`/kyc/single-kyc/${id}`).then((r) => r.data)

// ============================================================================
// WITHDRAWALS
// ============================================================================
export const requestFiatWithdrawal   = (body) => api.post('/withdraw/new-request', body).then((r) => r.data)
export const requestCryptoWithdrawal = (body) => api.post('/withdraw/new-request-crypto', body).then((r) => r.data)

// ============================================================================
// BANK
// ============================================================================
export const addBank      = (body)   => api.post('/bank/add-bank', body).then((r) => r.data)
export const fetchBanks   = (userId) => api.get(`/bank/get-banks/${userId}`).then((r) => r.data)
export const fetchBankById = (id)    => api.get(`/bank/get-bank-data/${id}`).then((r) => r.data)

// ============================================================================
// NOTIFICATIONS
// ============================================================================
export const fetchNotifications      = ()   => api.get('/user/notifications').then((r) => r.data)
export const markAllNotificationsRead = ()  => api.patch('/user/notifications/mark-all-read').then((r) => r.data)
export const fetchEnrolledFunds      = ()   => api.get('/user/getEnrolledFunds').then((r) => r.data)
