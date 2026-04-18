export interface NavItem {
  title: string;
  href: string;
  icon: string;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export interface PieChartData {
  status: string;
  count: number;
}

export interface BarChartData {
  month: Date | string;
  count: number;
}

export interface IAdminDashboardData {
  adminCount: number;
  superAdminCount: number;
  userCount: number;
}

export interface IUserDashboardData {
  purchaseCount: number;
  totalSpent: number;
  watchlistCount: number;
  reviewCount: number;
}

export interface IPayment {
  id: string;
  amount: number;
  status: "PAID" | "UNPAID";
  paymentType: "PURCHASE" | "RENT" | "SUBSCRIPTION";
  invoiceUrl: string | null;
  transactionId: string | null;
  createdAt: string;
  mediaId: string | null;
  media: {
    title: string;
    thumbnail: string | null;
    streamingUrl: string | null;
  } | null;
  user?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export interface IAnalyticsTypeDistribution {
  type: "PURCHASE" | "RENT" | "SUBSCRIPTION";
  revenue: number | null;
  count: number;
}

export interface ISalesOverTime {
  month: string;
  revenue: number;
  count: number;
}

export interface ITopMedia {
  title: string;
  revenue: number;
  count: number;
}

export interface IAnalyticsData {
  totalRevenue: number;
  totalSales: number;
  typeDistribution: IAnalyticsTypeDistribution[];
  salesOverTime: ISalesOverTime[];
  topMedia: ITopMedia[];
}
