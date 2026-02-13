import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Smartphone } from 'lucide-react';
import { financeService } from '@/lib/api/finance';

interface DepositModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const PAYMENT_METHODS = [
    { id: 'ORANGE_MONEY', name: 'Orange Money', icon: Smartphone, color: 'bg-orange-500' },
    { id: 'MTN_MONEY', name: 'MTN Mobile Money', icon: Smartphone, color: 'bg-yellow-400' },
    { id: 'PAYPAL', name: 'PayPal', icon: Smartphone, color: 'bg-blue-600' },
    { id: 'CRYPTO', name: 'Crypto (USDT/BTC)', icon: CreditCard, color: 'bg-green-600' },
];

export const DepositModal: React.FC<DepositModalProps> = ({ isOpen, onClose, onSuccess }) => {
    const [amount, setAmount] = useState('');
    const [selectedMethod, setSelectedMethod] = useState(PAYMENT_METHODS[0].id);
    const [transactionRef, setTransactionRef] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDeposit = async () => {
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            setError('Veuillez entrer un montant valide.');
            return;
        }

        if (selectedMethod === 'ORANGE_MONEY' && !transactionRef) {
            setError('Veuillez entrer l\'ID de transaction.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await financeService.deposit({
                amount: Number(amount),
                currency: 'XAF',
                payment_method: selectedMethod,
                transaction_ref: transactionRef
            });
            onSuccess();
            onClose();
        } catch (err) {
            setError('Échec du dépôt. Veuillez réessayer.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden relative"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b border-white/5">
                        <h2 className="text-xl font-bold text-white">Ajouter des Fonds</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Amount Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Montant (XAF)</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="5000"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary transition-colors text-lg"
                            />
                        </div>

                        {/* Payment Methods */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Moyen de Paiement</label>
                            <div className="grid grid-cols-1 gap-3">
                                {PAYMENT_METHODS.map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => setSelectedMethod(method.id)}
                                        className={`flex items-center p-3 rounded-lg border transition-all ${selectedMethod === method.id
                                            ? 'bg-white/10 border-primary'
                                            : 'bg-white/5 border-transparent hover:bg-white/10'
                                            }`}
                                    >
                                        <div className={`p-2 rounded-full ${method.color} mr-3`}>
                                            <method.icon size={16} className="text-white" />
                                        </div>
                                        <span className="text-white font-medium">{method.name}</span>
                                        {selectedMethod === method.id && (
                                            <div className="ml-auto w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Payment Instructions & Validation */}
                        <AnimatePresence mode="wait">
                            {selectedMethod === 'ORANGE_MONEY' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 space-y-4"
                                >
                                    <div>
                                        <p className="text-orange-200 text-sm mb-1">1. Effectuez le transfert :</p>
                                        <p className="text-white font-medium">
                                            Envoyez <span className="font-bold text-orange-400">{amount || '...'} XAF</span> au
                                        </p>
                                        <div className="flex items-center gap-2 mt-2 bg-black/40 p-3 rounded border border-orange-500/20">
                                            <div className="bg-orange-500 p-1.5 rounded-full">
                                                <Smartphone size={16} className="text-white" />
                                            </div>
                                            <span className="text-lg font-bold tracking-wider text-white select-all">+237 655 72 84 84</span>
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-orange-500/20">
                                        <p className="text-orange-200 text-sm mb-2">2. Validez la transaction :</p>
                                        <input
                                            type="text"
                                            value={transactionRef}
                                            onChange={(e) => setTransactionRef(e.target.value)}
                                            placeholder="ID Transaction (ex: MP2405...)"
                                            className="w-full px-4 py-2 bg-black/40 border border-orange-500/30 rounded text-white focus:outline-none focus:border-orange-500 text-sm"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {selectedMethod === 'MTN_MONEY' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-yellow-400/10 border border-yellow-400/30 rounded-lg p-4 space-y-4"
                                >
                                    <div>
                                        <p className="text-yellow-200 text-sm mb-1">1. Effectuez le transfert :</p>
                                        <p className="text-white font-medium">
                                            Envoyez <span className="font-bold text-yellow-400">{amount || '...'} XAF</span> au
                                        </p>
                                        <div className="flex items-center gap-2 mt-2 bg-black/40 p-3 rounded border border-yellow-400/20">
                                            <div className="bg-yellow-400 p-1.5 rounded-full">
                                                <Smartphone size={16} className="text-black" />
                                            </div>
                                            <span className="text-lg font-bold tracking-wider text-white select-all">+237 670 00 00 00</span>
                                        </div>
                                    </div>
                                    <div className="pt-2 border-t border-yellow-400/20">
                                        <input
                                            type="text"
                                            value={transactionRef}
                                            onChange={(e) => setTransactionRef(e.target.value)}
                                            placeholder="ID Transaction (ex: MTN...)"
                                            className="w-full px-4 py-2 bg-black/40 border border-yellow-400/30 rounded text-white focus:outline-none focus:border-yellow-400 text-sm"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {selectedMethod === 'STRIPE' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 space-y-3"
                                >
                                    <div className="bg-black/50 p-3 rounded border border-white/10">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-xs text-gray-400">CARD NUMBER</span>
                                            <CreditCard size={14} className="text-purple-400" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="4242 4242 4242 4242"
                                            className="w-full bg-transparent text-white font-mono text-lg focus:outline-none tracking-widest placeholder-gray-600"
                                            maxLength={19}
                                        />
                                        <div className="flex gap-4 mt-4">
                                            <div className="flex-1">
                                                <span className="text-xs text-gray-400 block mb-1">EXPIRY</span>
                                                <input type="text" placeholder="MM/YY" className="bg-transparent text-white w-full focus:outline-none" />
                                            </div>
                                            <div className="flex-1">
                                                <span className="text-xs text-gray-400 block mb-1">CVC</span>
                                                <input type="text" placeholder="123" className="bg-transparent text-white w-full focus:outline-none" />
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-purple-300/60 text-center">
                                        *Paiement sécurisé par Stripe (Simulation).
                                    </p>
                                </motion.div>
                            )}

                            {selectedMethod === 'PAYPAL' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 text-center"
                                >
                                    <p className="text-blue-200 text-sm mb-4">
                                        Vous allez être redirigé vers PayPal pour sécuriser votre transaction.
                                    </p>
                                    <div className="bg-white p-2 rounded w-24 mx-auto mb-2">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 mx-auto" />
                                    </div>
                                </motion.div>
                            )}

                            {selectedMethod === 'CRYPTO' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 space-y-4"
                                >
                                    <div className="flex justify-between items-center bg-black/40 p-2 rounded">
                                        <span className="text-xs text-gray-400">Network</span>
                                        <span className="text-xs font-bold text-green-400">TRC20 (Tron)</span>
                                    </div>

                                    <div className="bg-white p-2 rounded w-32 mx-auto">
                                        {/* Placeholder for QR Code */}
                                        <div className="w-full aspect-square bg-gray-200 flex items-center justify-center">
                                            <span className="text-black text-xs font-bold">QR CODE</span>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-green-200 text-xs mb-1">Adresse USDT (TRC20) :</p>
                                        <div className="bg-black/50 p-2 rounded border border-green-500/20 flex items-center justify-between">
                                            <code className="text-[10px] text-white break-all">
                                                TX8Jksj8932kjd9823jdkj9823kjd
                                            </code>
                                            <button className="text-green-400 text-xs hover:text-green-300 ml-2">Copy</button>
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-green-500/20">
                                        <input
                                            type="text"
                                            value={transactionRef}
                                            onChange={(e) => setTransactionRef(e.target.value)}
                                            placeholder="Hash de Transaction (TxID)"
                                            className="w-full px-4 py-2 bg-black/40 border border-green-500/30 rounded text-white focus:outline-none focus:border-green-500 text-sm"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {error && <div className="text-red-500 text-sm text-center">{error}</div>}

                        <button
                            onClick={handleDeposit}
                            disabled={loading}
                            className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                        >
                            {loading ? 'Traitement...' :
                                (selectedMethod === 'ORANGE_MONEY' || selectedMethod === 'MTN_MONEY' || selectedMethod === 'CRYPTO') ? 'Valider le Paiement' :
                                    selectedMethod === 'PAYPAL' ? 'Continuer vers PayPal' :
                                        selectedMethod === 'STRIPE' ? 'Payer par Carte' : 'Confirmer'
                            }
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
