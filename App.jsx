import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/lib/AuthContext';
import { LanguageProvider } from '@/lib/i18n';
import { UpgradeProvider } from '@/lib/UpgradeContext';
import ScrollToTop from './components/ScrollToTop';
import AppGate from '@/components/AppGate';
import ErrorBoundary from '@/components/ErrorBoundary';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminRoute from '@/components/AdminRoute';
// Page imports
import Welcome from '@/pages/Welcome';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import Dashboard from '@/pages/Dashboard';
import Customers from '@/pages/Customers';
import CustomerDetail from '@/pages/CustomerDetail';
import Dadogereft from '@/pages/Dadogereft';
import Trade from '@/pages/Trade';
import Transfer from '@/pages/Transfer';
import Cash from '@/pages/Cash';
import Bank from '@/pages/Bank';
import Currencies from '@/pages/Currencies';
import Reports from '@/pages/Reports';
import ProfitLoss from '@/pages/ProfitLoss';
import Settings from '@/pages/Settings';
import MainSettings from '@/pages/MainSettings';
import Agents from '@/pages/Agents';
import Debtors from '@/pages/Debtors';
import Notifications from '@/pages/Notifications';
import AgencyNetwork from '@/pages/AgencyNetwork';
import AgencyChooser from '@/pages/AgencyChooser';
import ChatGroups from '@/pages/ChatGroups';
import ChatGroupDetail from '@/pages/ChatGroupDetail';
import SarraafMarket from '@/pages/SarraafMarket';
import SarraafChat from '@/pages/SarraafChat';
import Backup from '@/pages/Backup';
import CustomerChat from '@/pages/CustomerChat';
import TransferBook from '@/pages/TransferBook';
import Journal from '@/pages/Journal';
import GeneralLedger from '@/pages/GeneralLedger';
import JournalEntry from '@/pages/JournalEntry';
import BalanceSheet from '@/pages/BalanceSheet';
import Reconciliation from '@/pages/Reconciliation';
import CurrencyConvert from '@/pages/CurrencyConvert';
import OnlineProducts from '@/pages/OnlineProducts';
import PaymentGateway from '@/pages/PaymentGateway';
import SarraafWallet from '@/pages/sarraaf/SarraafWallet';
import SarraafRecharge from '@/pages/sarraaf/SarraafRecharge';
import SarraafGames from '@/pages/sarraaf/SarraafGames';
import BuilderPanel from '@/pages/BuilderPanel';
import SarraafSupport from '@/pages/SarraafSupport';
import CustomerLayout from '@/components/CustomerLayout';
import CustomerHome from '@/pages/customer/CustomerHome';
import CustomerWallet from '@/pages/customer/CustomerWallet';
import CustomerRecharge from '@/pages/customer/CustomerRecharge';
import CustomerGames from '@/pages/customer/CustomerGames';
import CustomerTransfer from '@/pages/customer/CustomerTransfer';
import CustomerWithdraw from '@/pages/customer/CustomerWithdraw';
import CustomerSupport from '@/pages/customer/CustomerSupport';
import CustomerAccount from '@/pages/customer/CustomerAccount';
import CustomerOrders from '@/pages/customer/CustomerOrders';
import CustomerMessages from '@/pages/customer/CustomerMessages';
import CustomerNotifications from '@/pages/customer/CustomerNotifications';
import CustomerProfile from '@/pages/customer/CustomerProfile';
import Receipt from '@/pages/Receipt';
import PageNotFound from '@/lib/PageNotFound';
import SetupDatabase from '@/pages/SetupDatabase';
// Layout
import Layout from '@/components/sarraaf/Layout';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Welcome />} />
      <Route path="/setup-database" element={<SetupDatabase />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Sarraaf Panel — gated by auth + role */}
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} allowedRoles={['creator', 'admin', 'sarraaf', 'employee']} />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />
          <Route path="/dadogereft" element={<Dadogereft />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/transfers/:direction" element={<Transfer />} />
          <Route path="/cash" element={<Cash />} />
          <Route path="/bank" element={<Bank />} />
          <Route path="/currencies" element={<Currencies />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profit-loss" element={<ProfitLoss />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/transfer-book" element={<TransferBook />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/general-ledger" element={<GeneralLedger />} />
          <Route path="/journal-entry" element={<JournalEntry />} />
          <Route path="/balance-sheet" element={<BalanceSheet />} />
          <Route path="/reconciliation" element={<Reconciliation />} />
          <Route path="/convert" element={<CurrencyConvert />} />
          <Route path="/online-products" element={<OnlineProducts />} />
          <Route path="/payment-gateway" element={<PaymentGateway />} />
          <Route path="/online-products/wallet" element={<SarraafWallet />} />
          <Route path="/online-products/recharge" element={<SarraafRecharge />} />
          <Route path="/online-products/games" element={<SarraafGames />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/debtors" element={<Debtors />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/agency-network" element={<AgencyNetwork />} />
          <Route path="/agency" element={<AgencyChooser />} />
          <Route path="/chat" element={<ChatGroups />} />
          <Route path="/chat/group/:id" element={<ChatGroupDetail />} />
          <Route path="/sarraaf-market" element={<SarraafMarket />} />
          <Route path="/sarraaf-chat" element={<SarraafChat />} />
          <Route path="/backup" element={<Backup />} />
          <Route path="/support" element={<SarraafSupport />} />
        </Route>
      </Route>

      {/* Builder Panel — creator + admin + co-creators */}
      <Route element={<AdminRoute />}>
        <Route path="/builder" element={<BuilderPanel />} />
        <Route path="/main-settings" element={<MainSettings />} />
      </Route>

      {/* Customer Panel */}
      <Route element={<ProtectedRoute requiredRole="customer" unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route element={<CustomerLayout />}>
          <Route path="/customer" element={<CustomerHome />} />
          <Route path="/customer/wallet" element={<CustomerWallet />} />
          <Route path="/customer/recharge" element={<CustomerRecharge />} />
          <Route path="/customer/games" element={<CustomerGames />} />
          <Route path="/customer/transfer" element={<CustomerTransfer />} />
          <Route path="/customer/withdraw" element={<CustomerWithdraw />} />
          <Route path="/customer/support" element={<CustomerSupport />} />
          <Route path="/customer/account" element={<CustomerAccount />} />
          <Route path="/customer/orders" element={<CustomerOrders />} />
          <Route path="/customer/messages" element={<CustomerMessages />} />
          <Route path="/customer/notifications" element={<CustomerNotifications />} />
          <Route path="/customer/profile" element={<CustomerProfile />} />
          <Route path="/customer/chat" element={<CustomerChat />} />
        </Route>
      </Route>

      {/* Receipt — any authenticated user */}
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route path="/receipt" element={<Receipt />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <LanguageProvider>
          <QueryClientProvider client={queryClientInstance}>
            <UpgradeProvider>
              <Router>
                <ScrollToTop />
                <ErrorBoundary>
                  <AppGate>
                    <AppRoutes />
                  </AppGate>
                </ErrorBoundary>
              </Router>
              <Toaster />
            </UpgradeProvider>
          </QueryClientProvider>
        </LanguageProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App