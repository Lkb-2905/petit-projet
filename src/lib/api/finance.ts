import { api } from './auth';

export enum PaymentMethod {
    STRIPE = "STRIPE",
    ORANGE_MONEY = "ORANGE_MONEY",
    MTN_MONEY = "MTN_MONEY",
    PAYPAL = "PAYPAL",
    CRYPTO = "CRYPTO"
}

interface DepositRequest {
    amount: number;
    currency: string;
    payment_method: string;
    transaction_ref?: string;
}

export interface Wallet {
    balance: number;
    currency: string;
}

export const financeService = {
    getBalance: async (): Promise<Wallet> => {
        try {
            const response = await api.get('/finance/balance');
            return response.data;
        } catch (error) {
            console.error("Failed to fetch balance", error);
            // Return default for now to avoid build break if API fails/mocks missing
            return { balance: 0, currency: 'XAF' };
        }
    },
    deposit: async (data: DepositRequest) => {
        const response = await api.post('/finance/deposit', data);
        return response.data;
    },
    getTransactions: async () => {
        return [];
    }
};
